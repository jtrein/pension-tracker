const isTest = process.env.VITEST;

const config = {
  // Do not process styles in the test environment.
  plugins: [isTest ? "" : "@tailwindcss/postcss"],
};

export default config;
