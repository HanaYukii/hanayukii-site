import FadeIn from "@/components/FadeIn";
import type { ArticleBlock } from "@/data/articles/types";

// 渲染從 Jabiko 搬回來的日文文章（結構化 block 資料，見 src/data/articles/types.ts）。
// 站上其他文章是手寫 JSX；這六篇是搬過來的，用同一組 Tailwind 樣式統一渲染，
// 內容才不必重打一遍。

function Lead({ text }: { text: string }) {
  return <p className="mb-6 text-lg leading-relaxed text-text">{text}</p>;
}

function Heading({ text, id }: { text: string; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold text-warm scroll-mt-20">
      {text}
    </h2>
  );
}

function Paragraph({ text }: { text: string }) {
  return <p className="my-4 leading-relaxed text-text-muted">{text}</p>;
}

function Callout({ text }: { text: string }) {
  return (
    <aside className="my-6 border-l-2 border-primary pl-4 text-text-muted italic">{text}</aside>
  );
}

function VocabList({ items }: { items: Extract<ArticleBlock, { kind: "vocab" }>["items"] }) {
  return (
    <dl className="my-6 divide-y divide-border/50">
      {items.map((item) => (
        <div key={item.word} className="py-3">
          <dt className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-semibold text-warm" lang="ja">
              {item.word}
            </span>
            <span className="text-sm text-text-muted" lang="ja">
              （{item.reading}）
            </span>
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-text-muted">
            <span>{item.meaning}</span>
            {item.note ? <span className="mt-1 block text-text-muted/80">{item.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Table({ block }: { block: Extract<ArticleBlock, { kind: "table" }> }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="mb-3 text-left text-xs uppercase tracking-[0.12em] text-text-muted">
          {block.caption}
        </caption>
        <thead>
          <tr className="border-b border-border text-left">
            {block.columns.map((column) => (
              <th key={column.label} scope="col" className="pb-3 pr-4 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-text-muted">
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border/50">
              {block.columns.map((column, columnIndex) => {
                const cell = row[columnIndex] ?? "";
                return column.rowHeader ? (
                  <th
                    key={column.label}
                    scope="row"
                    lang={column.lang}
                    className="py-2.5 pr-4 text-left font-medium text-text"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={column.label} lang={column.lang} className="py-2.5 pr-4">
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Links({ block }: { block: Extract<ArticleBlock, { kind: "links" }> }) {
  return (
    <div className="my-6 rounded-lg border border-border bg-surface/40 p-4">
      {block.label ? (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-primary">
          {block.label}
        </p>
      ) : null}
      <ul className="space-y-1.5">
        {block.items.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-primary"
            >
              {item.label} &nearr;
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 歌詞片段是佔位字串，等作者自己貼短引用進去；這裡只負責排版，不產生歌詞。
function LyricPoint({ block }: { block: Extract<ArticleBlock, { kind: "lyricPoint" }> }) {
  return (
    <div className="my-6">
      <div className="flex items-start justify-between gap-4">
        <blockquote
          className="border-l-2 border-accent pl-4 text-text whitespace-pre-line"
          lang="ja"
        >
          {block.lyric}
        </blockquote>
        {block.timestamp ? (
          <span className="shrink-0 font-mono text-xs text-text-muted">{block.timestamp}</span>
        ) : null}
      </div>
      <ul className="mt-3 list-disc space-y-1.5 pl-8 text-sm leading-relaxed text-text-muted">
        {block.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="my-12 flex items-center gap-4" role="separator" aria-label={label}>
      <span className="h-px flex-1 bg-border" />
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function Block({ block, id }: { block: ArticleBlock; id: string }) {
  switch (block.kind) {
    case "lead":
      return <Lead text={block.text} />;
    case "heading":
      return <Heading text={block.text} id={id} />;
    case "paragraph":
      return <Paragraph text={block.text} />;
    case "callout":
      return <Callout text={block.text} />;
    case "vocab":
      return <VocabList items={block.items} />;
    case "table":
      return <Table block={block} />;
    case "links":
      return <Links block={block} />;
    case "lyricPoint":
      return <LyricPoint block={block} />;
    case "divider":
      return <Divider label={block.label} />;
  }
}

// `collapsed` 的單字表折成關閉的 <details>：緊接在前的 heading 當標題，
// 沒有 heading 就退回「單字表」。內容仍在 DOM 裡，只是預設收起來。
function CollapsedVocab({
  title,
  block,
}: {
  title: string;
  block: Extract<ArticleBlock, { kind: "vocab" }>;
}) {
  return (
    <details className="my-6 rounded-lg border border-border bg-surface/30 px-4">
      <summary className="-mx-4 cursor-pointer px-4 py-3 text-warm transition-colors hover:text-primary">
        <span className="text-lg font-semibold">{title}</span>
        <span className="ml-2 text-xs text-text-muted">{block.items.length} 個詞</span>
      </summary>
      <VocabList items={block.items} />
    </details>
  );
}

export default function ArticleBlocks({ blocks }: { blocks: ReadonlyArray<ArticleBlock> }) {
  const nodes = [];

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const next = blocks[index + 1];

    if (block.kind === "heading" && next?.kind === "vocab" && next.collapsed) {
      nodes.push(
        <FadeIn key={index}>
          <CollapsedVocab title={block.text} block={next} />
        </FadeIn>
      );
      index++;
      continue;
    }

    if (block.kind === "vocab" && block.collapsed) {
      nodes.push(
        <FadeIn key={index}>
          <CollapsedVocab title="單字表" block={block} />
        </FadeIn>
      );
      continue;
    }

    nodes.push(
      <FadeIn key={index}>
        <Block block={block} id={`s-${index}`} />
      </FadeIn>
    );
  }

  return <>{nodes}</>;
}
