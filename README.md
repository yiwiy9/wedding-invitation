# wedding-invitation

Web App of our wedding invitation

## TODO

1. Github Actions で単体テスト、全体の ESLint 実行、デプロイ

## 環境構築

### Backend (Tag: v0.1.0)

#### Serverless Framework with TypeScript

1. [serverless/serverless-plugin-typescript](https://github.com/serverless/serverless-plugin-typescript), [dherault/serverless-offline](https://github.com/dherault/serverless-offline) をインストール
   - `yarn add -D typescript serverless-plugin-typescript serverless-offline`
1. [Lambda 用の型情報](https://www.npmjs.com/package/@types/aws-lambda), [AWS SDK](https://www.npmjs.com/package/aws-sdk)などのインストール
   - `yarn add -D @types/aws-lambda @types/node aws-sdk@2.1083.0`
   - [Lambda TypeScript SDK version](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-typescript.html)
1. ソースマップを有効にして、コンパイル後の JS ではなくコンパイル前の TS のファイル情報がスタックトレースに表示されるようにする
   - `serverless.yml`にて、Lambda の環境変数に下記を追加
     - `NODE_OPTIONS: --enable-source-maps`
   - [TypeScript+Node.js で sourcemap 対応を加えてエラーログ調査を行いやすくしたい](https://dev.classmethod.jp/articles/node-typescript-source-map-support/)
1. `tsconfig.json`の作成 (Tag: v0.1.3)
   - [serverless-plugin-typescript の tsconfig.json](https://github.com/serverless/serverless-plugin-typescript#tsconfigjson)を元に作成
   - `eslint-config-airbnb-typescript`で指定する必要がある
   - 参考
     - [tsconfig.json を設定する - サバイバル TypeScript](https://typescriptbook.jp/reference/tsconfig/tsconfig.json-settings)
     - [tsconfig.json のよく使いそうなオプションを理解する](https://zenn.dev/chida/articles/bdbcd59c90e2e1)

```json
{
  "compilerOptions": {
    "target": "es2021", // nodejs16.xに対応させる
    "lib": ["es2021"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "commonjs", // ここ、ちゃんと指定しないと、Lambdaで`es2021`が動かない
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": ".build",
    "rootDir": "./",
    "preserveConstEnums": true
  },
  "include": [
    // コンパイル対象を限定
    "backend"
  ]
}
```

#### 確認コマンド

`devDependencies`はデプロイされないことに注意。SDK は元々ランタイムにサポートされている。
追加で必要なパッケージのみ、`dependencies`に追加する。

- デプロイ：`sls deploy --verbose`
- ローカル：`sls offline`

### Backend Custom Domain (Tag: v0.1.2)

- [amplify-education/serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager)のインストール
  - `yarn add -D serverless-domain-manager`
- `api.wedding.example.com`ってできなかったので、`api-wedding.example.com`
  - > ワイルドカード証明書をリクエストする場合、アスタリスク (\*) はドメイン名の左側に付ける必要があり、1 つのサブドメインレベルのみを保護できます
    - [ACM 証明書の特徴](https://docs.aws.amazon.com/ja_jp/acm/latest/userguide/acm-certificate.html)

### Frontend (Tag: v0.1.1)

#### React with TypeScript

1. [Create React App - Adding TypeScript](https://create-react-app.dev/docs/adding-typescript)の実行
   - `yarn create react-app frontend --template typescript`
1. React App をビルドする（`frontend/build`が作成されるので、これを S3 にホスティングする。）
   - `cd frontend/`
   - `yarn build`
1. [k1LoW/serverless-s3-sync](https://github.com/k1LoW/serverless-s3-sync)のインストール
   - `yarn add -D serverless-s3-sync`
1. `resources/`配下を用意する
   - Amazon S3 ウェブサイトエンドポイントは HTTPS またはアクセスポイントをサポートしていません。HTTPS を使用する場合は、Amazon CloudFront を使用して Amazon S3 でホストされている静的ウェブサイトを提供できます。
     - [CloudFront を使用して、Amazon S3 でホストされた静的ウェブサイトを公開するにはどうすればよいですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/cloudfront-serve-static-website/)
     - OAI は非推奨なので、OAC を使う。参考：[Amazon S3 オリジンへのアクセスの制限](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
       - [オリジンアクセスコントロールの詳細設定](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#oac-advanced-settings)
       - [【CloudFormation】CloudFront のオリジンアクセスコントロール(OAC)で S3(SPA)へのアクセスを制限する](https://ryuzan03.hatenablog.com/)
   - CloudFormation
     - [AWS::S3::Bucket](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)
     - [AWS::CloudFront::OriginAccessControl](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-originaccesscontrol.html)
     - [AWS::S3::BucketPolicy](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html)
     - [AWS::CloudFront::Distribution](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html)
     - [CloudFront ディストリビューションのエイリアスリソースレコードセット](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/quickref-route53.html#w2aac27c21c80c11)
     - [管理キャッシュポリシーの使用](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html)
       - とりあえず`CachingOptimized`にした。要検証

### ESLint の導入

#### Backend (Tag: v0.1.4)

##### `npm init @eslint/config`を実行。（[Getting Started with ESLint](https://eslint.org/docs/latest/user-guide/getting-started)）

```bash
$ npm init @eslint/config
Need to install the following packages:
  @eslint/create-config@0.4.1
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
Local ESLint installation not found.
The config that you\'ve selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · yarn
```

##### [TypeScript 向けの shareable config を導入する](https://typescriptbook.jp/tutorials/eslint#typescript%E5%90%91%E3%81%91%E3%81%AEshareable-config%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B)

- `yarn add -D eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import`
- [iamturns/eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript)
- base を設定する（React バージョンじゃない）

##### prettier のインストール

- `yarn add -D prettier eslint-config-prettier`

##### ファイルの編集

`.eslintrc.json`

```json
{
  "root": true, // プロジェクトのルートであることを明示
  "env": {
    "node": true, // browserではなく、nodeのグローバル変数を読めるようにする
    "es2021": true
  },
  "extends": [
    // デフォルトのものから置き換える
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier" // ESLint と Prettier が干渉しないように設定
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json", // airbnb-typescriptのため指定
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "import/prefer-default-export": "off", // default-exportだと、Lambdaのハンドラーが見つからない
    "no-console": "off" // Lambdaのログ記録用に許可
  }
}
```

`.eslintignore`の作成

```bash
node_modules
.build
frontend
```

`.prettierrc`の作成

```json
{
  "trailingComma": "all",
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}
```

`.devcontainer/devcontainer.json`

- 保存時にフォーマットする設定
- コンテナ再起動後に適用される

```json
{
  // 省略
  "customizations": {
    "vscode": {
      "extensions": [
        // 省略
        "esbenp.prettier-vscode", // 追加
        "dbaeumer.vscode-eslint" // 追加
      ],
      "settings": {
        // 追加
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        }
      }
    }
  }
}
```

#### Frontend (Tag: v0.1.5)

```bash
# Frontendディレクトリに移動
$ cd frontend/

# ESLintの初期設定
$ npm init @eslint/config
Need to install the following packages:
  @eslint/create-config@0.4.1
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
Local ESLint installation not found.
The config that you\'ve selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · yarn

# shareable config(Airbnb) を導入する
yarn add -D eslint-config-airbnb eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y

# prettier のインストール
yarn add -D prettier eslint-config-prettier
```

- ファイルの編集
  - バックエンドと同様に、`.eslintrc.json`, `.eslintignore`, `.prettierrc`を作成
- ESLint の設定がコンフリクトするエラーが出る（`yarn build`, `yarn start`実行時）
  - `.eslintrc.json`に`"root": true`を追加して、親を見に行かないようにする必要がある
  - `package.json`の`eslintConfig`の箇所を全て削除して、`node_modules`, `yarn.lock`を消して、`yarn install`し直す必要がある

`.devcontainer/devcontainer.json`

- Backend, Frontend で別々の`.eslintrc.json`を読み込むように設定

```json
{
  // 省略
  "customizations": {
    "vscode": {
      // 省略
      "settings": {
        // 省略
        "eslint.workingDirectories": ["./", "./frontend"] // 追加
      }
    }
  }
}
```

#### 実行コマンド

- ESLint: `yarn run eslint .`
  - フロントもバックもこのコマンドを一度は実行した方が良い
    - 足らない依存関係が案外出てくる（`eslint-plugin-import`, `eslint-plugin-jsx-a11y`）

### pre-commit (Tag: v0.1.6)

参考: [husky と lint-staged でコミット時にコードを整える（v7 対応）](https://soudai-s.com/how-to-set-up-husky-v7-with-lint-staged)

#### Backend

1. [typicode/husky](https://github.com/typicode/husky), [okonet/lint-staged](https://github.com/okonet/lint-staged)
   - `yarn add -D husky lint-staged`
1. `yarn install` による依存解決後に自動で`husky install`を実行するようにする（Git hooks の設定）
   - `npm pkg set scripts.prepare="husky install"`
   - `yarn prepare`
1. `.husky/pre-commit`の作成とコミット時の実行コマンドを追加
   - `yarn husky add .husky/pre-commit "yarn lint-staged"`
1. `.lintstagedrc.json`の作成

```json
{
  "*.{js,ts}": "eslint --fix",
  "*.{js,ts,md,json}": "prettier --write"
}
```

#### Frontend

下記ファイルを追加すれば、インストール不要。
親ディレクトリの`yarn lint-staged`が下記ファイルを検知して、チェックが走る。

`frontend/.lintstagedrc.json`

```json
{
  "*.{js,jsx,ts,tsx}": "eslint --fix",
  "*.{js,jsx,ts,tsx,json,md,html,css}": "prettier --write"
}
```

### Tailwind CSS の導入 (Tag: v0.1.7)

- [Install Tailwind CSS with Create React App](https://tailwindcss.com/docs/guides/create-react-app)
  - `yarn add -D tailwindcss postcss autoprefixer`
  - `yarn tailwindcss init -p`
  - `tailwind.config.js`, `src/index.css`の修正
- [IntelliSense for VS Code](https://tailwindcss.com/docs/editor-setup#intelli-sense-for-vs-code)
  - [tailwindlabs/tailwindcss-intellisense](https://github.com/tailwindlabs/tailwindcss-intellisense)
    - `.devcontainer/devcontainer.json`に`bradlc.vscode-tailwindcss`を追加
  - [tailwindlabs/prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
    - `yarn add -D prettier-plugin-tailwindcss`
- `yarn run eslint .`でエラーが出る
  - `.eslintignore`に`tailwind.config.js`, `postcss.config.js`を追加する

### OpenAPI の導入

#### OpenAPI Specification の作成

- [拡張機能](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi)のインストール
  - `.devcontainer/devcontainer.json`に`"42Crunch.vscode-openapi"`を追加
- `openapi.yml`を書く
  - [スキーマファースト開発のための OpenAPI（Swagger）設計規約](https://future-architect.github.io/articles/20200409/)
  - [OpenAPI (Swagger) 超入門](https://qiita.com/teinen_qiita/items/e440ca7b1b52ec918f1b)

#### OpenAPI Generator の使用

- [OpenAPITools/openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli)をインストールしたが、バックエンドの typeScript 型生成ができない、かつ Java ランタイムが必要なので、使わないことにした
- 代わりに[drwpow/openapi-typescript](https://github.com/drwpow/openapi-typescript)を使用する
  - `yarn add -D openapi-typescript`
- 以下を追加

`package.json`

```json
{
  // 省略
  "scripts": {
    // 省略
    "generate-api-schema": "yarn openapi-typescript ./openapi.yml --output ./generated/schema.ts --export-type true --immutable-types true --path-params-as-types true"
  }
}
```

`.eslintignore`

```sh
generated
```

`.lintstagedrc.json`

OpenAPI 仕様書を変更したら、確実に型定義の生成を実行するようにする

```json
{
  "openapi.yml": ["yarn generate-api-schema", "git add ./generated"]
  // 省略
}
```
