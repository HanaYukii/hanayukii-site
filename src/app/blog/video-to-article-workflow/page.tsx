import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/video-to-article-workflow", {
  title: "用 AI 把影片整理成筆記與文章 | 花雪 HanaYukii",
  description:
    "把影片變成逐字稿再變筆記的流程：yt-dlp 抓字幕與音訊、Whisper 系轉錄，指令可直接抄；整理大多時候直接丟 GPT，要成文再走內容卡與查證。",
  openGraph: {
    title: "用 AI 把影片整理成筆記與文章",
    description:
      "yt-dlp 抓字幕與音訊、Whisper 轉錄的可抄指令；整理大多時候直接丟 GPT。",
    type: "article",
  },
});

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold text-warm scroll-mt-20">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 mt-8 text-lg font-bold">{children}</h3>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-4 border-l-2 border-primary pl-4 text-text-muted italic">
      {children}
    </blockquote>
  );
}

export default function VideoToArticleWorkflow() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/video-to-article-workflow" />
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            AI
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Tooling
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          用 AI 把影片整理成筆記與文章
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-07-22</p>
        <p className="mb-8 text-text-muted">
          看影片吸收資訊的效率其實很差：重點散在幾十分鐘裡，看完常常只記得結論。
          我現在的做法是先把影片變成逐字稿，再拿去整理。
          這篇把每一步的指令寫清楚，照抄就能動；整理那段我自己最常做的其實就是丟給 GPT。
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "overview", title: "流程總覽" },
              { id: "transcribe", title: "拿到逐字稿：四種情況" },
              { id: "tools", title: "轉錄工具怎麼選" },
              { id: "files", title: "檔案怎麼放" },
              { id: "digest", title: "整理：大多時候丟 GPT 就夠" },
              { id: "article", title: "要發布成文章再走完整流程" },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
              >
                <span className="text-text-muted mr-2">{i + 1}.</span>
                <code className="text-primary">{item.title}</code>
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">

        <FadeIn>
          <Heading id="overview">流程總覽</Heading>
          <p>
            整條線是：影片 → 帶時間戳的逐字稿 → 筆記或文章。
            前半段（拿逐字稿）全自動，工具都是現成的；後半段（整理）看需求，
            大多時候丟給 GPT 問重點就結束，要發布成文章才走完整流程。
          </p>
          <p className="mt-4">
            我常整理的是財經頻道的影片，之前在{" "}
            <Link href="/blog/kol-bull-market-amplifier" className="text-primary hover:underline">
              KOL 言論要拆解不能照單全收
            </Link>{" "}
            寫過原因。這套流程就是把「拆解」變成固定步驟：原話、摘要、自己的分析分開，數字列出來查。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="transcribe">拿到逐字稿：四種情況</Heading>
          <p>
            先裝 yt-dlp（<code>pip install -U yt-dlp</code>，或 winget / brew 都有）。
            依影片狀況分四種，由快到慢。
          </p>

          <SubHeading>情況一：公開影片、有字幕（幾秒鐘）</SubHeading>
          <p>
            不用下載影片，直接抓字幕檔。YouTube 的自動字幕也抓得到：
          </p>
          <Code lang="bash">{`yt-dlp --write-auto-subs --sub-langs "zh-TW,zh,en" --skip-download -o "sub" URL`}</Code>
          <p className="mt-4">
            產出 <code>sub.zh-TW.vtt</code> 之類的字幕檔，裡面就是帶時間戳的逐字稿。
            .vtt 直接丟給 AI 沒問題，它讀得懂；想要乾淨純文字再叫它幫你去掉時間軸就好。
          </p>

          <SubHeading>情況二：公開影片、沒字幕（幾分鐘）</SubHeading>
          <p>
            先只抓音訊，再丟轉錄。轉錄用 whisper-ctranslate2（faster-whisper 的指令列版）：
          </p>
          <Code lang="bash">{`# 抓音訊(不下載影片,快很多)
yt-dlp -x --audio-format m4a -o "audio.m4a" URL

# 轉錄:輸出 txt + srt(帶時間戳)
pip install whisper-ctranslate2
whisper-ctranslate2 audio.m4a --model large-v3-turbo --language zh \\
  --output_format txt srt`}</Code>
          <p className="mt-4">
            兩個中文的坑：第一，Whisper 輸出常是簡體，用 OpenCC 轉，或整份丟給 AI 叫它轉繁順便整理。
            第二，專有名詞（幣種、公司名、技術詞）錯誤率高，
            加 <code>--initial_prompt "會出現的詞: Solana, 聯準會, ETF"</code> 先餵給它，準確率會好很多。
          </p>
          <p className="mt-4">
            沒有 GPU 的機器改走 Groq 的 API，跑一樣的模型，速度反而更快，一小時音訊只要幾美分：
          </p>
          <Code lang="bash">{`curl https://api.groq.com/openai/v1/audio/transcriptions \\
  -H "Authorization: Bearer $GROQ_API_KEY" \\
  -F "file=@audio.m4a" -F "model=whisper-large-v3-turbo" \\
  -F "response_format=verbose_json"`}</Code>

          <SubHeading>情況三：會員限定影片</SubHeading>
          <p>
            帳號有權限的話，讓 yt-dlp 帶著瀏覽器的 cookies 走，多半直接就能抓：
          </p>
          <Code lang="bash">{`yt-dlp --cookies-from-browser chrome -x --audio-format m4a URL`}</Code>
          <p className="mt-4">
            Windows 上 Chrome 要先完全關閉才讀得到 cookies；還是不行就改用 Firefox，
            或用瀏覽器擴充功能把 cookies.txt 匯出來給 <code>--cookies</code> 用。
          </p>

          <SubHeading>情況四：真的抓不下來</SubHeading>
          <p>
            DRM 串流這類就是最後手段：邊播放邊錄系統音訊（OBS 或 Windows 的立體聲混音都行），
            錄完的檔案照情況二轉錄。最慢，但一定通。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="tools">轉錄工具怎麼選</Heading>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li><strong>有 NVIDIA GPU</strong>：faster-whisper 配 large-v3。求快換 large-v3-turbo，解碼快很多，品質掉一點點。</li>
            <li><strong>Mac</strong>：whisper.cpp，在 Apple silicon 上比 faster-whisper 快不少。</li>
            <li><strong>要逐字時間戳或分講者</strong>：whisperX，在 faster-whisper 上加對齊跟 diarization。</li>
            <li><strong>不想架環境</strong>：Groq API（上面那條 curl）；ElevenLabs Scribe 則是內建分講者。</li>
            <li><strong>偷懶路線</strong>：Gemini API 可以直接吃 YouTube 網址（有每日時數上限）。快速摘要可以，認真整理還是先拿逐字稿比較穩，模型直接看影片容易只給表面層級的摘要。</li>
          </ul>
        </FadeIn>

        <FadeIn>
          <Heading id="files">檔案怎麼放</Heading>
          <Code lang="text">{`video-id/
├── source.txt    # 原始逐字稿,不修改
├── notes.md      # 整理出來的筆記
└── article.md    # 要發布才有:文章與短版`}</Code>
          <p className="mt-4">
            一支影片一個資料夾。<strong>原始逐字稿永不修改</strong>：AI 修稿常會順手改到語意，
            出問題要能回頭對原話。另外轉錄的中間檔很容易堆在系統 Temp，那裡會被自動清掉，整理前記得搬走。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="digest">整理：大多時候丟 GPT 就夠</Heading>
          <p>
            大部分影片我根本不會走到寫文章那步。最常做的就是把逐字稿（.vtt 原檔也行）直接丟給 GPT，
            問幾個固定問題：
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>這支影片的核心主張是什麼，各在幾分幾秒</li>
            <li>他給了什麼理由跟數據</li>
            <li>有沒有前後矛盾，或他自己講的保留條件</li>
            <li>哪些數字跟說法值得查證</li>
          </ul>
          <p className="mt-4">
            五分鐘就有一份能存的筆記，比看完影片記得的多得多。
            唯一要盯的是：叫它把「講者實際說的」跟「它自己的推論」分開，不然 AI 很愛把兩者混在一起。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="article">要發布成文章再走完整流程</Heading>
          <p>
            要公開發文（尤其會批評到別人觀點、或涉及投資判斷）標準就高了，多兩件事：
            <strong>查證</strong>（數字、日期、對他人立場的轉述、因果關係，逐項查，查不到就寫「未確認」，不准假裝查過），
            以及<strong>把原話、摘要、自己的分析分開呈現</strong>，不把推論寫成對方原話。
            實際的 prompt 大概長這樣，照自己的領域調：
          </p>
          <Code lang="text">{`把這份逐字稿整理成一篇分析文章。要求:
- 先列內容卡:核心主張(帶時間戳)、理由與數據、講者自己的保留條件
- 「講者實際說的」「摘要」「你的分析」分開,不把推論寫成他的原話
- 需要查證的主張列成清單逐項查,查不到就寫「未確認」,不准假裝查過
- 文章按讀者理解的順序重排,不照逐字稿順序機械重述
- 不杜撰他沒說過的內容;涉及投資,事實與推測分開,不寫成買賣建議
- 最後另附一版 300 字的社群短文`}</Code>
          <p className="mt-4">
            整套跑下來，轉錄幾乎全自動，查證還是要人工把關，但比從零開始寫快非常多。
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 flex flex-wrap gap-2 text-xs">
            {["AI", "Whisper", "yt-dlp", "Workflow", "內容整理"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1 text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
      <RelatedPosts href="/blog/video-to-article-workflow" />
    </article>
  );
}
