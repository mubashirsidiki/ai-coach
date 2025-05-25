import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["next/core-web-vitals"],
  ignorePatterns: ["node_modules/**", ".next/**", "build/**"],
  rules: {
    "no-unused-vars": "warn"
  }
};

export default config;
