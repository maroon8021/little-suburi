import { InMemoryProvider } from "@openfeature/server-sdk";

// https://zenn.dev/naas/articles/ts-challenges#%E5%88%9D%E7%B4%9A4-first-of-array%3A-%E8%A7%A3%E8%AA%AC-1
type First<T extends unknown[]> = T extends any[] ? T[0] : [];

type FlagConfigurationType = NonNullable<
  First<ConstructorParameters<typeof InMemoryProvider>>
>;

export const falgs: FlagConfigurationType = {
  canUseNewFeature: {
    variants: {
      on: true,
      off: false,
    },
    disabled: false,
    defaultVariant: "off",
    contextEvaluator: (ctx) => {
      console.log("ctx", ctx);
      return ctx.flag ? (ctx.flag as string) : "off";
    },
  },
  newFeatureText: {
    variants: {
      on: "This is a new feature",
      off: "This is an old feature",
    },
    disabled: false,
    defaultVariant: "off",
    contextEvaluator: (ctx) => {
      return ctx.flag ? (ctx.flag as string) : "off";
    },
  },
};
