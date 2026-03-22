
```
  ╔═══════════════════════════════════════════════╗
  ║       ASCII  BANNER  GENERATOR                ║
  ║       Create CLI banners with ease            ║
  ╚═══════════════════════════════════════════════╝
```

<div align="center">

# ✦ ASCII Banner Generator

**Turn your CLI app name into stunning ASCII art — in 60 seconds.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)](https://nodejs.org)

[Quick Start](#-quick-start) · [Features](#-features) · [Examples](#-examples) · [Fonts](#-fonts-50-total)

</div>

---

## Why ASCII Banner Generator?

You've built a sick CLI tool. Don't let it start with a blank screen.

```
  ██████╗  ██████╗  ██████╗ ██╗  ██╗███████╗████████╗
  ██╔══██╗██╔═══██╗██╔════╝ ██║ ██╔╝██╔════╝╚══██╔══╝
  ██████╔╝██║   ██║██║      █████╔╝ █████╗     ██║
  ██╔══██╗██║   ██║██║      ██╔═██╗ ██╔══╝     ██║
  ██║  ██║╚██████╔╝╚██████╗ ██║  ██╗███████╗   ██║
  ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝
```

One interactive command. No config files. No design skills needed.
Just pick a style and get production-ready code — for **7 languages**.

---

## ✦ Features

- 🎨 **50 ASCII fonts** — from clean classics to wild 3D effects, all with live preview
- 🖼 **25 decoration styles** — boxes, lines, symbols, shadows and more
- 🌈 **14 ANSI colors** — with color-coded swatches right in the terminal
- 📦 **7 export formats** — JavaScript, TypeScript, Python, Rust, Go, Shell, plain text
- ⚡ **Zero config** — fully interactive, just run and choose
- 🔌 **Drop-in ready** — generated code plugs straight into your app

---

## 🚀 Quick Start

```bash
# Install
git clone https://github.com/zzzzico12/ascii-banner-cli
cd ascii-banner-cli
npm install && npm link

# Run
ascii-banner
```

That's it. The tool walks you through everything.

---

## ✦ Examples

### ANSI Shadow + Double Box + Cyan

```
  ╔══════════════════════════════════════════════════════╗
  ║  ███╗   ███╗██╗   ██╗     █████╗ ██████╗ ██████╗   ║
  ║  ████╗ ████║╚██╗ ██╔╝    ██╔══██╗██╔══██╗██╔══██╗  ║
  ║  ██╔████╔██║ ╚████╔╝     ███████║██████╔╝██████╔╝  ║
  ║  ██║╚██╔╝██║  ╚██╔╝      ██╔══██║██╔═══╝ ██╔═══╝   ║
  ║  ██║ ╚═╝ ██║   ██║       ██║  ██║██║     ██║       ║
  ╚══════════════════════════════════════════════════════╝
```

### Doom + Stars + Green

```
  ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦
   ______  ______  ______  __   __  ______
  /\  ___\/\  == \/\  __ \/\ "-.\ \/\__  _\
  \ \  __\\ \  __<\ \ \/\ \ \ \-.  \/_/\ \/
   \ \_\   \ \_\ \_\ \_____\ \_\\"\_\  \ \_\
    \/_/    \/_/ /_/\/_____/\/_/ \/_/   \/_/
  ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦
```

### Larry 3D + Thick Box + Magenta

```
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃   /'\_/`\  /\  _`\  /\  _`\               ┃
  ┃  /\      \/\ \L\_\ \\ \ \/\_\             ┃
  ┃  \ \ \__\ \ \  _\L  \ \ \/_/_             ┃
  ┃   \ \ \_/\ \ \ \L\ \ \ \ \L\ \            ┃
  ┃    \ \_\\ \_\ \____/  \ \____/            ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## ✦ Generated Code

Pick your language — the tool writes the code for you.

**JavaScript / TypeScript**
```javascript
// ── ASCII Banner ──────────────────────────────
const banner = `
  ╔═══════════════╗
  ║   MY  APP     ║
  ╚═══════════════╝
`;

export function printBanner() {
  console.log("\x1b[36m" + banner + "\x1b[0m");
}
```

**Python**
```python
BANNER = """
  ╔═══════════════╗
  ║   MY  APP     ║
  ╚═══════════════╝
"""

def print_banner():
    print(f"\033[36m{BANNER}\033[0m")
```

**Rust · Go · Shell** — all supported with proper escape sequences.

---

## ✦ Fonts (50 total)

| Category | Fonts |
|----------|-------|
| Classic | Standard, Big, Colossal, Banner3, Roman, Broadway |
| 3D / Depth | Larry 3D, Larry 3D 2, Isometric1–3, 3D Diagonal, Doh |
| Modern / Block | ANSI Shadow, DOS Rebel, Rebel, Electronic, Delta Corps, Blocks |
| Slanted / Motion | Doom, Slant, Speed, Lean, Graffiti |
| Outlined / Wireframe | Star Wars, Epic, Impossible, Ogre, Varsity, Train |
| Decorative | Shadow, Bloody, Alligator, Poison, Ghost, Gothic, Fire Font-k, Flower Power, Dancing Font, Fraktur, Big Money-ne, Merlin1 |
| Script | NScript, NV Script, Hollywood, Georgia11, Jacky, Rammstein, Chunky, Bulbhead |

> Every font renders a **live preview** of your actual text before you pick.

---

## ✦ Decorations (25 total)

| Category | Styles |
|----------|--------|
| Box | `╭─╮` Box, `╔═╗` Double, `┏━┓` Thick, `+-+` Retro, `##` Hash, Shadow Box, `===` Equals, `┌─┐` Sharp |
| Line | `━━━` Underline, `▔▔▔` Overline, `═══` Sandwich, `╠═╣` Bracket Bar, `- -` Dashed |
| Symbol | `✦✧` Stars, `··` Dots, `◆◇` Diamond, `〜` Wave, `♥♡` Hearts, `/\/\` Zigzag |
| Side | `║ ║` Pipes, `>> <<` Arrows, `▓▒░` Cyber, `// \\` Slash, `~~>` Wings |

---

## ✦ Colors (14)

`Default` · `Cyan` · `Green` · `Yellow` · `Red` · `Magenta` · `Blue` · `White`
`Bright Cyan` · `Bright Green` · `Bright Yellow` · `Bright Red` · `Bright Magenta` · `Bright Blue`

Colors are embedded directly into the exported code as ANSI escape sequences.

---

## ✦ How to use the output

```javascript
// your-cli-app.js
import { printBanner } from './banner.js';

printBanner();           // ← your ASCII banner
console.log('  v1.0.0\n');
// ... rest of your app
```

---

## File Structure

```
ascii-banner-cli/
├── bin/
│   └── cli.js       # CLI entry point
├── lib/
│   ├── fonts.js     # Decoration definitions
│   └── render.js    # Rendering & code export
├── package.json
└── README.md
```

---

<div align="center">

**If this saved you time, leave a ⭐**

MIT License

</div>
