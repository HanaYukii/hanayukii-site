// Block types for the six 日文 articles ported over from Jabiko（原本在
// jabiko.app/blog，2026-08 搬回自己站上）。文章內容是結構化資料而不是手寫 JSX，
// 由 src/components/ArticleBlocks.tsx 統一渲染 —— 搬過來時保留原本的 block 形狀，
// 內容才不會在轉換途中變形。
//
// 與 Jabiko 版的差異：拿掉了 `cta` block（指向 Jabiko 站內練習的深連結，這裡沒有
// 對應目標）。

export interface ArticleTableColumn {
  label: string;
  lang?: "ja";
  rowHeader?: boolean;
}

export type ArticleBlock =
  | { kind: "lead"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "callout"; text: string }
  // 單字表：詞 + 讀音 + 中文意思 + 用法註記（註記裡常嵌原創例句）。
  // `collapsed: true` 收成關閉的 <details>，前一個 heading 當作 summary 標題。
  | {
      kind: "vocab";
      collapsed?: boolean;
      items: ReadonlyArray<{ word: string; reading: string; meaning: string; note?: string }>;
    }
  // 事實對照表。rowHeader 欄會變成該列的語意標頭；lang 標記日文欄。
  | {
      kind: "table";
      caption: string;
      columns: ReadonlyArray<ArticleTableColumn>;
      rows: ReadonlyArray<ReadonlyArray<string>>;
    }
  // 外部資源連結（另開新頁）：官方 MV、合法歌詞站等。歌詞一律連出去，不重製。
  | { kind: "links"; label?: string; items: ReadonlyArray<{ label: string; url: string }> }
  // 歌詞講解。`lyric` 是佔位字串，由作者自己手動換成短片段（我們不產生歌詞）；
  // `points` 是從該段拉出來的日文筆記。`timestamp` 是 MV 裡的位置，如 "01:23"。
  | { kind: "lyricPoint"; lyric: string; timestamp?: string; points: ReadonlyArray<string> }
  // 分段標記：上半是隨筆、下半是日文教學。
  | { kind: "divider"; label: string };
