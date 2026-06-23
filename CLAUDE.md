# CLAUDE.md — hanayuki-site

花雪 HanaYukii 的個人網站／部落格。Next.js App Router + Tailwind v4 + TypeScript。
Repo: HanaYukii/hanayukii-site（部署 hanayukii.dev）。

作者：強 C++ / 競賽背景，frontend 不熟。溝通用繁體中文，回覆要像人不要審訊腔（散文、不要條列癖）。

## 結構

- 部落格文章：`src/app/blog/<slug>/page.tsx`，一篇一個資料夾。
- 文章登錄表：`src/data/posts.ts`（陣列，**最新放最上面**；欄位 title/date/summary/tags/tagStyle/href，草稿用 `href: null`）。
- 共用元件：`src/components/`（`FadeIn`、`CodeBlock`(預設匯出 `Code`)、`ThemeToggle`、`MouseGlow`、`ReadingProgress`、`ArticleIllustration`…）。
- 佈景預設深色；`layout.tsx` 有支防閃白的 inline `<script>`，dev 會噴一個 React 警告（無害、非文章造成）。

## 寫新文章（照現有文章的格式）

參考 `cpp-span`、`cpp-reflection`、`cpp-polymorphism`、`claude-call-codex`。每篇 `page.tsx`：

- `export const metadata`：title 結尾加 `| 花雪 HanaYukii`，含 description 與 openGraph。
- `Heading` helper（h2、`text-warm`、`scroll-mt-20`），各段用 `<FadeIn>` 包。
- 程式碼用 `import Code from "@/components/CodeBlock"`，傳 `lang`（cpp/bash/toml/text…）。
- 寫完**務必登錄進 `src/data/posts.ts`**（加到陣列最前面）。
- tagStyle 慣例：`bg-primary/10 text-primary` = 技術文；`bg-accent/10 text-accent` = 生活／隨筆。

## 文風（重要，作者很在意）

- 標題**不要浮誇、不要 AI 味、不要用「聊聊…」**。技術文偏「…整理 / …入門」這種平實命名。
- 內文像個人筆記：精簡、就事論事。**忌**：說教金句、過度解釋、meta 開場（「這篇將…」）、過度 hedging、填充句、突然蹦出的縮寫（縮寫第一次出現補全名）。
- 技術文以 **example 為主、文字精簡**。
- 不重製整首版權歌詞——歌詞由作者自己貼進 `verses` 陣列，內文只短引用（合理使用）。

## Commit 紀律

- **一個交付物 = 一個 commit**（「一篇一 commit」）。訊息格式：`Add /blog/<slug> — <標題>`。
- 預設**先給作者看過、說 OK 再 commit**（除非他說「直接推」）。
- **絕對不要動 `src/app/about/`**：`about/AboutContent.tsx`、`about/page.tsx` 一直有未提交的 WIP，**永遠別 stage/commit 它們**。
- 因此**只 `git add` 指定路徑**（文章資料夾 + `src/data/posts.ts`），**不要 `git add -A` / `git add .`**。

## 驗證流程

- 指令要在 repo 根目錄跑：`Set-Location "C:\Users\islu2\Documents\Projects\hanayuki-site"`（否則 git/tsc 會失敗）。
- typecheck：`npx tsc --noEmit`；build：`npm run build`。
- 預覽：preview 工具，launch.json 的 server 名是 `hanayuki-dev`（port 3000）。隱藏視窗的 `preview_screenshot` 會 timeout，改用 `preview_eval` / `preview_snapshot` 驗證內容。
- 刪 route 後 build 若報 `.next` 舊型別錯，清掉 `.next` 重 build。

## 語法雷

- `<Code>{`...`}</Code>` 是 JS template literal：字面要出現 `${` 必須跳脫成 `\${`；單獨的 `{}`（如 `std::format("{}")`）沒問題。
- JSX 散文裡的 `<` `>` 要寫 `&lt;` `&gt;`；Code template literal 裡則是字面，不用跳脫。
