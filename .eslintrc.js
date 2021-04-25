module.exports = {
  ignorePatterns: ['node_modules', 'build', '*.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: { version: 'detect' }
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'multiline-comment-style': ['error', 'separate-lines'],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        aspects: ['invalidHref']
      }
    ],
    "jsx-a11y/no-autofocus": [ 2, {
      "ignoreNonDOM": true
    }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
  }
};
