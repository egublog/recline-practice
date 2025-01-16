# React Web Practice Project

ViteとReactを使用したTypeScriptベースのWebアプリケーションプロジェクトです。

## 開発環境

- Node.js: v22.3.0
- TypeScript: 4.7.4

## プロジェクト構成

```
src/
  ├── components/
  │   ├── TodoItem.tsx
  │   └── ui/
  │       ├── button/
  │       ├── card.tsx
  │       ├── checkbox.tsx
  │       └── input.tsx
  ├── hooks/
  │   └── useTodos.ts
  ├── types/
  │   └── todo.ts
  └── App.tsx
```

## 使用技術

- Vite (ビルドツール)
- React
- TypeScript
- TailwindCSS (スタイリング)
- Radix UI (UIコンポーネント)

## 開発手順

1. 依存パッケージのインストール
```bash
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
