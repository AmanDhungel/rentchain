import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-constant-condition": "warn",
      "no-unreachable-loop": "warn",
      "import/order": [
        "warn",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "pathGroups": [
            {
              "pattern": "@/action",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/lib/**",
              "group": "internal",
              "position": "before"
            },
            {
              "pattern": "@/modules/**",
              "group": "internal",
              "position": "after"
            }
          ],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "newlines-between": "ignore",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "@typescript-eslint/no-use-before-define": [
        "warn",
        { "functions": false, "variables": false }
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          "selector": "variable",
          "format": ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"]
        }
      ],
      "@typescript-eslint/no-unused-expressions": "off",
      "react/jsx-filename-extension": [
        1,
        { "extensions": [".jsx", ".tsx", ".ts", ".js"] }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "import/extensions": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "react/no-danger": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-console": "error",
      "prettier/prettier": "off"
    }
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;