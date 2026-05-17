import { defineArrayMember, defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Internal label for editors (not rendered).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          name: "navItem",
          type: "object",
          fields: [
            {
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "href",
              title: "External / manual URL",
              type: "string",
              description:
                "Use for external links or manual paths. Leave empty when using an internal reference.",
            },
            {
              name: "internalRef",
              title: "Internal reference",
              type: "reference",
              to: [{ type: "post" }, { type: "page" }, { type: "category" }],
              description:
                "Linked document. Takes precedence when both are set.",
            },
          ],
          preview: {
            select: {
              label: "label",
              href: "href",
              ref: "internalRef.slug.current",
            },
            prepare({ label, href, ref }) {
              return { title: label ?? "Untitled", subtitle: ref ? `→ ${ref}` : href };
            },
          },
        }),
      ],
    }),
  ],
});
