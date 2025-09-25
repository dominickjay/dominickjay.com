import { db } from 'astro:db';
import { ClickCounter } from 'astro:db';

export default async function seed() {
  // Initialize with emoji reaction buttons
  await db.insert(ClickCounter).values([
    {
      buttonName: 'joke-laugh',
      clickCount: 0,
      lastClicked: new Date()
    },
    {
      buttonName: 'joke-love',
      clickCount: 0,
      lastClicked: new Date()
    },
    {
      buttonName: 'joke-facepalm',
      clickCount: 0,
      lastClicked: new Date()
    }
  ]);
}
