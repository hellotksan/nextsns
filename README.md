# Next SNS

## 概要

このプロジェクトは、NextJs と NodeJs と MongoDB を使用して作成された SNS クローンアプリケーションです。

[https://nextsns.net](https://nextsns.net)

## 注意事項

### 個人情報の取り扱い

この web サイトはユーザ情報や投稿記事の情報を作者が管理するデータベースに保存します。
そのため、私はデータベースの情報を見ることができます。
絶対に機密な個人情報を入力しないでください。
万が一、個人情報が流出しても責任を取ることはできません。
この事項に同意したうえで使用してください。

## デモ

**TOP**
![demo1](public/assets/images/demo-1-top.png)

**Unlogined Timeline**
![demo2](public/assets/images/demo-2-unlogin-timeline.png)

**Profile**
![demo3](public/assets/images/demo-3-profile.png)

**User Settings**
![demo4](public/assets/images/demo-4-user-setting.png)

## 依存関係

このプロジェクトは以下の主要なライブラリに依存しています：

[package.json](package.json)

## プロジェクトのディレクトリ構造

```sh
/
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
