import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  ...tanstackConfig,
  {
    ignores: [".output/**", "dist/**", "build/**", "node_modules/**"],
  },

  // 2. Your existing configuration objects follow below...
  {
    files: ["**/*.ts", "**/*.tsx"],
    // ... rest of your setup
  },
];
