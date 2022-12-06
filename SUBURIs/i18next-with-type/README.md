# i18next-with-type

## setup

```sh
$ npx create-next-app --typescript
```

https://www.npmjs.com/package/next-i18next

```sh
p add next-i18next react-i18next i18next

```

```sh
p add -D ts-node

```

## jsonからkeyを取得して `t` に特定のkeyしか食わせれないようにする
[generate-i18next-key-type.ts](./scripts/generate-i18next-key-type.ts)

```sh
pnpm typegen
```
[typegen](./package.json#L10)

`@types/translation-keys.ts` が生成されるので、その型を [useTypedTranslation](./hooks/useTypedTranslation.ts) で読み込み、この `useTypedTranslation` から `t` を取得して利用する

```tsx
const { t } = useTypedTranslation("common");
return (
  <p>
    translated text: {t("sample.text")}
  </p>
)
```
