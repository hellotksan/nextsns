# Next SNS

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 概要

このプロジェクトは、NextJs と NodeJs と MongoDB を使用して作成された SNS クローンアプリケーションです。
このソースコードは OSS として公開しているので、MIT ライセンスを使用していただければ、
どんな風に利用してもよいです。

## デモ

[https://nextsns-one.vercel.app/](https://real-sns-front-end.vercel.app/)

## 特徴

## 依存関係

このプロジェクトは以下の主要なライブラリに依存しています：

- React
- NextJs
- TailwindCSS
- Vitest
- ...

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
├── /app
│ ├── /followers
│ │ └── page.tsx
│ ├── /...
│ ├── layouts.tsx
│ ├── page.tsx
│ └── ...
│
├── /components
│ ├── /elements
│ │ └── /loadingSpinner
│ │   ├── loadingSpinner.tsx
│ │   └── loadingSpinner.module.tsx
│ └── /layouts
│   ├── /clientComponent
│   │ ├── clientComponents.tsx
│   │ └── clientComponents.module.tsx
│   └── /...
│
├── /features
│ ├── /allUsers
│ │ ├── allUsers.jsx
│ │ └── allUsers.test.jsx
│ └── /...
│
├── /hooks
│ ├── usePost.ts
│ └── ...
│
├── /public
│ ├── /assets
│ │ └── /person
│ │   └── admin.png
│ └── ...
│
├── /state
│ ├── AuthActions.js
│ └── ...
│
├── /styles
│ └── globals.css
│
├── /test
│ └── setup.css
│
├── /types
│ └── user.ts
│
├── README.md
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

- /users

  全ユーザを表示するページ

- /followers

  フォロワーを表示するページ
