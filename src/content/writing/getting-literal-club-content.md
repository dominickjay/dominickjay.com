---
title: 'Getting Literal.club Content'
description: 'A technical overview of integrating with the Literal.club API to display reading data'
pubDate: 'February 10 2025'
tags:
    - graphql
    - api
    - reading
draft: true
---

# Integrating with Literal.club

## Overview
This document outlines the process of retrieving and displaying reading data from Literal.club using their GraphQL API.

## Authentication
- Requires a Literal.club API token
- Token is stored in environment variables
- Profile ID is also required for user-specific data

## API Endpoints
- Base URL: `https://literal.club/graphql/`
- All requests use POST method
- Content-Type: application/json

## Main Queries

### Currently Reading Books
```graphql
query booksByReadingStateAndProfile(
  $limit: Int!
  $offset: Int!
  $readingStatus: ReadingStatus!
  $profileId: String!
) {
  booksByReadingStateAndProfile(
    limit: $limit
    offset: $offset
    readingStatus: $readingStatus
    profileId: $profileId
  ) {
    id
    title
    cover
    authors {
      name
    }
  }
}
```

### Reading History
- Additional query to get read dates for each book
- Returns start and finish dates
- Used to organize books by year

## Data Processing
1. Fetch currently reading books
2. Fetch finished books
3. For each finished book:
   - Query read dates
   - Organize by year
   - Store in a Map for efficient access

## Display
- Two view modes: list and grid
- Currently reading section at top
- Books organized by year below
- Each book shows:
  - Cover image (only displayed when cover path is available)
  - Title
  - Author
  - Reading dates (if available)
- Conditional rendering for cover images to prevent display issues

## Implementation Notes
- Uses Alpine.js for view toggling
- Responsive grid layout
- Hover effects for book details
- Image optimization with Astro's Image component

## Error Handling
- API errors are caught and logged
- Fallback displays for missing data
- Graceful degradation if API is unavailable

## Future Improvements
- Caching strategy for API responses
- Pagination for large book collections
- Reading statistics and insights
- Integration with other reading platforms
