import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default [
  globalIgnores([".next/**", "node_modules/**", "coverage/**"]),
  ...nextVitals,
  ...nextTs,
];
