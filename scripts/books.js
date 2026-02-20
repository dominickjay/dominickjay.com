import "dotenv/config";
import fetch from "node-fetch";
import { format, startOfMonth } from "date-fns";
import fs from "fs";

const apiKey = process.env.LAST_FM_API_KEY;
const today = new Date();
const firstOfMonth = startOfMonth(today);
const formattedFirstOfMonth = format(firstOfMonth, "yyyy-MM-dd");
const formattedToday = format(today, "yyyy-MM-dd");
const monthYear = format(today, "MMMM yyyy");

// Simple in-memory cache to avoid rate limiting during development
const cache = new Map();
const CACHE_TTL = 30000; // 30 seconds

function getCached(key) {
	const cached = cache.get(key);
	if (cached && cached.expires > Date.now()) {
		return cached.data;
	}
	cache.delete(key);
	return null;
}

function setCached(key, data) {
	cache.set(key, { data, expires: Date.now() + CACHE_TTL });
}

async function getTopTracks(apiKey, limit) {
	const hardcoverToken = (process.env.hardcoverToken ?? "").trim();

	// console.log("🔧 Config:", {
	// 	hasToken: !!hardcoverToken,
	// 	tokenLength: hardcoverToken.length,
	// });

	if (!hardcoverToken) {
		console.warn(
			"Warning: hardcoverToken environment variable is not set. " +
				"Authenticated requests will fail. " +
				"Get your token from https://hardcover.app/account/api",
		);
	}

	// Helper function to make GraphQL requests
	async function hardcoverGraphQL(query, variables, useAuth) {
		if (useAuth && !hardcoverToken) {
			throw new Error(
				"Hardcover token is required for authenticated requests. " +
					"Please set the hardcoverToken environment variable. " +
					"Get your token from https://hardcover.app/account/api",
			);
		}

		// Create cache key from query and variables
		const cacheKey = JSON.stringify({ query, variables });
		const cached = getCached(cacheKey);
		if (cached) {
			console.log("💾 Using cached response for query");
			return cached;
		}

		const headers = {
			"Content-Type": "application/json",
			"User-Agent": "dominickjay.com/1.0",
		};

		if (useAuth) {
			// Use Bearer prefix for JWT tokens (standard for Hasura/GraphQL APIs)
			headers["authorization"] = hardcoverToken.startsWith("Bearer ")
				? hardcoverToken
				: `Bearer ${hardcoverToken}`;
		}

		// console.log("🌐 GraphQL Request:", {
		//   useAuth,
		//   variables,
		//   query: query.substring(0, 100) + "...",
		// });

		const response = await fetch("https://api.hardcover.app/v1/graphql", {
			method: "POST",
			headers,
			body: JSON.stringify({ query, variables }),
		});

		// console.log("🌐 GraphQL Response status:", response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("🌐 GraphQL Error response:", errorText);

			// If rate limited, wait a bit and suggest using cache
			if (response.status === 429) {
				console.warn(
					"⚠️ Rate limited! Consider waiting 60 seconds or using cached responses.",
				);
			}

			throw new Error(
				`HTTP error! status: ${response.status}, message: ${errorText}`,
			);
		}

		const json = await response.json();
		setCached(cacheKey, json);
		// console.log("🌐 GraphQL Response data:", JSON.stringify(json, null, 2));
		return json;
	}

	// Fetch list book IDs first to filter them out
	let listBookIds = new Set();
	let listBooksCount = 0;
	let listBooks = [];

	// Fetch to-read, currently reading books, and list info in parallel
	let currentBooks = [];
	let toReadBooks = [];
	let sortedYears = [];

	try {
		const [toReadData, currentDataAndList, listInfo] = await Promise.all([
			hardcoverGraphQL(
				`query getUserBooks($statusId: Int!) {
	        me {
	          user_books(where: { status_id: { _eq: $statusId } }) {
	            book {
	              id
	              title
	              image {
	                url
	              }
	              contributions {
	                author {
	                  name
	                }
	              }
	            }
	          }
	        }
	      }`,
				{
					statusId: 1,
				},
				true,
			),
			hardcoverGraphQL(
				`query getCurrentReadingAndList {
	        me {
	          user_books(where: { status_id: { _eq: 2 } }) {
	            rating
	            book {
	              id
	              title
	              contributions {
	                author {
	                  name
	                }
	              }
	            }
	          }
	          lists(where: {id: {_eq: 328925}}) {
	            id
	            name
	            books_count
	            list_books {
	              book {
	                title
	                user_books(
	                  where: {user_id: {_eq: 28090}}
	                  limit: 1
	                  order_by: {updated_at: desc}
	                ) {
	                  user_book_status {
	                    status
	                    slug
	                  }
	                  user_book_reads(limit: 1, order_by: {finished_at: desc_nulls_first}) {
	                    started_at
	                    finished_at
	                  }
	                }
	              }
	            }
	          }
	        }
	      }`,
				{},
				true,
			),
			hardcoverGraphQL(
				`query getBooksByYear {
			      me {
			        # We fetch from user_books directly to get all your reading history
			        user_books(where: {user_book_status: {slug: {_eq: "read"}}}) {
			          book {
			            title
			          }
			          user_book_reads {
			            finished_at
			          }
			        }
			      }
					    }`,
				{},
				true,
			),
		]);

		const userBooks = listInfo.data.me[0].user_books || [];

		// --- Transform Data: Grouping by Year ---
		const booksByYear = userBooks.reduce((acc, entry) => {
			const title = entry.book.title;

			entry.user_book_reads.forEach((read) => {
				if (read.finished_at) {
					const year = new Date(read.finished_at).getFullYear();
					if (!acc[year]) acc[year] = [];

					// Prevent duplicate titles in the same year if necessary
					if (!acc[year].find((b) => b.title === title)) {
						acc[year].push({ title, date: read.finished_at });
					}
				}
			});
			return acc;
		}, {});

		// Sort years descending (2026, 2025, etc.)
		const sortedYears = Object.keys(booksByYear).sort((a, b) => b - a);
		// const booksByYear = userBooks.reduce((acc, entry) => {
		//   const title = entry.book.title;

		//   // A book might have multiple read dates (re-reads)
		//   entry.user_book_reads.forEach(read => {
		//     if (read.finished_at) {
		//       const year = new Date(read.finished_at).getFullYear();

		//       if (!acc[year]) acc[year] = [];
		//       acc[year].push({ title, date: read.finished_at });
		//     }
		//   });

		//   return acc;
		// }, {});

		// // Sort the years descending
		// const sortedYears = Object.keys(booksByYear).sort((a, b) => b - a);

		// sortedYears.forEach(year => {
		//   console.log(`--- ${year} ---`);
		//   booksByYear[year].forEach(b => console.log(`- ${b.title} (${b.date})`));
		// });

		// console.log("📚 To-read data response:", JSON.stringify(toReadData, null, 2));
		// console.log("📚 Current data and list response:", JSON.stringify(currentDataAndList, null, 2));

		// Extract list books_count
		const readingList = currentDataAndList.data?.me[0].lists[0];
		listBooksCount = readingList.books_count || 0;
		listBooks = readingList.list_books;
		// console.log("📋 List books_count:", JSON.stringify(list.books_count, null));
		// console.log("📋 List:", listBooks, null);

		const allToReadBooks =
			toReadData.data?.me?.user_books?.map((item) => ({
				id: item.book.id,
				title: item.book.title,
				cover: item.book.image?.url || "",
				authors:
					item.book.contributions?.map((c) => ({
						name: c.author.name,
					})) || [],
			})) || [];
		// console.log("📚 All to-read books (before filter):", allToReadBooks);
		toReadBooks = allToReadBooks.filter((book) => !listBookIds.has(book.id));
		// console.log("📚 To-read books (after filter):", toReadBooks);

		currentBooks =
			currentDataAndList.data?.me?.user_books?.map((item) => ({
				id: item.book.id,
				title: item.book.title,
				cover: item.book.image?.url || "",
				authors:
					item.book.contributions?.map((c) => ({
						name: c.author.name,
					})) || [],
				rating: item.rating,
			})) || [];
		console.log("📚 Current books:", allToReadBooks);
	} catch (error) {
		console.error("Error fetching books:", error);
		toReadBooks = [];
		currentBooks = [];
	}

	console.log(currentBooks);
}

function writePost(tracks) {
	const tracksData = tracks.map(({ name, artist }) => ({
		title: name,
		artist: artist.name,
	}));

	console.log(formattedToday);

	const tracksJson = JSON.stringify(tracksData, null, 2);
	const postContent = fs
		.readFileSync("./scripts/now_template.mdx", "utf8")
		.replace(/{{date}}/g, formattedToday)
		.replace("{{tracks}}", tracksJson);

	if (process.env.DEBUG) {
		// console.log(postContent);
		return;
	}

	fs.writeFileSync(`./pages/api/books.json`, bookContent);
}

async function main() {
	console.log("Starting main function");
	try {
		const items = await getTopTracks(apiKey, 10);
		if (!items?.length) {
			console.log("No books found for this period, exiting");
			process.exit(0);
		}
		writePost(items);
	} catch (error) {
		console.error("Failed to generate links:", error.message);
		process.exit(1);
	}
}

main();
