import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: projectRoot,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "dist/**", "out/**"],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;