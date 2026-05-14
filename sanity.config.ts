import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { structure } from "./src/sanity/structure";


export default defineConfig({
  projectId: "st4o1d3z",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    internationalizedArray({
      languages: [
        { id: "en", title: "English" },
        { id: "nb", title: "Norwegian Bokmål" },
      ],
      defaultLanguages: ["en"],
      fieldTypes: ["string", "text", "blockContent"],
    }),
  ],
  schema,
});
