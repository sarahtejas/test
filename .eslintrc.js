const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "cypress",
    "jest",
    "prettier",
    "react",
    "react-hooks"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "plugin:import/errors"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    project: ["./tsconfig.json", "./cypress/tsconfig.json"],
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    curly: [2, "multi-line"],
    "no-restricted-globals": [
      "warn",
      ...["name", "event"].map(global => ({
        name: global,
        message: `Did you mean to declare a local \`${global}\`? If not, use \`window.${global}\` instead.`
      }))
    ],
    "arrow-body-style": ["warn", "as-needed"],
    "prefer-object-spread": "warn",
    "@typescript-eslint/camelcase": [0, { properties: "never" }],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-var-requires": "off",
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-unescaped-entities": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/order": "error"
  },
  env: {
    "jest/globals": true,
    "cypress/globals": true,
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      alias: {
        map: [["~", path.resolve(__dirname, "src")]],
        extensions: [".js", ".ts", ".tsx", ".json"]
      }
    }
  }
};
