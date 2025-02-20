// eslint.config.js
import { defineConfig } from "eslint-define-config";
import pkg from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

export default defineConfig([
  {
    languageOptions: {
      parser: pkg.default, // parser 설정
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "writable", // 글로벌 변수 설정
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true }, // true 또는 false로 설정
      ],
    },
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  {
    files: ["*.jsx", "*.tsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
