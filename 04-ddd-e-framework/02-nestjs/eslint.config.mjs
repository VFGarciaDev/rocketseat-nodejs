import antfu from "@antfu/eslint-config"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default antfu({
  formatters: true,
  typescript: true,
  stylistic: {
    quotes: "double"
  },
  plugins: {
    "simple-import-sort": simpleImportSort
  },
  rules: {
    "import/order": "off", // Avoid conflicts with `simple-import-sort` plugin
    "sort-imports": "off", // Avoid conflicts with `simple-import-sort` plugin
    "node/prefer-global/process": ["off"],
    "ts/consistent-type-imports": ["off"],
    "style/comma-dangle": ["warn", "never"]
  }
})
