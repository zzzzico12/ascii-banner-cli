# ASCII Banner Generator

CLIツールの起動時に表示するASCIIアートバナーを、対話的に生成するツールです。

```
  ╔═══════════════════════════════════════════════╗
  ║       ASCII  BANNER  GENERATOR                ║
  ║       Create CLI banners with ease            ║
  ╚═══════════════════════════════════════════════╝
```

## セットアップ（最初の1回だけ）

### 前提条件

- **Node.js v18以上** がインストールされていること

```bash
node --version   # v18.0.0 以上ならOK
```

Node.jsがない場合は https://nodejs.org からインストールしてください。

### インストール手順

```bash
# 1. このフォルダに移動
cd ascii-banner-cli

# 2. グローバルにリンク（どこからでも使えるようになる）
npm link
```

これだけで完了です。外部パッケージは使っていないので `npm install` は不要です。

## 使い方

### 起動

```bash
ascii-banner
```

または

```bash
cd ascii-banner-cli
npm start
```

### 操作の流れ

ツールを起動すると、4つのステップで対話的にバナーを作成できます：

```
  STEP 1  表示したい文字列を入力
  > MY APP

  STEP 2  6種類のフォントからプレビューを見て選択
  [1] Block    ██ ████ ██
  [2] Shadow   ▄▄ █▄▄▄ ▀░
  [3] Cyber    ◢▀ █▀▀▀ ◤
  [4] Dots     ●● ●●●● ●
  [5] Slim     ▄▄ ██▄  ▀
  [6] Outline  ╔═ ║══╣ ╝

  STEP 3  装飾スタイルを選択（枠線など）
  [1] なし
  [2] Box      ╭──────╮
  [3] Double   ╔══════╗
  [4] Stars    ✦✧✧✧✧✧✦
  [5] Underline ━━━━━━

  STEP 4  出力形式を選択
  [1] プレーンテキスト
  [2] JavaScript
  [3] TypeScript
  [4] Python
  [5] Rust
  [6] Go
  [7] Shell
```

最後にファイル保存 or ターミナル表示を選べます。

## 生成されるコードの例

### JavaScript の場合

```javascript
// ── ASCII Banner ──────────────────────────────
const banner = `
 ██   ██ ██   ██     ██████  ██      ██████
 ███ ███  ██ ██     ██       ██        ██
 ██ █ ██   ███      ██       ██        ██
 ██   ██   ██       ██       ██        ██
 ██   ██   ██        ██████  ███████ ██████
`;

export function printBanner() {
  console.log("\x1b[36m" + banner + "\x1b[0m");
}
```

### あなたのCLIアプリに組み込む

```javascript
#!/usr/bin/env node

// banner.js をインポート
import { printBanner } from './banner.js';

// 起動時にバナー表示
printBanner();
console.log('  v1.0.0\n');

// ここから通常のCLI処理...
```

### Python の場合

```python
from banner import print_banner

print_banner()
print('  v1.0.0\n')

# ここから通常のCLI処理...
```

## 対応文字

`A-Z` `0-9` `スペース` `-` `.` `_`

（小文字は自動的に大文字に変換されます）

## フォント一覧

| フォント | 特徴 |
|---------|------|
| Block   | Claude Code風の重厚な█ブロック |
| Shadow  | 影付きの▄▀立体感 |
| Cyber   | サイバーパンク系の◢◤装飾 |
| Dots    | 丸い●ドット |
| Slim    | コンパクトな細身 |
| Outline | 二重線╔╗の輪郭 |

## ファイル構成

```
ascii-banner-cli/
├── bin/
│   └── cli.js          # CLIのエントリーポイント
├── lib/
│   ├── fonts.js        # フォント定義（ここにフォント追加可能）
│   └── render.js       # レンダリング & エクスポート
├── package.json
└── README.md
```

## カスタマイズ

### フォントを追加する

`lib/fonts.js` の `FONTS` オブジェクトに新しいフォントを追加できます。
各文字は5行の文字列配列で定義します。

### 色を変える

生成されたコードの `\x1b[36m` (シアン) を好きな色に変更できます：

| コード | 色 |
|--------|-----|
| `\x1b[31m` | 赤 |
| `\x1b[32m` | 緑 |
| `\x1b[33m` | 黄色 |
| `\x1b[34m` | 青 |
| `\x1b[35m` | マゼンタ |
| `\x1b[36m` | シアン |
| `\x1b[91m` | 明るい赤 |
| `\x1b[92m` | 明るい緑 |
| `\x1b[96m` | 明るいシアン |

## ライセンス

MIT
