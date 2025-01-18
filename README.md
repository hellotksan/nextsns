# Next SNS

## 概要

このプロジェクトは、NextJs と NodeJs と MongoDB を使用して作成された SNS クローンアプリケーションです。

[https://nextsns.net](https://nextsns.net)

## DEMO

**TOP**
![demo1](public/assets/images/demo-1-top.png)

**Unlogined Timeline**
![demo2](public/assets/images/demo-2-unlogin-timeline.png)

**Profile**
![demo3](public/assets/images/demo-3-profile.png)

**User Settings**
![demo4](public/assets/images/demo-4-user-setting.png)

## Using Stacks

![frontend-stacks](public/assets/images/frontend-stacks.PNG)

![backend-stacks](public/assets/images/backend-stacks.PNG)

## Directory Stracture

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
