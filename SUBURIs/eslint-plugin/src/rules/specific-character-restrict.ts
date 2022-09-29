import { TSESLint } from "@typescript-eslint/utils";

export const ruleName: TSESLint.RuleModule<"messageId", []> = {
  meta: { type: "problem" },
  create: (context) => { ... }
}