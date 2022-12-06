import { useTranslation } from "next-i18next";
import { TranslationKeys } from "../@types/translation-keys";

type TypedTranslation<T> = (key: TranslationKeys) => T;

export const useTypedTranslation = (ns: string) => {
  const response = useTranslation(ns);

  return {
    ...response,
    t: response.t as unknown as TypedTranslation<ReturnType<typeof response.t>>,
  };
};
