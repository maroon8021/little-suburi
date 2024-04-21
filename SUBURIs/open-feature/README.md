# open feature

feature flag でいいライブラリがあるっぽかったので試してみたかった

## backend

```
 WARN  Issues with peer dependencies found
.
├─┬ @openfeature/server-sdk 1.13.5
│ └── ✕ missing peer @openfeature/core@1.1.0
└─┬ @openfeature/flagd-provider 0.13.0
  ├── ✕ missing peer @grpc/grpc-js@"~1.8.0 || ~1.9.0 || ~1.10.0"
  └─┬ @openfeature/flagd-core 0.1.11
    └── ✕ missing peer @openfeature/core@>=0.0.16
Peer dependencies that should be installed:
  @grpc/grpc-js@"~1.8.0 || ~1.9.0 || ~1.10.0"
  @openfeature/core@1.1.0
```

↓

```sh
p add @openfeature/server-sdk @openfeature/core @grpc/grpc-js
```
