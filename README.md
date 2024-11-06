# Next SNS

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 概要

このプロジェクトは、NextJs と NodeJs と MongoDB を使用して作成された SNS クローンアプリケーションです。

## 注意事項

### 個人情報の取り扱い

この web サイトはユーザ情報や投稿記事の情報を作者が管理するデータベースに保存します。
そのため、私はデータベースの情報を見ることができます。
絶対に機密な個人情報を入力しないでください。
万が一、個人情報が流出しても責任を取ることはできません。
この事項に同意したうえで使用してください。

楽しんで！

## デモ

[https://nextsns-one.vercel.app](https://nextsns-one.vercel.app)

## 特徴

このソースコードは OSS として公開しているので、MIT ライセンスを使用していただければ、
どんな風に利用してもよいです。

## このプロジェクトに興味がありますか

こちらから確認してください。
プロジェクトへの貢献を歓迎します！

[CONTRIBUTING.md](./CONTRIBUTING.md)

## 依存関係

このプロジェクトは以下の主要なライブラリに依存しています：

### Language

- JavaScript
- TypeScript

### FrameWork

- React
- NextJs
- Redux
- TailwindCSS
- Vitest
- Shadcn/ui
- ...

### ToBe

- NextAuth
- useSWR

## 前提条件

このプロジェクトをローカルで実行するには、以下が必要です：

- Node.js (バージョン 20.0 以上推奨)
- npm または yarn

## セットアップ

以下の手順に従ってプロジェクトをセットアップします：

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/hellotksan/nextsns
   cd nextsns
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   ```

   または

   ```bash
   yarn install
   ```

3. 開発サーバーを起動します。

   ```bash
   npm run dev
   ```

   または

   ```bash
   yarn start
   ```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開き、アプリを確認します。

## 使用方法

## プロジェクトのディレクトリ構造

```sh
├── /app                     # アプリの主要なページやレイアウト、ルート構成を含むディレクトリ
│   ├── /followers           # フォロワーページ
│   │   └── page.tsx         # フォロワーページのメインコンポーネント
│   ├── /...                 # 他のページやコンポーネント
│   ├── layouts.tsx          # 全体のレイアウトコンポーネント
│   ├── page.tsx             # トップページのコンポーネント
│   └── ...
│
├── /components              # 再利用可能なUIコンポーネントをまとめる
│   ├── /elements            # 小規模なコンポーネント
│   │   └── /loadingSpinner  # 読み込みスピナー
│   │       ├── loadingSpinner.tsx   # スピナーの定義
│   │       └── ...
│   ├── /layouts             # レイアウト関連のコンポーネント
│   │   ├── /allUsers        # 全ユーザーを表示するコンポーネントのレイアウト
│   │   │   ├── allUsers.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── /ui                  # ShadCnのコンポーネント
│   └── theme-provider.tsx   # 画面全体のテーマの設定
│
├── /constants               # 頻繁に使う定数を定義する
│   ├── api.ts               # APIのエンドポイントURLを格納
│   └── ...
│
├── /features                # 機能ごとにまとめた機能ベースのディレクトリ
│   └── /auth                # 認証機能
│       └── authSlice.tsx    # 認証の状態管理
│
├── /hooks                   # React Hooksのカスタムフックを定義
│   ├── useAuth.ts           # 認証関連のフック
│   ├── useDispatch.ts       # Dispatch関数用のフック
│   ├── useSelector.ts       # Reduxのセレクター用フック
│   └── ...
│
├── /lib                     #
│   └── utils.ts             #
│
├── /public                  # 公開リソースや画像を格納
│   ├── /assets              # アセットをまとめる
│   │   └── /person          # 人物関連の画像
│   │       └── admin.png    # 管理者画像
│   └── ...
│
├── /state                   # グローバルステート管理用
│   └── store.ts             # Reduxストアの定義
│
├── /styles                  # CSSやスタイル定義をまとめる
│   └── globals.css          # グローバルなスタイル定義
│
├── /test                    # テスト関連の設定
│   └── setup.ts             # テスト環境の設定ファイル
│
├── /types                   # TypeScriptで使う型定義をまとめる
│   ├── user.ts              # ユーザー型の定義
│   └── ...
│
├── README.md                # プロジェクトの概要や説明を記載
└── ...
```

## コンポーネント間の依存関係

## ページ設計

- /

  ホームページ

- /register

  ユーザ登録ページ

- /login

  ユーザログインページ

- /profile?username=

  ユーザプロフィールページ

- /setting

  ユーザ設定ページ

- /post-edit

  投稿記事編集ページ

- /all-users

  全ユーザを表示するページ

- /followers

  フォロワーを表示するページ
