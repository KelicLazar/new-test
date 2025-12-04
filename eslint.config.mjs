import antfu from "@antfu/eslint-config";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  antfu(
    {
      type: "app",
      vue: true,
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
      ignores: ["**/migrations/*", ".nuxt"],
    },
    {
      rules: {
        "vue/max-attributes-per-line": ["error", {
          singleline: {
            max: 2,
          },
          multiline: {
            max: 1,
          },
        }],
        "ts/no-redeclare": "off",
        "ts/consistent-type-definitions": ["error", "type"],
        "no-console": ["off"],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": [
          "error",
          {
            tsconfigRootDir: ".",
          },
        ],
        "unicorn/filename-case": [
          "error",
          {
            case: "kebabCase",
            ignore: ["README.md"],
          },
        ],
        "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
        "no-trailing-spaces": "error",
        "eol-last": ["error", "always"],
        "indent": ["error", 2],
        "padding-line-between-statements": [
          "error",
          { blankLine: "always", prev: "directive", next: "*" },
          { blankLine: "any", prev: "directive", next: "directive" },
          { blankLine: "always", prev: "*", next: "return" },
        ],
      },
    },
  ),
  // Your custom configs here
);
