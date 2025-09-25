import { db, eq } from 'astro:db';
import { ClickCounter } from 'astro:db';

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
    const existingButton = await db.select().from(ClickCounter).where(eq(ClickCounter.buttonName, buttonName)).get();

    if (existingButton) {
      // Update existing button count
      await db.update(ClickCounter)
        .set({
          clickCount: existingButton.clickCount + 1,
          lastClicked: new Date()
        })
        .where(eq(ClickCounter.id, existingButton.id));
    } else {
      // Create new button entry
      await db.insert(ClickCounter).values({
        buttonName: buttonName,
        clickCount: 1,
        lastClicked: new Date()
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
    const counters = await db.select().from(ClickCounter).all();
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
