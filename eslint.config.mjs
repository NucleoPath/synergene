import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Skill tooling/reference content, not shipped app source.
    ".agents/**",
  ]),
  {
    // components/ai-elements/** is vendor code installed via the shadcn CLI
    // from the Vercel AI-Elements registry. Keep it type-checked normally,
    // but downgrade the newer react-hooks rules to warnings since they
    // frequently false-positive on this code's patterns and we don't want
    // to hand-fix upstream source on every registry update.
    files: ["components/ai-elements/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/static-components": "warn",
    },
  },
  // Disable ESLint stylistic rules that conflict with Prettier. Keep last.
  eslintConfigPrettier,
]);

export default eslintConfig;
