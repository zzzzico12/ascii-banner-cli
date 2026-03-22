// ─────────────────────────────────────────────
//  日本語タイルレンダラー
//  各文字を枠で囲んで横に並べてASCIIアートにする
// ─────────────────────────────────────────────

/**
 * 半角ASCII文字を全角に変換（タイル内で2カラム幅を保証するため）
 */
function normalizeChar(ch) {
  if (ch === ' ' || ch === '\u3000') return '\u3000'; // 全角スペース
  const code = ch.charCodeAt(0);
  if (code >= 0x21 && code <= 0x7E) {
    return String.fromCharCode(code + 0xFEE0); // 半角→全角
  }
  return ch; // ひらがな・カタカナ・漢字はそのまま
}

// ── タイルスタイル定義 ────────────────────────
// 各 render(ch) は5行の文字列配列を返す
// ch は全角2カラム文字を前提とする

export const JP_FONTS = {

  // ── 4カラム幅タイル（コンパクト）──────────────
  box: {
    name: "Box         ╔══╗",
    render: (ch) => [
      '╔══╗',
      `║${ch}║`,
      '║\u3000║',
      '╚══╝',
      '    ',
    ],
  },

  round: {
    name: "Round       ╭──╮",
    render: (ch) => [
      '╭──╮',
      `│${ch}│`,
      '│\u3000│',
      '╰──╯',
      '    ',
    ],
  },

  block: {
    name: "Block       ████",
    render: (ch) => [
      '████',
      `█${ch}█`,
      '█\u3000█',
      '████',
      '    ',
    ],
  },

  thick: {
    name: "Thick       ┏━━┓",
    render: (ch) => [
      '┏━━┓',
      `┃${ch}┃`,
      '┃\u3000┃',
      '┗━━┛',
      '    ',
    ],
  },

  shadow: {
    name: "Shadow      ╔══╗▌",
    render: (ch) => [
      '╔══╗ ',
      `║${ch}║▌`,
      '║\u3000║▌',
      '╚══╝▌',
      ' ▀▀▀▀',
    ],
  },

  dots: {
    name: "Dots        ●──●",
    render: (ch) => [
      '●──●',
      `│${ch}│`,
      '│\u3000│',
      '●──●',
      '    ',
    ],
  },

  // ── 6カラム幅タイル（ゆったり）──────────────
  tall: {
    name: "Tall        ╔════╗",
    render: (ch) => [
      '╔════╗',
      '║    ║',
      `║ ${ch} ║`,
      '║    ║',
      '╚════╝',
    ],
  },

  tall_round: {
    name: "Tall Round  ╭────╮",
    render: (ch) => [
      '╭────╮',
      '│    │',
      `│ ${ch} │`,
      '│    │',
      '╰────╯',
    ],
  },

  tall_thick: {
    name: "Tall Thick  ┏━━━━┓",
    render: (ch) => [
      '┏━━━━┓',
      '┃    ┃',
      `┃ ${ch} ┃`,
      '┃    ┃',
      '┗━━━━┛',
    ],
  },

  minimal: {
    name: "Minimal     ──文──",
    render: (ch) => [
      '      ',
      `  ${ch}  `,
      '      ',
      '  ──  ',
      '      ',
    ],
  },
};

/**
 * 日本語テキストをタイルスタイルでレンダリング
 * @param {string} text  入力テキスト
 * @param {string} styleKey  JP_FONTS のキー
 * @returns {string[]}  レンダリング結果（行の配列）
 */
export function renderJapanese(text, styleKey) {
  const style = JP_FONTS[styleKey] || JP_FONTS.box;
  const chars = Array.from(text); // サロゲートペア対応

  const tiles = chars.map((ch) => {
    if (ch === ' ' || ch === '\u3000') {
      // スペースは空の4カラムタイル
      return Array(5).fill('      ');
    }
    return style.render(normalizeChar(ch));
  });

  if (tiles.length === 0) return [''];
  const height = tiles[0].length;
  return Array.from({ length: height }, (_, i) =>
    tiles.map((t) => t[i] ?? '').join('  ')
  );
}

/**
 * テキストに日本語（ひらがな・カタカナ・漢字）が含まれるか判定
 */
export function hasJapanese(text) {
  return /[\u3040-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/.test(text);
}
