---
title: 'Your Books, Your Way: Crafting a Custom Literal.club Display in Astro JS'
description: 'Looking to feature your Literal.club reading list on your personal site? This guide shows you how to fetch your book data from the Literal.club API and display it beautifully using Astro JS.'
pubDate: 'February 10 2025'
tags:
    - graphql
    - api
draft: true
---

This post will guide you through the process of integrating external data into your Astro JS application by fetching a list of books from the Literal.club API and displaying them.

1. Understanding the Literal.club API
The Literal.club API is built on GraphQL. To access user-specific data like your book list, you'll need to authenticate.

API Endpoint: All requests are sent via a POST method to https://literal.club/graphql/.
Authentication:
You'll first need to perform a login mutation with your email and password to receive an access token.
This token should then be included in the Authorization header for subsequent authenticated queries (e.g., Authorization: Bearer YOUR_ACCESS_TOKEN).
Key Query for Books:
The myBooks query (query myBooks { myBooks { ...BookParts } }) returns all books associated with your profile through reading states or shelves. You'll need to define BookParts as a GraphQL fragment to specify which book details you want to retrieve (e.g., title, author, cover image).
2. Setting Up Your Astro Project
If you don't already have an Astro project, you can create one:
npm create astro@latest

3. Fetching Data in Astro JS
Astro provides a straightforward way to fetch data, especially when you need to render content at build time (Static Site Generation) or at runtime (Server-Side Rendering).

Using fetch() in Astro Components:
Astro components (files with a .astro extension) have access to the global fetch() function in their component script (the "frontmatter" area between ---). You can use await fetch() directly.

Code snippet

---
// src/pages/index.astro or a component
const LITERAL_API_ENDPOINT = 'https://literal.club/graphql/';
const YOUR_ACCESS_TOKEN = 'YOUR_GENERATED_ACCESS_TOKEN'; // Replace with your actual token

let books = [];
try {
  const response = await fetch(LITERAL_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query MyBooks {
          myBooks {
            title
            author {
              name
            }
            cover
            # Add other fields you need from the BookParts fragment
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  books = result.data.myBooks;
} catch (error) {
  console.error('Error fetching books:', error);
}
---

<div>
  <h1>My Books from Literal.club</h1>
  {books.length > 0 ? (
    <ul>
      {books.map((book) => (
        <li>
          <h2>{book.title}</h2>
          <p>Author: {book.author?.name || 'N/A'}</p>
          {book.cover && <img src={book.cover} alt={`Cover of ${book.title}`} style="width: 100px;" />}
        </li>
      ))}
    </ul>
  ) : (
    <p>No books found or error fetching data.</p>
  )}
</div>
Considerations:

Build-time vs. Runtime Fetching: By default, fetch calls in Astro components are executed at build time, meaning the data is fetched once when your site is built. If you need data to be fresh on every page load (e.g., for dynamic user-specific data), you'll need to enable Server-Side Rendering (SSR) in your astro.config.mjs file (output: 'server') or fetch data client-side within a framework component (e.g., React, Vue) with a client:* directive.
API Routes (Optional for Server-Side Logic): For more complex server-side data handling, you could create an API route in Astro (src/pages/api/books.js) to handle the fetch call to Literal.club, and then fetch from your own Astro API route in your components. This can help keep API keys more secure and centralize your data fetching logic.
4. Displaying the Data
Once you have the books array, you can map over it in your Astro component's template to render the list of books, including their titles, authors, and covers.

By following these steps, you can successfully fetch and display dynamic content from external APIs like Literal.club within your Astro JS application.
