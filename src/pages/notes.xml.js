import rss from "@astrojs/rss";
import { getPublishedNotes } from "../utils/notes";

export async function GET(context) {
  const notes = await getPublishedNotes();

  if (notes.length === 0) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }

  return rss({
    title: "Notes | Dom Jay",
    description:
      "Short asides that don't belong in Writing. No CSS, no career anxiety — just things I wanted to write down.",
    site: context.site,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description ?? note.data.title,
      pubDate: note.data.pubDate,
      link: `/notes/${note.id}/`,
    })),
  });
}
