import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true
});

export default [
  {
    ignores: ["node_modules/**", ".next/**", "build/**"],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
