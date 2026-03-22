// ─────────────────────────────────────────────
//  レンダリング & エクスポート
// ─────────────────────────────────────────────

import figlet from "figlet";
import { DECORATIONS } from "./fonts.js";

/**
 * テキストをASCIIアートにレンダリング（figlet使用）
 */
export function renderText(text, fontKey) {
  try {
    const result = figlet.textSync(text, { font: fontKey });
    return result.split("\n");
  } catch {
    return [`[ERROR] Font "${fontKey}" not found`];
  }
}

/**
 * 装飾を適用
 */
export function applyDecoration(lines, decoKey) {
  const deco = DECORATIONS[decoKey];
  if (!deco || decoKey === "none") return lines;
  return deco.render(lines);
}

/**
 * 各言語用にエクスポートコードを生成
 */
export function exportCode(artLines, format) {
  const art = artLines.join("\n");

  switch (format) {
    case "raw":
      return art;

    case "javascript":
      return `// ── ASCII Banner ──────────────────────────────
const banner = \`
${art}
\`;

export function printBanner() {
  console.log("\\x1b[36m" + banner + "\\x1b[0m");
}

// 使い方: アプリのエントリーポイントで
// import { printBanner } from './banner.js';
// printBanner();
`;

    case "typescript":
      return `// ── ASCII Banner ──────────────────────────────
const banner: string = \`
${art}
\`;

export function printBanner(): void {
  console.log("\\x1b[36m" + banner + "\\x1b[0m");
}

// 使い方: アプリのエントリーポイントで
// import { printBanner } from './banner';
// printBanner();
`;

    case "python":
      return `# ── ASCII Banner ──────────────────────────────

BANNER = """
${art}
"""

def print_banner():
    print(f"\\033[36m{BANNER}\\033[0m")

# 使い方: アプリのエントリーポイントで
# from banner import print_banner
# print_banner()
`;

    case "rust":
      return `// ── ASCII Banner ──────────────────────────────

pub fn print_banner() {
    let banner = r#"
${art.replace(/\\/g, "\\\\")}
"#;
    println!("\\x1b[36m{}\\x1b[0m", banner);
}

// 使い方: main.rs の先頭で
// mod banner;
// banner::print_banner();
`;

    case "go":
      return `// ── ASCII Banner ──────────────────────────────
package main

import "fmt"

func PrintBanner() {
\tbanner := \`
${art}
\`
\tfmt.Printf("\\033[36m%s\\033[0m\\n", banner)
}

// 使い方: main() の先頭で
// PrintBanner()
`;

    case "shell":
      return `#!/bin/bash
# ── ASCII Banner ──────────────────────────────

print_banner() {
  cat << 'BANNER'
${art}
BANNER
}

# 使い方: スクリプトの先頭で
# source banner.sh
# print_banner
`;

    default:
      return art;
  }
}
