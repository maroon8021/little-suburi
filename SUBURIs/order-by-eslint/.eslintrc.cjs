module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
  plugins: ["react-refresh", "import", "unused-imports"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "no-console": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
      },
    ],
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            from: "./src/api/**/*",
            target: "./src/components/**/*",
            message: "API should not import components",
          },
        ],
      },
    ],
    // eslint-plugin-unused-importsとのconflictしないようにする
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
  },
};
