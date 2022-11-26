module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 0,
      features: { "nesting-rules": false },
    },
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
