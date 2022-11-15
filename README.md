# wedding-invitation

Web App of our wedding invitation

## 環境構築

### Backend (Tag: v0.1.0)

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

### Backend Custom Domain (Tag: v0.1.2)

- [amplify-education/serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager)のインストール
  - `yarn add -D serverless-domain-manager`
- `api.wedding.example.com`ってできなかったので、`api-wedding.example.com`
  - > ワイルドカード証明書をリクエストする場合、アスタリスク (*) はドメイン名の左側に付ける必要があり、1 つのサブドメインレベルのみを保護できます
    - [ACM 証明書の特徴](https://docs.aws.amazon.com/ja_jp/acm/latest/userguide/acm-certificate.html)

### Frontend (Tag: v0.1.1)

#### React with TypeScript

1. [Create React App - Adding TypeScript](https://create-react-app.dev/docs/adding-typescript)の実行
    - `yarn create react-app frontend --template typescript`
1. React App をビルドする（`frontend/build`が作成されるので、これをS3にホスティングする。）
    - `cd frontend/`
    - `yarn build`
1. [k1LoW/serverless-s3-sync](https://github.com/k1LoW/serverless-s3-sync)のインストール
    - `yarn add -D serverless-s3-sync`
1. `resources/`配下を用意する
    - Amazon S3 ウェブサイトエンドポイントは HTTPS またはアクセスポイントをサポートしていません。HTTPS を使用する場合は、Amazon CloudFront を使用して Amazon S3 でホストされている静的ウェブサイトを提供できます。
      - [CloudFront を使用して、Amazon S3 でホストされた静的ウェブサイトを公開するにはどうすればよいですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/cloudfront-serve-static-website/)
      - OAIは非推奨なので、OACを使う。参考：[Amazon S3 オリジンへのアクセスの制限](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
        - [オリジンアクセスコントロールの詳細設定](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-advanced-settings)
        - [【CloudFormation】CloudFrontのオリジンアクセスコントロール(OAC)でS3(SPA)へのアクセスを制限する](https://ryuzan03.hatenablog.com/)
    - CloudFormation
      - [AWS::S3::Bucket](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)
      - [AWS::CloudFront::OriginAccessControl](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-originaccesscontrol.html)
      - [AWS::S3::BucketPolicy](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html)
      - [AWS::CloudFront::Distribution](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html)
      - [CloudFront ディストリビューションのエイリアスリソースレコードセット](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/quickref-route53.html#w2aac27c21c80c11)
      - [管理キャッシュポリシーの使用](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html)
        - とりあえず`CachingOptimized`にした。要検証

### TODO

1. linter見る
1. OpenAPIで型作成
