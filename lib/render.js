// ─────────────────────────────────────────────
//  レンダリング & エクスポート
// ─────────────────────────────────────────────

import figlet from "figlet";
import { DECORATIONS } from "./fonts.js";

/**
 * テキストをASCIIアートにレンダリング
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
 * ANSIカラーコードを各言語の文字列リテラル表現に変換
 *   hex: \x1b[36m  (JS/TS/Rust用)
 *   oct: \033[36m  (Python/Go/Shell用)
 */
function colorEsc(code, style) {
  if (!code) return "";
  const num = code.match(/\x1b\[(\d+)m/)?.[1] ?? "36";
  return style === "oct" ? `\\033[${num}m` : `\\x1b[${num}m`;
}

/**
 * 各言語用にエクスポートコードを生成
 */
export function exportCode(artLines, format, colorCode = "\x1b[36m") {
  const art = artLines.join("\n");
  const hasColor = Boolean(colorCode);

  // 各言語向けのエスケープ表現
  const hexOpen  = hasColor ? colorEsc(colorCode, "hex") : "";
  const hexClose = hasColor ? "\\x1b[0m" : "";
  const octOpen  = hasColor ? colorEsc(colorCode, "oct") : "";
  const octClose = hasColor ? "\\033[0m" : "";

  switch (format) {
    case "raw":
      return art;

    case "javascript":
      return `// ── ASCII Banner ──────────────────────────────
const banner = \`
${art}
\`;

export function printBanner() {
  console.log(${hasColor ? `"${hexOpen}" + banner + "${hexClose}"` : "banner"});
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
  console.log(${hasColor ? `"${hexOpen}" + banner + "${hexClose}"` : "banner"});
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
    print(${hasColor ? `f"${octOpen}{BANNER}${octClose}"` : "BANNER"})

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
    ${hasColor ? `println!("${hexOpen}{}${hexClose}", banner);` : "println!(\"{}\", banner);"}
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
\t${hasColor ? `fmt.Printf("${octOpen}%s${octClose}\\n", banner)` : `fmt.Print(banner)`}
}

// 使い方: main() の先頭で
// PrintBanner()
`;

    case "shell":
      return `#!/bin/bash
# ── ASCII Banner ──────────────────────────────

print_banner() {
${hasColor ? `  printf "${octOpen}"` : ""}
  cat << 'BANNER'
${art}
BANNER
${hasColor ? `  printf "${octClose}"` : ""}
}

# 使い方: スクリプトの先頭で
# source banner.sh
# print_banner
`;

    default:
      return art;
  }
}
