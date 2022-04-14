# npm workspace

ちょっと挙動を確認したかった

## 雑感
```ts
import { calc } from "x-hoge-a";
```
はできる

```json
{
  ...
  "workspaces": [
    "packages/*"
  ],
  "dependencies": {
    "x-hoge-a": "*",
    "x-hoge-b": "*"
  },
  ...
}
```

`dependencies` に追加しないと、以下のように怒られる
```
'x-hoge-b' should be listed in the project's dependencies. Run 'npm i -S x-hoge-b' to add iteslintimport/no-extraneous-dependencies
```


## 余談
```json
{
  "name": "@hoge"
}
```
はできない(エラーになる)


https://docs.npmjs.com/cli/v8/using-npm/scope
