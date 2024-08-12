# ベースイメージとして公式のNode.jsイメージを使用
FROM node:22-alpine

ENV BUILD_DATE=${BUILD_DATE}

# アプリケーション用のディレクトリを作成
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY ./index.js ./

EXPOSE 8080

# アプリケーションを実行
CMD ["npm", "start"]
