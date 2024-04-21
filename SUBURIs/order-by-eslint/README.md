# Order by ESlint

↓ これを試したかった
https://zenn.dev/riemonyamada/articles/02e8c172e1eeb1

```sh
pnpm create vite
pnpm install
pnpm dev

pnpm add -D eslint-plugin-import
```

```
Definition for rule 'import/order' was not found.eslint(import/order)
```

なんだこれ？
https://stackoverflow.com/questions/67489042/why-eslint-plugin-for-import-order-doesnt-work-in-cra
`plugins: ["react-refresh", "import"],` で静かになった

ついでに import 禁止のやつも試してみた
https://zenn.dev/sqer/articles/35d56d9850efb2
https://zenn.dev/sho_ts/articles/752cac66d90443

なんか動かなかった
https://stackoverflow.com/questions/57032522/eslint-complains-about-typescripts-path-aliasing
https://scrapbox.io/natsuking-public/vscode%E3%81%A7%E3%81%AE_%60Parsing_error:_Cannot_read_file_'xxxxxx%2Ftsconfig.json'.eslint%60_%E3%81%AE%E8%A7%A3%E6%B1%BA%E6%B3%95

### explicitがわからなくなったから試してみた

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit"
},
```

https://zenn.dev/braveryk7/articles/source-fixall-eslint-value

### unused-imports

https://zenn.dev/rena_h/scraps/fd330154d02f76

https://stackoverflow.com/questions/71913692/module-not-found-error-cant-resolve-react-dom-client
