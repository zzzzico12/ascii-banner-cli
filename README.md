# ASCII Banner Generator

An interactive CLI tool to generate ASCII art banners for your CLI application startup screens.

インタラクティブにASCIIアートバナーを生成するCLIツールです。CLIツールの起動時に表示するバナーを簡単に作成できます。

```
  ╔═══════════════════════════════════════════════╗
  ║       ASCII  BANNER  GENERATOR                ║
  ║       Create CLI banners with ease            ║
  ╚═══════════════════════════════════════════════╝
```

---

## Setup (first time only) / セットアップ（最初の1回だけ）

### Prerequisites / 前提条件

- **Node.js v18+** must be installed / **Node.js v18以上** がインストールされていること

```bash
node --version   # v18.0.0 or higher / v18.0.0 以上ならOK
```

If Node.js is not installed, get it from https://nodejs.org

Node.jsがない場合は https://nodejs.org からインストールしてください。

### Installation / インストール手順

```bash
# 1. Move to this folder / このフォルダに移動
cd ascii-banner-cli

# 2. Link globally (use from anywhere) / グローバルにリンク（どこからでも使えるようになる）
npm link
```

That's it. No external packages are used, so `npm install` is not required.

これだけで完了です。外部パッケージは使っていないので `npm install` は不要です。

---

## Usage / 使い方

### Start / 起動

```bash
ascii-banner
```

or / または

```bash
cd ascii-banner-cli
npm start
```

### Steps / 操作の流れ

The tool guides you through 4 interactive steps to create your banner:

ツールを起動すると、4つのステップで対話的にバナーを作成できます：

```
  STEP 1  Enter the text to display / 表示したい文字列を入力
  > MY APP

  STEP 2  Choose from 6 fonts with preview / 6種類のフォントからプレビューを見て選択
  [1] Block    ██ ████ ██
  [2] Shadow   ▄▄ █▄▄▄ ▀░
  [3] Cyber    ◢▀ █▀▀▀ ◤
  [4] Dots     ●● ●●●● ●
  [5] Slim     ▄▄ ██▄  ▀
  [6] Outline  ╔═ ║══╣ ╝

  STEP 3  Choose a decoration style / 装飾スタイルを選択（枠線など）
  [1] None / なし
  [2] Box      ╭──────╮
  [3] Double   ╔══════╗
  [4] Stars    ✦✧✧✧✧✧✦
  [5] Underline ━━━━━━

  STEP 4  Choose output format / 出力形式を選択
  [1] Plain text / プレーンテキスト
  [2] JavaScript
  [3] TypeScript
  [4] Python
  [5] Rust
  [6] Go
  [7] Shell
```

Finally, choose to save to a file or display in the terminal.

最後にファイル保存 or ターミナル表示を選べます。

---

## Generated Code Examples / 生成されるコードの例

### JavaScript

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

### Integrating into your CLI app / あなたのCLIアプリに組み込む

```javascript
#!/usr/bin/env node

// Import banner.js / banner.js をインポート
import { printBanner } from './banner.js';

// Display banner on startup / 起動時にバナー表示
printBanner();
console.log('  v1.0.0\n');

// Continue with your CLI logic... / ここから通常のCLI処理...
```

### Python

```python
from banner import print_banner

print_banner()
print('  v1.0.0\n')

# Continue with your CLI logic... / ここから通常のCLI処理...
```

---

## Supported Characters / 対応文字

`A-Z` `0-9` `space` `-` `.` `_`

Lowercase letters are automatically converted to uppercase.

小文字は自動的に大文字に変換されます。

---

## Fonts / フォント一覧

| Font / フォント | Description / 特徴 |
|----------------|-------------------|
| Block   | Heavy █ block style, Claude Code-inspired / Claude Code風の重厚な█ブロック |
| Shadow  | 3D effect with ▄▀ shadows / 影付きの▄▀立体感 |
| Cyber   | Cyberpunk style with ◢◤ decorations / サイバーパンク系の◢◤装飾 |
| Dots    | Rounded ● dots / 丸い●ドット |
| Slim    | Compact and thin / コンパクトな細身 |
| Outline | Double-line ╔╗ outline / 二重線╔╗の輪郭 |

---

## File Structure / ファイル構成

```
ascii-banner-cli/
├── bin/
│   └── cli.js          # CLI entry point / CLIのエントリーポイント
├── lib/
│   ├── fonts.js        # Font definitions (add fonts here) / フォント定義（ここにフォント追加可能）
│   └── render.js       # Rendering & export / レンダリング & エクスポート
├── package.json
└── README.md
```

---

## Customization / カスタマイズ

### Adding fonts / フォントを追加する

Add a new font to the `FONTS` object in [lib/fonts.js](lib/fonts.js). Each character is defined as a 5-row string array.

`lib/fonts.js` の `FONTS` オブジェクトに新しいフォントを追加できます。各文字は5行の文字列配列で定義します。

### Changing colors / 色を変える

Replace `\x1b[36m` (cyan) in the generated code with your preferred color:

生成されたコードの `\x1b[36m` (シアン) を好きな色に変更できます：

| Code / コード | Color / 色 |
|--------------|-----------|
| `\x1b[31m` | Red / 赤 |
| `\x1b[32m` | Green / 緑 |
| `\x1b[33m` | Yellow / 黄色 |
| `\x1b[34m` | Blue / 青 |
| `\x1b[35m` | Magenta / マゼンタ |
| `\x1b[36m` | Cyan / シアン |
| `\x1b[91m` | Bright Red / 明るい赤 |
| `\x1b[92m` | Bright Green / 明るい緑 |
| `\x1b[96m` | Bright Cyan / 明るいシアン |

---

## License / ライセンス

MIT
