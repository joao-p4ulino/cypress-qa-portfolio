module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'cypress'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  env: {
    'cypress/globals': true,
    node: true,
    es2020: true,
  },
  rules: {
    // Enforce cy.wait with aliases, never with numbers
    'cypress/no-unnecessary-waiting': 'error',
    // .clear().type() is a valid and common Cypress pattern
    'cypress/unsafe-to-chain-command': 'off',
    // Assure assertions exist
    'cypress/assertion-before-screenshot': 'warn',
    // TS rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['cypress.config.ts', '.eslintrc.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
