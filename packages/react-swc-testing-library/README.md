# React × Jest × 　 SWC 　　 × testing-linrary

https://zenn.dev/uttk/scraps/475390e9d5b820

```sh
npx create-next-app@latest --ts


yarn add -D jest @types/jest @swc/core @swc/jest @testing-library/react @testing-library/jest-dom
```

https://zenn.dev/miruoon_892/articles/e42e64fbb55137

## getBy と queryBy と findBy

https://testing-library.com/docs/queries/about#types-of-queries

- getBy は要素がなければエラーを返す
- queryBy は Nullable のときなどに利用
- findBy は非同期の結果を取得するときに利用

なんかコケた
https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function

## 参考

https://zenn.dev/bom_shibuya/articles/5c3ae7745c5e94
https://testing-library.com/docs/react-testing-library/example-intro/
https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f
