# Apollo Server V3

## 2022/06/06 union を調べてみた

https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/

単一の型しか使えないところから union が使えるようになったのはよかった。
ただ、 `input` の型にはまだ使えなさそうで、これは `oneOf` という機能で解決されそう
https://github.com/graphql/graphql-spec/issues/488

※overload 的なのもできないっぽい
https://stackoverflow.com/questions/40184367/do-graphql-fields-support-polymorphism-based-on-passed-in-arguments
