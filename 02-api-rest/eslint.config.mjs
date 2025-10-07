import antfu from "@antfu/eslint-config"
import perfectionist from "eslint-plugin-perfectionist"

export default antfu({
  type: "app",
  react: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    quotes: "double"
  },

  plugins: { perfectionist },
  rules: {
    "antfu/if-newline": ["off"],
    "no-console": ["off"],
    "react/no-array-index-key": ["off"],
    "perfectionist/sort-imports": [
      "warn",
      {
        type: "alphabetical",
        order: "asc",
        ignoreCase: true,
        specialCharacters: "keep",
        partitionByNewLine: false,
        newlinesBetween: "always",
        internalPattern: ["^@/.+"],
        groups: [
          "type-import",

          "value-builtin", // node built-ins (fs, path, etc)
          "value-external", // node_modules
          "value-internal", // @alias ou ~ alias
          ["value-parent", "value-sibling", "value-index"], // ./ ../

          "unknown"
        ],
        customGroups: []
      }
    ],
    "node/prefer-global/process": ["off"],
    "style/arrow-parens": ["warn", "as-needed"],
    "style/brace-style": ["off"],
    "style/comma-dangle": ["off"],
    "style/eol-last": ["warn", "always"],
    "style/jsx-one-expression-per-line": ["off"],
    "style/multiline-ternary": ["off"],
    "style/no-trailing-spaces": ["off"],
    "style/operator-linebreak": ["off"],
    "style/quote-props": ["off"],
    "ts/consistent-type-definitions": ["error", "type"],
    "unicorn/prefer-node-protocol": ["off"],
    "unused-imports/no-unused-vars": ["warn"],
    "unicorn/throw-new-error": "off",
    "unicorn/new-for-builtins": "off",
    "react-hooks-extra/no-direct-set-state-in-use-effect": ["off"]
  },

  ignores: ["tsconfig.json", "src/@types"]
})
