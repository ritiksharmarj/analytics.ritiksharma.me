import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    ignorePatterns: [
      "dist",
      "node_modules",
      ".next",
      "build",
      "public",
      "yarn.lock",
      "pnpm-lock.yaml",
      "package-lock.json",
      ".env*",
    ],
  }),
];

export default eslintConfig;
