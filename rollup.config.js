import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

export default {
  input: "src/wkx.js",
  output: [{ file: "dist/wkx.mjs", format: "esm" }],
  plugins: [
    copy({
      targets: [{ src: "src/wkx.d.ts", dest: "dist/" }],
    }),
    terser(),
  ],
};
