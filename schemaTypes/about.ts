import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "about_intro",
      title: "intro",
      type: "string",
    }),
  ],
});
