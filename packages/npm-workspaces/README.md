# npm workspace

ちょっと挙動を確認したかった

https://docs.npmjs.com/cli/v7/using-npm/workspaces

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

## 2022/04/18 サブパッケージの挙動が変だった

### 事象

以下をやるとうまくいかない
npm のレジストリ側を探しにいく関係で死ぬ(というか同名のパッケージあったら勝手に入れられてめちゃくちゃ困るんだが…)

```
npm install @packages/sub-a -w @packages/sub-b
```

### うまくいくやつ

root にはシュッと入る

```
npm install @packages/sub-a
```

install するものを直接指定したらいける(以下の path はあくまで例)

```
npm install src/packages/sub-a -w @packages/sub-b
```

### 原因ぽいやつ

前に一度うまくいってなかったぽい ↓
https://github.com/npm/cli/issues/3637

一応なおって、 `npm v8.5.0` から正常なかんじらしい
https://github.com/npm/cli/issues/3637#issuecomment-1029455304

#### なお、8.5.0 でやってみたら

- 一応動く
- ただこのエラーがでる : https://github.com/npm/cli/issues/3847
- install した値も `hoge: file:~~~` とかではなく `hoge: v1.0.0` とかになってて若干不安

ちゃんと治ることを祈る
