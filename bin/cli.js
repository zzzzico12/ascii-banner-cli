#!/usr/bin/env node

// ─────────────────────────────────────────────
//  ASCII Banner Generator CLI
//  対話的にASCIIアートバナーを生成し、
//  好きな言語のコードとしてエクスポートする
// ─────────────────────────────────────────────

import * as readline from "node:readline";
import * as fs from "node:fs";
import * as path from "node:path";
import figlet from "figlet";
import { DECORATIONS } from "../lib/fonts.js";
import { renderText, applyDecoration, exportCode } from "../lib/render.js";
import { JP_FONTS, hasJapanese } from "../lib/japanese.js";

// figletのフォント一覧（代表的なものをキュレーション）
const FIGLET_FONTS = [
  // ── Classic ──────────────────────────────────────────
  { key: "Standard",             name: "Standard          — classic ASCII" },
  { key: "Big",                  name: "Big               — thick blocks" },
  { key: "Colossal",             name: "Colossal          — large 8-block" },
  { key: "Banner3",              name: "Banner3           — bold banner" },
  { key: "Roman",                name: "Roman             — dot serif" },
  { key: "Broadway",             name: "Broadway          — bold retro" },
  // ── 3D / Depth ───────────────────────────────────────
  { key: "Larry 3D",             name: "Larry 3D          — 3D diagonal" },
  { key: "Larry 3D 2",           name: "Larry 3D 2        — 3D variant" },
  { key: "Isometric1",           name: "Isometric1        — isometric 3D" },
  { key: "Isometric2",           name: "Isometric2        — isometric alt" },
  { key: "Isometric3",           name: "Isometric3        — isometric alt 2" },
  { key: "3D Diagonal",          name: "3D Diagonal       — deep diagonal 3D" },
  { key: "Doh",                  name: "Doh               — huge hollow" },
  // ── Modern / Block ───────────────────────────────────
  { key: "ANSI Shadow",          name: "ANSI Shadow       — box-drawing blocks" },
  { key: "DOS Rebel",            name: "DOS Rebel         — filled half-blocks" },
  { key: "Rebel",                name: "Rebel             — half-block fill" },
  { key: "Electronic",           name: "Electronic        — circuit style" },
  { key: "Delta Corps Priest 1", name: "Delta Corps       — dense filled blocks" },
  { key: "Blocks",               name: "Blocks            — bordered block letters" },
  // ── Slanted / Motion ─────────────────────────────────
  { key: "Doom",                 name: "Doom              — diagonal serif" },
  { key: "Slant",                name: "Slant             — oblique lines" },
  { key: "Speed",                name: "Speed             — fast slant" },
  { key: "Lean",                 name: "Lean              — slash aesthetic" },
  { key: "Graffiti",             name: "Graffiti          — street style" },
  // ── Outlined / Wireframe ─────────────────────────────
  { key: "Star Wars",            name: "Star Wars         — clean outline" },
  { key: "Epic",                 name: "Epic              — arrow decorations" },
  { key: "Impossible",           name: "Impossible        — geometric wireframe" },
  { key: "Ogre",                 name: "Ogre              — compact outlined" },
  { key: "Varsity",              name: "Varsity           — collegiate outline" },
  { key: "Train",                name: "Train             — elegant small outline" },
  // ── Decorative / Artistic ────────────────────────────
  { key: "Shadow",               name: "Shadow            — light shadow" },
  { key: "Bloody",               name: "Bloody            — textured blocks" },
  { key: "Alligator",            name: "Alligator         — symbol art (:+#)" },
  { key: "Poison",               name: "Poison            — @!: symbol art" },
  { key: "Ghost",                name: "Ghost             — curved symbol art" },
  { key: "Gothic",               name: "Gothic            — sharp medieval" },
  { key: "Fire Font-k",          name: "Fire Font-k       — flame style" },
  { key: "Flower Power",         name: "Flower Power      — highly decorative" },
  { key: "Dancing Font",         name: "Dancing Font      — hand-drawn feel" },
  { key: "Fraktur",              name: "Fraktur           — gothic calligraphy" },
  { key: "Big Money-ne",         name: "Big Money-ne      — $ symbol art" },
  { key: "Merlin1",              name: "Merlin1           — ornate medieval" },
  // ── Script / Handwritten ─────────────────────────────
  { key: "NScript",              name: "NScript           — script with serifs" },
  { key: "NV Script",            name: "NV Script         — flowing script" },
  { key: "Hollywood",            name: "Hollywood         — diagonal screenplay" },
  { key: "Georgia11",            name: "Georgia11         — elegant serif" },
  { key: "Jacky",                name: "Jacky             — clean simple" },
  { key: "Rammstein",            name: "Rammstein         — bordered block" },
  { key: "Chunky",               name: "Chunky            — chunky outlined" },
  { key: "Bulbhead",             name: "Bulbhead          — compact rounded" },
];

