# vite-react-static

バックエンドやインフラで実験したいとなったときに簡単に作れるフロントエンドを用意したかった。

React x TS でやりたい + lambda とかでわざわざ SSR するとかもしたくなかったので、cloudfront x s3 で静的サイトをホスティングできるスタックを用意したくなった

## やったこと

https://vitejs.dev/guide/#scaffolding-your-first-vite-project

```sh
pnpm create vite
pnpm build # dist に出力される
```
