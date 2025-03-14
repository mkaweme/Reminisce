import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      stylistic
    },
    settings: {
      react: {
        version: "detect" // Automatically detects the installed React version
      }
    },
    rules: {
      "stylistic/semi": ["error", "always"],
      "stylistic/quotes": ["error", "double"],
      "stylistic/indent" : ["error", 2],
      "stylistic/object-curly-spacing": ["error", "always"],
      "stylistic/no-multiple-empty-lines": [
        "error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }
      ],
      "stylistic/max-len": ["error", { "code": 96, "tabWidth": 2 }],
      // "prettier/prettier": ["error", { "printWidth": 80 }]
    },
  },
  prettierConfig,
];
