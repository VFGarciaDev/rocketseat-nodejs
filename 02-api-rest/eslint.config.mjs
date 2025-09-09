import { defineConfig } from "eslint/config"
import prettier from "eslint-config-prettier"
import eslintPluginPrettier from "eslint-plugin-prettier"

export default defineConfig([
  {
    files: ["**/*.{js,ts,tsx}"],
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": ["error"]
    },
    extends: [prettier]
  }
])
