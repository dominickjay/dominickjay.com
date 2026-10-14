import { HARDCOVER_LIST_ID, HARDCOVER_USER_ID } from "../consts";
import { ttlCached } from "./ttl-cache";

const HARDCOVER_ENDPOINT = "https://api.hardcover.app/v1/graphql";
const HARDCOVER_TTL = 30_000;

interface Contribution {
  author?: { name?: string };
}

export interface HardcoverBook {
  id?: number;
  title: string;
  contributions?: Contribution[];
}

export interface HardcoverUserBook {
  book: HardcoverBook;
}

/**
 * POST a GraphQL query to Hardcover. Successful responses are cached for 30s
 * (shared across pages, in-flight requests included). The caller passes the
 * token, usually `import.meta.env.HARDCOVER_TOKEN`.
 */
export function hardcoverQuery<T>(
  token: string | undefined,
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const trimmed = (token ?? "").trim();
  if (!trimmed) {
    return Promise.reject(
      new Error(
        "Hardcover token is required. Get it from https://hardcover.app/account/api",
      ),
    );
  }

  return ttlCached(
    JSON.stringify({ query, variables }),
    HARDCOVER_TTL,
    async () => {
      const response = await fetch(HARDCOVER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "dominickjay.com/1.0",
          authorization: trimmed.startsWith("Bearer ")
            ? trimmed
            : `Bearer ${trimmed}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        const body = await response.text();
        if (response.status === 429) {
          console.warn(
            "Hardcover rate limited. Consider waiting 60 seconds or using cached responses.",
          );
        }
        throw new Error(`Hardcover HTTP ${response.status}: ${body}`);
      }

      return (await response.json()) as T;
    },
  );
}

/**
 * The book to show as "current". Prefers the second in-progress entry when
 * there is one, otherwise the first. This is intentional, keep it in sync
 * everywhere "current book" is derived.
 */
function pickCurrentBook<T extends { book: HardcoverBook }>(
  userBooks: T[],
): HardcoverBook | undefined {
  return userBooks[1] ? userBooks[1].book : userBooks[0]?.book;
}

interface CurrentReadingResponse {
  data?: { me?: Array<{ user_books?: HardcoverUserBook[] }> };
}

export function getCurrentlyReadingBook(
  token: string | undefined,
): Promise<{ title: string; author: string | null } | null> {
  if (!token?.trim()) return Promise.resolve(null);

  return ttlCached("hardcover:current-book", HARDCOVER_TTL, async () => {
    try {
      const json = await hardcoverQuery<CurrentReadingResponse>(
        token,
        `query getCurrentReading {
        me {
          user_books(where: { status_id: { _eq: 2 } }) {
            book {
              title
              contributions { author { name } }
            }
          }
        }
      }`,
      );
      const book = pickCurrentBook(json?.data?.me?.[0]?.user_books ?? []);
      if (!book?.title) return null;
      return {
        title: book.title,
        author: book.contributions?.[0]?.author?.name ?? null,
      };
    } catch (error) {
      console.error("Error fetching current Hardcover book:", error);
      return null;
    }
  });
}

interface ReadingGoalResponse {
  data?: {
    me?: Array<{
      user_books?: HardcoverUserBook[];
      lists?: Array<{
        books_count?: number;
        list_books?: Array<{
          user_books?: Array<{ user_book_status?: { slug?: string } }>;
        }>;
      }>;
    }>;
  };
}

export async function getReadingGoal(token: string | undefined): Promise<{
  currentlyReading: HardcoverUserBook[];
  booksRead: number;
  goalTotal: number;
}> {
  let currentlyReading: HardcoverUserBook[] = [];
  let booksRead = 0;
  let goalTotal = 0;

  try {
    const json = await hardcoverQuery<ReadingGoalResponse>(
      token,
      `query getCurrentReadingAndList {
      me {
        user_books(where: { status_id: { _eq: 2 } }) {
          book {
            id
            title
            contributions { author { name } }
          }
        }
        lists(where: { id: { _eq: ${HARDCOVER_LIST_ID} } }) {
          id
          name
          books_count
          list_books {
            book { id title contributions { author { name } } }
            user_books(where: { user_id: { _eq: ${HARDCOVER_USER_ID} } }, limit: 1, order_by: { updated_at: desc }) {
              user_book_status { status slug }
            }
          }
        }
      }
    }`,
    );
    const me = json.data?.me?.[0];
    if (me) {
      currentlyReading = me.user_books ?? [];
      const list = me.lists?.[0];
      if (list) {
        goalTotal = list.books_count ?? 0;
        const listBooks = list.list_books ?? [];
        booksRead = listBooks.filter(
          (lb) => lb.user_books?.[0]?.user_book_status?.slug === "read",
        ).length;
      }
    }
  } catch (err) {
    console.error("[Hardcover] reading goal:", err);
  }

  return { currentlyReading, booksRead, goalTotal };
}
