import { defineDb, defineTable, column } from 'astro:db';

const ClickCounter = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    buttonName: column.text(),
    clickCount: column.number({ default: 0 }),
    lastClicked: column.date({ default: new Date() })
  }
});

export default defineDb({
  tables: { ClickCounter }
});
