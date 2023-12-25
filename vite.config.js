import handlebars from "vite-plugin-handlebars";
import autoprefixer from "autoprefixer";
import nested from "postcss-nested";
import customProperties from "postcss-custom-properties";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [
    //@ts-expect-error
    handlebars(),
    // eslint(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        nested,
        customProperties,
      ],
    },
  },
});
