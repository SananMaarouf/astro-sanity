import { defineField, defineType } from "sanity";

export const landingType = defineType({
  name: "landing",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "internationalizedArrayString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Fallback / thumbnail image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative Text" },
      ],
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video ID",
      type: "string",
      description:
        "YouTube video ID. For https://www.youtube.com/watch?v=dWXexKyF1U8 the ID is dWXexKyF1U8",
    }),
    defineField({
      name: "video",
      title: "Video File",
      type: "file",
      description: "Optional video file displayed on the landing page.",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "ctaText",
      type: "internationalizedArrayString",
      description: "Call to action text",
    }),
    defineField({
      name: "ctaBtnText",
      type: "internationalizedArrayString",
      description: "Call to action button label",
      validation: (rule) => rule.required(),
    }),
  ],
});
