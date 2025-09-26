import { db } from 'astro:db';
import { ClickCounter } from 'astro:db';

// This script can be run manually to initialize the database
// Run with: node scripts/init-db.js
export default async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Check if any ClickCounter entries exist
    const existing = await db.select().from(ClickCounter).all();

    if (existing.length === 0) {
      console.log('No existing data found, database is empty.');
      console.log('ClickCounter entries will be created on-demand when users interact with jokes.');
    } else {
      console.log(`Found ${existing.length} existing ClickCounter entries.`);
    }

    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase();
}
