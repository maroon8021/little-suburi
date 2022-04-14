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

## 余談
```json
{
  "name": "@hoge"
}
```
はできない(エラーになる)


https://docs.npmjs.com/cli/v8/using-npm/scope
