import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";

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
  // Playwright-specific rules for e2e test files.
  {
    files: ["e2e/**"],
    plugins: {
      playwright,
    },
    settings: {
      playwright: {
        // Override plugin rule messages for additional context. Keyed by the rule's message id.
        messages: {
          // GOTCHA: prefer-locator guesses Page vs Locator by matching the receiver variable's
          // name against /(^(page|frame)|(Page|Frame)$)/, so a valid Locator stored in a variable
          // that starts with "page"/"frame" or ends with "Page"/"Frame" is falsely flagged.
          preferLocator:
            "Prefer locator methods instead of page methods. If this is a Locator, rename the variable to avoid the RegEx-based false positive. See https://github.com/mskelton/eslint-plugin-playwright/issues/441 for more details.",
        },
      },
    },
    rules: {
      "playwright/consistent-spacing-between-blocks": "error",
      "playwright/expect-expect": "error",
      "playwright/max-expects": "off",
      "playwright/max-nested-describe": "error",
      "playwright/missing-playwright-await": [
        "error",
        { includePageLocatorMethods: true },
      ],
      "playwright/no-commented-out-tests": "error",
      "playwright/no-conditional-in-test": "error",
      "playwright/no-conditional-expect": "error",
      "playwright/no-duplicate-hooks": "error",
      "playwright/no-duplicate-slow": "error",
      "playwright/no-element-handle": "error",
      "playwright/no-eval": "error",
      "playwright/no-focused-test": "error",
      "playwright/no-force-option": "error",
      "playwright/no-get-by-title": "error",
      "playwright/no-hooks": "off",
      "playwright/no-nested-step": "error",
      "playwright/no-networkidle": "error",
      "playwright/no-nth-methods": "off",
      "playwright/no-page-pause": "error",
      "playwright/no-raw-locators": "off",
      "playwright/no-restricted-locators": "off",
      "playwright/no-restricted-matchers": "off",
      "playwright/no-restricted-roles": "off",
      "playwright/no-skipped-test": [
        "error",
        {
          allowConditional: true, // allow conditional tests based on browser/environment setup. see https://playwright.dev/docs/test-annotations#conditionally-skip-a-test
        },
      ],
      "playwright/no-slowed-test": "off",
      "playwright/no-standalone-expect": "error",
      "playwright/no-unsafe-references": "error",
      "playwright/no-unused-locators": "error",
      "playwright/no-useless-await": "error",
      "playwright/no-useless-not": "error",
      "playwright/no-wait-for-navigation": "error",
      "playwright/no-wait-for-selector": "error",
      "playwright/no-wait-for-timeout": "error",
      "playwright/prefer-comparison-matcher": "error",
      "playwright/prefer-equality-matcher": "error",
      "playwright/prefer-hooks-in-order": "error",
      "playwright/prefer-hooks-on-top": "error",
      "playwright/prefer-locator": "error",
      "playwright/prefer-lowercase-title": "off",
      "playwright/prefer-native-locators": "error",
      "playwright/prefer-strict-equal": "error",
      "playwright/prefer-to-be": "error",
      "playwright/prefer-to-contain": "error",
      "playwright/prefer-to-have-count": "error",
      "playwright/prefer-to-have-length": "error",
      "playwright/prefer-web-first-assertions": "error",
      "playwright/require-hook": "error",
      "playwright/require-soft-assertions": "off",
      "playwright/require-tags": "error",
      "playwright/require-to-pass-timeout": "error",
      "playwright/require-to-throw-message": "error",
      "playwright/require-top-level-describe": [
        "error",
        { maxTopLevelDescribes: 3 },
      ],
      "playwright/valid-describe-callback": "error",
      "playwright/valid-expect-in-promise": "error",
      "playwright/valid-expect": "error",
      "playwright/valid-title": "error",
      "playwright/valid-test-tags": "error",
    },
  },
  // Disable ESLint stylistic rules that conflict with Prettier. Keep last.
  eslintConfigPrettier,
]);

export default eslintConfig;