// ── ANSI Colors ──
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
  bgGray: "\x1b[48;5;236m",
  white: "\x1b[97m",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function printLine(char = "─", color = c.gray) {
  console.log(color + char.repeat(56) + c.reset);
}

function printHeader() {
  console.clear();
  console.log();
  for (const line of figlet.textSync("ASCII BANNER", { font: "Big Money-ne" }).split("\n")) {
    console.log(`  ${c.cyan}${c.bold}${line}${c.reset}`);
  }
  for (const line of figlet.textSync("GENERATOR", { font: "Big Money-ne" }).split("\n")) {
    console.log(`  ${c.magenta}${c.bold}${line}${c.reset}`);
  }
  console.log();
  console.log(`  ${c.gray}  Create CLI banners with ease / CLIバナーを簡単に作成${c.reset}`);
  console.log();
}

// ─────────── Step 1: テキスト入力 ───────────
async function stepInputText() {
  console.log(
    `${c.green}${c.bold}  STEP 1${c.reset}  ${c.white}Enter the text to display / 表示したい文字列を入力してください${c.reset}`
  );
  console.log(
    `${c.gray}  Supported / 対応文字: A-Z, 0-9 / ひらがな・カタカナ・漢字${c.reset}`
  );
  console.log(
    `${c.gray}  Recommended / 推奨: up to 10 chars (EN) / 英字10文字以内, up to 8 chars (JP) / 日本語8文字以内${c.reset}`
  );
  console.log();

  const text = await ask(`  ${c.cyan}>${c.reset} `);

  if (!text.trim()) {
    console.log(`\n  ${c.red}Please enter some text / 文字列を入力してください${c.reset}\n`);
    return stepInputText();
  }

  return text.trim();
}

// ─────────── Step 2: フォント選択 ───────────
async function stepSelectFont(text) {
  const isJP = hasJapanese(text);
  const fonts = isJP
    ? Object.entries(JP_FONTS).map(([key, val]) => ({ key: `jp_${key}`, name: val.name }))
    : FIGLET_FONTS;

  console.log();
  printLine("─");
  console.log();
  console.log(
    `${c.green}${c.bold}  STEP 2${c.reset}  ${c.white}Choose a font / フォントを選んでください${c.reset}` +
    (isJP ? `  ${c.gray}(Japanese tile mode / 日本語タイルモード)${c.reset}` : "")
  );
  console.log();

  for (let i = 0; i < fonts.length; i++) {
    const { key, name } = fonts[i];
    const lines = renderText(text, key);

    console.log(
      `  ${c.yellow}${c.bold}[${String(i + 1).padStart(2)}]${c.reset} ${c.white}${name}${c.reset}`
    );
    for (const line of lines) {
      console.log(`  ${c.cyan}${line}${c.reset}`);
    }
    console.log();
  }

  const choice = await ask(
    `  ${c.cyan}Enter number / 番号を入力 (1-${fonts.length})${c.reset} > `
  );
  const idx = parseInt(choice, 10) - 1;

  if (isNaN(idx) || idx < 0 || idx >= fonts.length) {
    console.log(`\n  ${c.red}Please enter 1–${fonts.length} / 1〜${fonts.length}の番号を入力してください${c.reset}`);
    return stepSelectFont(text);
  }

  return fonts[idx].key;
}

// ─────────── Step 3: 装飾選択 ───────────
async function stepSelectDecoration(text, fontKey) {
  const decoKeys = Object.keys(DECORATIONS);

  console.log();
  printLine("─");
  console.log();
  console.log(
    `${c.green}${c.bold}  STEP 3${c.reset}  ${c.white}Choose a decoration / 装飾を選んでください${c.reset}`
  );
  console.log();

  for (let i = 0; i < decoKeys.length; i++) {
    const key = decoKeys[i];
    const deco = DECORATIONS[key];
    const lines = renderText(text, fontKey);
    const decorated = applyDecoration(lines, key);

    console.log(
      `  ${c.yellow}${c.bold}[${i + 1}]${c.reset} ${c.white}${deco.name}${c.reset}`
    );
    for (const line of decorated) {
      console.log(`  ${c.magenta}${line}${c.reset}`);
    }
    console.log();
  }

  const choice = await ask(
    `  ${c.cyan}Enter number / 番号を入力 (1-${decoKeys.length})${c.reset} > `
  );
  const idx = parseInt(choice, 10) - 1;

  if (isNaN(idx) || idx < 0 || idx >= decoKeys.length) {
    console.log(`\n  ${c.red}Please enter 1–${decoKeys.length} / 1〜${decoKeys.length}の番号を入力してください${c.reset}`);
    return stepSelectDecoration(text, fontKey);
  }

  return decoKeys[idx];
}

