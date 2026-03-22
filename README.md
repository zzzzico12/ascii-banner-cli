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

# 2. Install dependencies / 依存パッケージをインストール
npm install

# 3. Link globally (use from anywhere) / グローバルにリンク（どこからでも使えるようになる）
npm link
```

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

The tool guides you through 6 interactive steps to create your banner:

ツールを起動すると、6つのステップで対話的にバナーを作成できます：

```
  STEP 1  Enter the text to display / 表示したい文字列を入力
          Supports: A-Z, 0-9 / ひらがな・カタカナ・漢字
  > MY APP   または   > アプリ名

  STEP 2  Choose a font style / フォントを選択
          [English] 50 figlet fonts with live preview / 50種類のfigletフォント
          [日本語]  10 tile styles / 日本語入力時はタイルスタイルに自動切替

          ─── English example ──────────────────────
          [ 1] Standard          — classic ASCII
          [ 2] Big               — thick blocks
          ...and 48 more

          ─── 日本語 example ───────────────────────
          [ 1] Box         ╔══╗  → ║あ║
          [ 2] Round       ╭──╮  → │い│
          [ 3] Block       ████  → █う█
          ...and 7 more

  STEP 3  Choose a decoration style / 25種類の装飾スタイルを選択
          [ 1] None
          [ 2] Box           ╭─────╮
          [ 3] Double        ╔═════╗
          [ 4] Thick         ┏━━━━━┓
          ...and 21 more

  STEP 4  Choose a color / 色を選択（14色）
          [ 1] ────  Default (no color)
          [ 2] ████  Cyan
          [ 3] ████  Green
          ...and 11 more

  STEP 5  Choose output format / 出力形式を選択
          [1] Plain text / プレーンテキスト
          [2] JavaScript   [3] TypeScript
          [4] Python       [5] Rust
          [6] Go           [7] Shell
```

Finally, choose to save to a file or display in the terminal.

最後にファイル保存 or ターミナル表示を選べます。

### Japanese mode example / 日本語モードの例

```
╔══╗  ╔══╗  ╔══╗  ╔══╗
║ア║  ║プ║  ║リ║  ║名║
║　║  ║　║  ║　║  ║　║
╚══╝  ╚══╝  ╚══╝  ╚══╝
```

---

## Generated Code Examples / 生成されるコードの例

### JavaScript (with color / 色付き)

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

**English mode:** `A-Z` `0-9` `space` `-` `.` `_`

Lowercase letters are automatically converted to uppercase.
小文字は自動的に大文字に変換されます。

**Japanese mode (auto-detected):** `ひらがな` `カタカナ` `漢字` and mixed with `A-Z` `0-9`

Japanese input is automatically detected and switches to tile rendering mode.
日本語が含まれると自動的に日本語タイルモードに切り替わります。

---

## Japanese Tile Styles (10 total) / 日本語タイルスタイル（10種類）

| Style / スタイル | Preview |
|----------------|---------|
| Box | `╔══╗ ║あ║ ╚══╝` |
| Round | `╭──╮ │あ│ ╰──╯` |
| Block | `████ █あ█ ████` |
| Thick | `┏━━┓ ┃あ┃ ┗━━┛` |
| Shadow | `╔══╗▌ ║あ║▌` |
| Dots | `●──● │あ│ ●──●` |
| Tall | `╔════╗ ║ あ ║ ╚════╝` |
| Tall Round | `╭────╮ │ あ │ ╰────╯` |
| Tall Thick | `┏━━━━┓ ┃ あ ┃ ┗━━━━┛` |
| Minimal | `あ ──` |

---

## Fonts (50 total) / フォント一覧（50種類・英字用）

| Category / カテゴリ | Fonts / フォント |
|--------------------|----------------|
| Classic | Standard, Big, Colossal, Banner3, Roman, Broadway |
| 3D / Depth | Larry 3D, Larry 3D 2, Isometric1–3, 3D Diagonal, Doh |
| Modern / Block | ANSI Shadow, DOS Rebel, Rebel, Electronic, Delta Corps, Blocks |
| Slanted / Motion | Doom, Slant, Speed, Lean, Graffiti |
| Outlined / Wireframe | Star Wars, Epic, Impossible, Ogre, Varsity, Train |
| Decorative / Artistic | Shadow, Bloody, Alligator, Poison, Ghost, Gothic, Fire Font-k, Flower Power, Dancing Font, Fraktur, Big Money-ne, Merlin1 |
| Script / Handwritten | NScript, NV Script, Hollywood, Georgia11, Jacky, Rammstein, Chunky, Bulbhead |

---

## Decorations (25 total) / 装飾一覧（25種類）

| Category / カテゴリ | Styles / スタイル |
|--------------------|-----------------|
| Box | Box `╭─╮`, Double `╔═╗`, Thick `┏━┓`, Retro `+-+`, Hash `##`, Shadow Box, Equals `===`, Sharp `┌─┐` |
| Line | Underline `━━━`, Overline `▔▔▔`, Sandwich `═══`, Bracket Bar `╠═╣`, Dashed `- -` |
| Symbol | Stars `✦✧`, Dots `··`, Diamond `◆◇`, Wave `〜`, Hearts `♥♡`, Zigzag `/\/\` |
| Side | Pipes `║ ║`, Arrows `>> <<`, Cyber Sides `▓▒░`, Slash Sides `// \\`, Wings `~~>` |

---

## Colors (14 options) / カラー（14色）

| Color / 色 | ANSI Code |
|-----------|-----------|
| Default (no color) | — |
| Cyan / シアン | `\x1b[36m` |
| Green / 緑 | `\x1b[32m` |
| Yellow / 黄色 | `\x1b[33m` |
| Red / 赤 | `\x1b[31m` |
| Magenta / マゼンタ | `\x1b[35m` |
| Blue / 青 | `\x1b[34m` |
| White / 白 | `\x1b[97m` |
| Bright Cyan / 明るいシアン | `\x1b[96m` |
| Bright Green / 明るい緑 | `\x1b[92m` |
| Bright Yellow / 明るい黄色 | `\x1b[93m` |
| Bright Red / 明るい赤 | `\x1b[91m` |
| Bright Magenta / 明るいマゼンタ | `\x1b[95m` |
| Bright Blue / 明るい青 | `\x1b[94m` |

---

## File Structure / ファイル構成

```
ascii-banner-cli/
├── bin/
│   └── cli.js          # CLI entry point / CLIのエントリーポイント
├── lib/
│   ├── fonts.js        # Decoration styles / 装飾スタイル定義
│   └── render.js       # Rendering & export / レンダリング & エクスポート
├── package.json
└── README.md
```

---

## License / ライセンス

MIT
