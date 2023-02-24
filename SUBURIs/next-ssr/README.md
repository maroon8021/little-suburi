# Next SSR with AWS

## next/link がうまく動かなかった件

### 結論

lambda の handler として利用している `lambda.js` 内の `serverless-http` の引数に `binary:true` を食わせていたせい。  
`binary:true` を外すと正常に動く

### 発生していたこと

next/link でページ遷移する際には別ページに遷移し、そこから SSR するのではなく、次のページで利用する json を取得し、ある種の CSR を行うような振る舞いをしている。  
その際の取得している json の値がうまく取得できなかった

#### 第一トラップ: `_next/data/**/*.json` にアクセスしても S3 に流される

`_next` 配下は基本全部静的アセットだと思い全部 S3 に流すようにしていた。  
だがよく見ると上記の json は `_next/data/**/*.json` という URL をしており、どう考えても S3 側に流してもだめ。  
なので、`_next/data/*` のときは SSR サーバー側に流すようにした  

#### 第二トラップ: なぜか base64 にエンコードされたレスポンスがくる

上記のところで SSR サーバー側に流すようにしたので、何らかのレスポンスはあるようになった。  
しかし中身をみたところ不思議な文字列になってる。  
見た瞬間にあー base64 くさいなと思ったし、decode したらやっぱりそうだった。  

親の顔よりみたこのドキュメントをみにいった  
https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-payload-encodings-workflow.html  
https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-payload-encodings.html  

api-gateway の設定に `contentHandling` のところを `CONVERT_TO_TEXT` とかにしたら変わるかなーと思ったが変わらない。  
なので伝家の宝刀 `binaryMediaTypes` に `*/*` を追加したら動いた。  
謎。  
いやー動くのはいいけどまたこれしたら動いた、というのが解せぬ。  

今回ってテキストデータしかかえしてないはずだし、 `CONVERT_TO_TEXT` したらせめてなおってくれよと思ったがどうにもならない。  
lambda のレスポンスが nextjs と serverless-http にラップされすぎててどこまでわかるかなーと疑心暗鬼になりながら中を改めて覗いてみた、  

自前で用意した lambda.js の中身を覗いているとなんだか `binary:true` なる設定を見つけた。  
あれ？と思いこれを消して再度デプロイしてみたらちゃんと動いた。  
`binaryMediaTypes` の `*/*` もいらない。それはそう。  
`binary:true` にしていたら文字通り binary として lambda からはレスポンスがされていた様子。  
lambda proxy として使っている関係で binary は base64 にエンコードされてレスポンスされる。  
ただし、api-gateway では `binaryMediaTypes` を設定してないので、そこを解釈せずにそのままレスポンスする。  
そして `binaryMediaTypes` を設定したら decode されてレスポンスされるからたまたま動いた、というだけだった。  

基本的に普通に使ってる限りはテキストデータしか扱わないはずなので、一旦は binary の設定をしないでもいいかなと考えている  
内部実装的にも設定がなかったら header の中身をみて binary かどうか解釈するようだから、普通に使ってる限りは binary ではない、としてレスポンスしてくれそう  
https://github.com/dougmoscrop/serverless-http/blob/master/lib/provider/aws/is-binary.js#L28  