// ─────────── Step 4: 色選択 ───────────
async function stepSelectColor() {
  const COLORS = [
    { code: "",          label: "Default  (no color / 色なし)" },
    { code: "\x1b[36m",  label: "Cyan           シアン" },
    { code: "\x1b[32m",  label: "Green          緑" },
    { code: "\x1b[33m",  label: "Yellow         黄色" },
    { code: "\x1b[31m",  label: "Red            赤" },
    { code: "\x1b[35m",  label: "Magenta        マゼンタ" },
    { code: "\x1b[34m",  label: "Blue           青" },
    { code: "\x1b[97m",  label: "White          白" },
    { code: "\x1b[96m",  label: "Bright Cyan    明るいシアン" },
    { code: "\x1b[92m",  label: "Bright Green   明るい緑" },
    { code: "\x1b[93m",  label: "Bright Yellow  明るい黄色" },
    { code: "\x1b[91m",  label: "Bright Red     明るい赤" },
    { code: "\x1b[95m",  label: "Bright Magenta 明るいマゼンタ" },
    { code: "\x1b[94m",  label: "Bright Blue    明るい青" },
  ];

  console.log();
  printLine("─");
  console.log();
  console.log(
    `${c.green}${c.bold}  STEP 4${c.reset}  ${c.white}Choose a color / 色を選んでください${c.reset}`
  );
  console.log();

  for (let i = 0; i < COLORS.length; i++) {
    const { code, label } = COLORS[i];
    const swatch = code ? `${code}████${c.reset}` : `${c.gray}────${c.reset}`;
    console.log(`  ${c.yellow}${c.bold}[${String(i + 1).padStart(2)}]${c.reset}  ${swatch}  ${c.white}${label}${c.reset}`);
  }
  console.log();

  const choice = await ask(
    `  ${c.cyan}Enter number / 番号を入力 (1-${COLORS.length})${c.reset} > `
  );
  const idx = parseInt(choice, 10) - 1;

  if (isNaN(idx) || idx < 0 || idx >= COLORS.length) {
    console.log(`\n  ${c.red}Please enter 1–${COLORS.length} / 1〜${COLORS.length}の番号を入力してください${c.reset}`);
    return stepSelectColor();
  }

  return COLORS[idx].code;
}

// ─────────── Step 5: エクスポート形式 ───────────
async function stepSelectFormat() {
  const formats = [
    { key: "raw",        name: "Plain text / プレーンテキスト (.txt)" },
    { key: "javascript", name: "JavaScript (.js)" },
    { key: "typescript", name: "TypeScript (.ts)" },
    { key: "python",     name: "Python (.py)" },
    { key: "rust",       name: "Rust (.rs)" },
    { key: "go",         name: "Go (.go)" },
    { key: "shell",      name: "Shell (.sh)" },
  ];

  console.log();
  printLine("─");
  console.log();
  console.log(
    `${c.green}${c.bold}  STEP 5${c.reset}  ${c.white}Choose output format / 出力形式を選んでください${c.reset}`
  );
  console.log();

  for (let i = 0; i < formats.length; i++) {
    console.log(
      `  ${c.yellow}${c.bold}[${i + 1}]${c.reset} ${c.white}${formats[i].name}${c.reset}`
    );
  }
  console.log();

  const choice = await ask(
    `  ${c.cyan}Enter number / 番号を入力 (1-${formats.length})${c.reset} > `
  );
  const idx = parseInt(choice, 10) - 1;

  if (isNaN(idx) || idx < 0 || idx >= formats.length) {
    console.log(`\n  ${c.red}Please enter 1–${formats.length} / 1〜${formats.length}の番号を入力してください${c.reset}`);
    return stepSelectFormat();
  }

  return formats[idx].key;
}

