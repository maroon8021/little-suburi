1. https://cloud.google.com/sdk/docs/install?hl=ja
2. https://cloud.google.com/sdk/docs/authorizing?hl=ja

```sh
docker build -t asia-northeast1-docker.pkg.dev/[PROJECT_ID]/console-log-example/[IMAGE]:[TAG] .
docker push asia-northeast1-docker.pkg.dev/[PROJECT_ID]/console-log-example/[IMAGE]:[TAG] .
```

```
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
```

```
docker rmi $(docker images 'asia-northeast1-docker.pkg.dev/xxx/console-log-example/*' -q)
```
