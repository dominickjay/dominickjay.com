import { getCollection } from "astro:content";

export async function getPublishedNotes() {
  return getCollection("notes", ({ data }) => !data?.draft);
}

export async function getNotesForPreview() {
  if (import.meta.env.DEV) {
    return getCollection("notes");
  }
  return getPublishedNotes();
}

export function navWithoutNotes<T extends { href: string }>(
  items: T[],
  hasNotes: boolean,
) {
  return hasNotes ? items : items.filter((item) => item.href !== "/notes");
}
