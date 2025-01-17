# Recline Todo App

モダンなUIとスムーズなアニメーションを備えたTypeScript + Reactベースのタスク管理アプリケーションです。

## 主要機能

- タスクの作成・編集・削除
- アニメーション付きのタスク完了状態の切り替え
- レスポンシブデザイン
- スタイリッシュなUIコンポーネント

## 技術スタック

### コア技術
- React: ^18.2.0
- TypeScript: ^5.2.2
- Vite: ^5.0.8（高速な開発環境）

### UIライブラリ
- Chakra UI: ^2.10.4
- Radix UI: ^1.1.3（アクセシビリティ対応のUIプリミティブ）
- Framer Motion: ^10.18.0（スムーズなアニメーション）

### 開発ツール
- ESLint: ^8.55.0
- TypeScript ESLint
- Vite React Plugin

## プロジェクト構成

```
src/
├── components/
│   ├── TodoForm/           # タスク作成フォーム
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── TodoItem/          # 個別タスクコンポーネント
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── TodoList/          # タスクリスト
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   └── animations.ts
│   └── ui/               # 共通UIコンポーネント
│       ├── button/
│       ├── card.tsx
│       ├── checkbox.tsx
│       └── input.tsx
├── hooks/                # カスタムフック
│   └── useTodos.ts      # Todo状態管理
├── lib/                 # ユーティリティ
│   └── utils.ts
├── types/              # 型定義
│   └── todo.ts
└── App.tsx            # メインアプリケーション
```

## セットアップと開発手順

### 必要要件
- Node.js 18.0.0以上
- npm 7.0.0以上

### インストール

```bash
# リポジトリのクローン
git clone [repository-url]
cd recline-todo

# 依存パッケージのインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動し、`http://localhost:5173` でアプリケーションにアクセスできます。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。

### Lint

```bash
npm run lint
```

## アーキテクチャ

- **コンポーネント設計**: 各コンポーネントはindex.tsxとstyles.tsに分離し、関心の分離を実現
- **状態管理**: カスタムフック（useTodos）によるローカルステート管理
- **アニメーション**: Framer Motionを使用した滑らかなトランジション
- **スタイリング**: Chakra UIとRadix UIの組み合わせによる堅牢なUIシステム

## ライセンス

MIT
