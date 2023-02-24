# cloudfront x api-gateway

## apigw x lambda の結果を cloudfront は cache できる

それはそう
`cachePolicy` を意図して設定しなければいいかんじに cache してくれる policy があたっている。
今回試した lambda では「lambda が実行されたタイミングでの時間を返す」処理を入れてみた。
cache しなければ毎回アクセスするたびに時間が変わるが、cache されてたら時間が cache が存在しないタイミングでアクセスした際の時間が残り続けることになった。

`cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,` で cache しないようにできた。

## ApiKey を使って cloudfront からのみアクセスできるようにする

cloudfront 側は header の許可と header に付与することができればよい

### api-gateway 側が微妙に沼った話

ApiKey も生成しつつ Plan も足したけどなんか動かんな〜と思ってたが、api-gateway の log を見たところ「stage と紐付いてないよ」とのことだったので stage と紐付けるようにしたら動いた

※ちゃんと試しきれてないこと
value の値ってどうにかして自前で生成せずに cloudfront 側に渡せないのかな？