// ─────────── Step 6: 出力 ───────────
async function stepOutput(text, fontKey, decoKey, colorCode, format) {
  const lines = renderText(text, fontKey);
  const decorated = applyDecoration(lines, decoKey);
  const code = exportCode(decorated, format, colorCode);
  const previewColor = colorCode || c.white;

  console.log();
  printLine("═", c.green);
  console.log();
  console.log(`${c.green}${c.bold}  ✔ Done! / 生成完了！${c.reset}`);
  console.log();

  // プレビュー
  console.log(`${c.gray}  ── Preview / プレビュー ──${c.reset}`);
  console.log();
  for (const line of decorated) {
    console.log(`  ${previewColor}${line}${c.reset}`);
  }
  console.log();

  // ファイル保存の確認
  printLine("─");
  console.log();
  console.log(
    `${c.white}  Save to file? / ファイルに保存しますか？${c.reset}`
  );
  console.log(
    `  ${c.yellow}[1]${c.reset} Save to file / ファイルに保存する`
  );
  console.log(
    `  ${c.yellow}[2]${c.reset} Print to terminal (copy & paste) / ターミナルに表示するだけ（コピペ用）`
  );
  console.log(
    `  ${c.yellow}[3]${c.reset} Start over / 最初からやり直す`
  );
  console.log();

  const choice = await ask(`  ${c.cyan}>${c.reset} `);

  if (choice.trim() === "1") {
    // ファイル保存
    const extMap = {
      raw: "txt",
      javascript: "js",
      typescript: "ts",
      python: "py",
      rust: "rs",
      go: "go",
      shell: "sh",
    };
    const ext = extMap[format] || "txt";
    const defaultName = `banner.${ext}`;

    console.log();
    const filename = await ask(
      `  ${c.cyan}Filename / ファイル名 (Enter for ${defaultName})${c.reset} > `
    );
    const finalName = filename.trim() || defaultName;
    const outputPath = path.resolve(process.cwd(), finalName);

    fs.writeFileSync(outputPath, code, "utf-8");
    console.log();
    console.log(`  ${c.green}${c.bold}✔ Saved / 保存しました:${c.reset} ${outputPath}`);
    console.log();
    printUsageHint(format, finalName);
  } else if (choice.trim() === "3") {
    return main();
  } else {
    // ターミナル表示
    console.log();
    printLine("─");
    console.log();
    console.log(`${c.gray}  ── Copy the output below / 以下をコピーしてください ──${c.reset}`);
    console.log();
    console.log(code);
    console.log();
    printLine("─");
  }

  // 続けるか確認
  console.log();
  const again = await ask(
    `  ${c.cyan}Create another banner? / 別のバナーを作りますか？ (y/N)${c.reset} > `
  );
  if (again.trim().toLowerCase() === "y") {
    return main();
  }

  console.log();
  console.log(`  ${c.dim}Thanks for using ASCII Banner Generator!${c.reset}`);
  console.log();
  rl.close();
}

function printUsageHint(format, filename) {
  console.log(`${c.gray}  ── How to use / 使い方 ──${c.reset}`);
  console.log();

  switch (format) {
    case "javascript":
      console.log(`  ${c.dim}// In your CLI app (e.g. cli.js) / あなたのCLIアプリ (例: cli.js) で:${c.reset}`);
      console.log(`  ${c.white}import { printBanner } from './${filename}';${c.reset}`);
      console.log(`  ${c.white}printBanner();${c.reset}`);
      break;
    case "typescript":
      console.log(`  ${c.dim}// In your CLI app / あなたのCLIアプリで:${c.reset}`);
      console.log(`  ${c.white}import { printBanner } from './${filename.replace(".ts", "")}';${c.reset}`);
      console.log(`  ${c.white}printBanner();${c.reset}`);
      break;
    case "python":
      console.log(`  ${c.dim}# In your CLI app / あなたのCLIアプリで:${c.reset}`);
      console.log(`  ${c.white}from ${filename.replace(".py", "")} import print_banner${c.reset}`);
      console.log(`  ${c.white}print_banner()${c.reset}`);
      break;
    case "rust":
      console.log(`  ${c.dim}// In main.rs / main.rs で:${c.reset}`);
      console.log(`  ${c.white}mod banner;${c.reset}`);
      console.log(`  ${c.white}banner::print_banner();${c.reset}`);
      break;
    case "go":
      console.log(`  ${c.dim}// In main() of main.go / main.go の main() で:${c.reset}`);
      console.log(`  ${c.white}PrintBanner()${c.reset}`);
      break;
    case "shell":
      console.log(`  ${c.dim}# In your shell script / シェルスクリプトで:${c.reset}`);
      console.log(`  ${c.white}source ${filename}${c.reset}`);
      console.log(`  ${c.white}print_banner${c.reset}`);
      break;
    default:
      console.log(`  ${c.dim}Use the file contents as-is / ファイルの内容をそのまま使えます${c.reset}`);
  }
  console.log();
}

// ─────────── Main ───────────
async function main() {
  printHeader();
  const text      = await stepInputText();
  const fontKey   = await stepSelectFont(text);
  const decoKey   = await stepSelectDecoration(text, fontKey);
  const colorCode = await stepSelectColor();
  const format    = await stepSelectFormat();
  await stepOutput(text, fontKey, decoKey, colorCode, format);
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
