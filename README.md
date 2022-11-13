# wedding-invitation

Web App of our wedding invitation

## 環境構築

### Backend

#### Serverless Framework with TypeScript

1. [serverless/serverless-plugin-typescript](https://github.com/serverless/serverless-plugin-typescript), [dherault/serverless-offline](https://github.com/dherault/serverless-offline) をインストール
    - `yarn add -D typescript serverless-plugin-typescript serverless-offline`
1. [Lambda用の型情報](https://www.npmjs.com/package/@types/aws-lambda), [AWS SDK](https://www.npmjs.com/package/aws-sdk)などのインストール
    - `yarn add -D @types/aws-lambda @types/node aws-sdk@2.1083.0`
    - [Lambda TypeScript SDK version](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-typescript.html)
1. ソースマップを有効にして、コンパイル後のJSではなくコンパイル前のTSのファイル情報がスタックトレースに表示されるようにする
    - `serverless.yml`にて、Lambdaの環境変数に下記を追加
      - `NODE_OPTIONS: --enable-source-maps`
    - [TypeScript+Node.jsでsourcemap対応を加えてエラーログ調査を行いやすくしたい](https://dev.classmethod.jp/articles/node-typescript-source-map-support/)

#### 確認コマンド

`devDependencies`はデプロイされないことに注意。SDKは元々ランタイムにサポートされている。
追加で必要なパッケージのみ、`dependencies`に追加する。

- デプロイ：`sls deploy --verbose`
- ローカル：`sls offline`

### Frontend

#### React with TypeScript

1. [Create React App - Adding TypeScript](https://create-react-app.dev/docs/adding-typescript)の実行
    - `yarn create react-app frontend --template typescript`

### TODO

1. [k1LoW/serverless-s3-sync](https://github.com/k1LoW/serverless-s3-sync), [【AWS】ServerlessFrameworkでS3静的ホスティングを設定する](https://zenn.dev/daisu0925/articles/c55a4b44b8e093)
1. linter見る
1. OpenAPIで型作成
