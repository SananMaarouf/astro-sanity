import { defineField, defineType } from "sanity";

export const featuresType = defineType({
  name: "features",
  type: "document",
  title: "Features",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Features Title",
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Feature Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string", title: "Icon (emoji or class)" },
            { name: "title", type: "string", title: "Feature Title" },
            { name: "description", type: "text", title: "Feature Description" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
