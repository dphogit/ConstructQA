module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'max-len': ['error', { code: 80 }],
    "import/extensions": "off",
  },
};
