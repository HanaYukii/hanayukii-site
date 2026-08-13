import type { ReactNode } from "react";

export type ParallelRow = {
  /** 左軌：原文、標準說法、形式敘述 */
  lead: ReactNode;
  /** 右軌：譯文、實際行為、人聲旁白 */
  echo: ReactNode;
};

/**
 * 雙軌並置。
 *
 * 這個站的三種內容抽掉題材之後是同一個形狀：兩個聲音的對讀。
 * 歌詞是日文／中譯，題解是形式摘要／人聲旁白，C++ 文是標準怎麼寫／
 * 編譯器實際做什麼。原本這三種都是各自手刻的 grid，這裡收成一個。
 *
 * 窄螢幕會疊成上下兩段，所以右軌不要放唯一資訊——它是「對照」，
 * 不是「補充說明」。
 */
export default function Parallel({
  rows,
  labels,
  preserveLines = true,
}: {
  rows: ParallelRow[];
  /** 給非歌詞用途標欄名；歌詞不需要 */
  labels?: { lead: string; echo: string };
  /** 歌詞要保留斷行，散文不用 */
  preserveLines?: boolean;
}) {
  const cell = preserveLines ? "whitespace-pre-line" : "";

  return (
    <div className="my-8 space-y-8">
      {labels && (
        <div className="grid gap-x-8 border-b border-border pb-2 font-mono text-xs uppercase tracking-wider text-text-muted sm:grid-cols-2">
          <span>{labels.lead}</span>
          <span>{labels.echo}</span>
        </div>
      )}
      {rows.map((row, i) => (
        <div key={i} className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <div className={`${cell} text-text`}>{row.lead}</div>
          <div className={`${cell} text-text-muted`}>{row.echo}</div>
        </div>
      ))}
    </div>
  );
}
