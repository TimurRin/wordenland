/* eslint-disable no-undef */
import fs from "fs";
import { resolve } from "path";

const version = JSON.parse(fs.readFileSync("version.json", "utf8"));

/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        wordlyaUnleashed: resolve(__dirname, "wordlya-unleashed/index.html"),
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(
      `v${version.major}.${version.minor}.${version.patch}`,
    ),
  },
};
