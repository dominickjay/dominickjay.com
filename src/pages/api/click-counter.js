import { createClient } from "@libsql/client/web";

// Initialize Turso client with environment variables
const databaseUrl = import.meta.env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!databaseUrl || !authToken) {
  console.error('Missing Turso environment variables:', {
    TURSO_DATABASE_URL: !!databaseUrl,
    TURSO_AUTH_TOKEN: !!authToken
  });
}

const turso = createClient({
  url: databaseUrl,
  authToken: authToken,
});

export async function POST({ request }) {
  try {
    const { buttonName } = await request.json();

    if (!buttonName) {
      return new Response(JSON.stringify({ error: 'Button name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if button already exists
    const existingButton = await turso.execute({
      sql: "SELECT * FROM ClickCounter WHERE buttonName = ?",
      args: [buttonName]
    });

    if (existingButton.rows.length > 0) {
      // Update existing button count
      const currentCount = existingButton.rows[0].clickCount;
      await turso.execute({
        sql: "UPDATE ClickCounter SET clickCount = ?, lastClicked = ? WHERE buttonName = ?",
        args: [currentCount + 1, new Date().toISOString(), buttonName]
      });
    } else {
      // Create new button entry
      await turso.execute({
        sql: "INSERT INTO ClickCounter (buttonName, clickCount, lastClicked) VALUES (?, ?, ?)",
        args: [buttonName, 1, new Date().toISOString()]
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating click counter:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  try {
    const result = await turso.execute({
      sql: "SELECT * FROM ClickCounter ORDER BY lastClicked DESC"
    });

    const counters = result.rows.map(row => ({
      id: row.id,
      buttonName: row.buttonName,
      clickCount: row.clickCount,
      lastClicked: row.lastClicked
    }));

    return new Response(JSON.stringify(counters), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching click counters:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
