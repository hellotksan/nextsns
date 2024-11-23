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

[https://nextsns.net](https://nextsns.net)

## 特徴

このソースコードは OSS として公開しているので、MIT ライセンスを使用していただければ、
どんな風に利用してもよいです。

[LICENSE](LICENSE)

## このプロジェクトに興味がありますか

こちらから確認してください。
プロジェクトへの貢献を歓迎します！

[CONTRIBUTING.md](CONTRIBUTING.md)

## 依存関係

このプロジェクトは以下の主要なライブラリに依存しています：

[package.json](package.json)

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

3. .env ファイルの配置

   .env

   ```env
   NEXT_PUBLIC_API_URL="https://real-sns-back-end.vercel.app"
   ```

4. 開発サーバーを起動します。

   ```bash
   npm run dev
   ```

5. ブラウザで [http://localhost:3000](http://localhost:3000) を開き、アプリを確認します。

## プロジェクトのディレクトリ構造

```sh
/
├── .github/        # GitHub設定
├── .husky/         # コミットフック
├── public/         # 静的ファイル
├── src/
│   ├── app/        # Next.jsのApp Router
│   ├── components/
│   ├── constants/  # 定数（APIエンドポイントなど）
│   ├── features/   # 機能単位のモジュール（例: 認証）
│   ├── hooks/      # カスタムフック
│   ├── lib/        # ユーティリティ関数
│   ├── state/      # グローバル状態管理
│   ├── styles/     # CSSやスタイル関連
│   ├── test/       # テストコード（src内に移動も可）
│   └── types/      # TypeScriptの型定義
└── next.config.js  # Next.jsの設定
```

## ページ設計

- /

  サイトの紹介ページ

- /home

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
