module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  overrides: [
    {
      test: /\.mjs$/,
      compact: false,
    },
  ],
};
