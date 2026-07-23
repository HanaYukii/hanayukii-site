import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/video-to-article-workflow", {
  title: "把 YouTube 影片變成逐字稿，再整理成文章 | 花雪 HanaYukii",
  description:
    "一套實際跑過的 YouTube 轉錄流程：先抓現成字幕，沒有才用 yt-dlp 下載音訊並交給 Whisper；包含會員影片、時間區段、常見錯誤與整理 prompt。",
  openGraph: {
    title: "把 YouTube 影片變成逐字稿，再整理成文章",
    description:
      "先抓字幕，沒有才下載音訊跑 Whisper；從網址到逐字稿、筆記與文章的完整流程。",
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
          把 YouTube 影片變成逐字稿，再整理成文章
        </h1>
        <p className="mb-2 text-sm text-text-muted">2026-07-22</p>
        <p className="mb-8 text-text-muted">
          不必把影片完整播放一遍再錄音。先檢查 YouTube 有沒有字幕；沒有的話，
          直接下載音訊交給 Whisper。這篇把我實際跑過的 Windows 指令、會員影片的處理方式、
          常見錯誤，以及逐字稿接到筆記和文章的流程放在一起。
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "overview", title: "先看最短流程" },
              { id: "setup", title: "第一次安裝" },
              { id: "transcribe", title: "字幕、音訊與 Whisper" },
              { id: "members", title: "會員影片與失敗排查" },
              { id: "example", title: "這次實測" },
              { id: "organize", title: "從逐字稿到文章" },
              { id: "article", title: "最後才改成文章" },
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
          <Heading id="overview">先看最短流程</Heading>
          <p>
            原則是能撿現成的就撿：字幕比音訊快，音訊比錄音快。優先順序照下面走，
            一層不行才降到下一層：
          </p>
          <Code lang="text">{`yt-dlp 直接列得到字幕
→ 直接用 yt-dlp 抓

會員影片、yt-dlp 看不到，但播放器設定裡有字幕軌
→ 從已登入的瀏覽器攔 timedtext（見會員影片一節）

播放器也沒有字幕軌
→ 下載音訊跑 Whisper

下載音訊也不可行（DRM 之類）
→ 最後才即時錄音`}</Code>
          <p className="mt-4">
            音訊下載通常遠快於影片長度，所以一支二十分鐘的影片不用播放二十分鐘。
            如果只是想知道內容，流程走到筆記就夠；真的要公開發文，再多做查證與改寫。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="setup">第一次安裝</Heading>
          <p>
            以下以 Windows PowerShell 為例。yt-dlp 負責拿字幕與音訊，FFmpeg 負責音訊轉換，
            Deno 則是新版 YouTube 完整解析所需的 JavaScript runtime。
          </p>
          <Code lang="powershell">{`winget install yt-dlp.yt-dlp
winget install Gyan.FFmpeg
winget install DenoLand.Deno

pip install -U openai-whisper`}</Code>
          <p className="mt-4">安裝後重開 PowerShell，用下面三行確認路徑已生效：</p>
          <Code lang="powershell">{`yt-dlp --version
ffmpeg -version
deno --version`}</Code>
          <p className="mt-4">
            yt-dlp 現在強烈建議同時準備 FFmpeg 與 JavaScript runtime；Whisper 需要系統裡真的有
            FFmpeg 執行檔，不是安裝同名 Python 套件。版本或平台不同時，直接看{" "}
            <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              yt-dlp 官方文件
            </a>{" "}
            和{" "}
            <a href="https://github.com/openai/whisper" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              OpenAI Whisper
            </a>
            。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="transcribe">字幕、音訊與 Whisper</Heading>
          <p>
            每支影片都照同一個順序跑：先列出字幕，沒有才抓音訊。檔名一律使用影片 ID，
            可以避開日文標題、特殊字元和同名檔案。
          </p>

          <SubHeading>第一步：永遠先看有沒有字幕</SubHeading>
          <Code lang="powershell">{`$url = "https://www.youtube.com/watch?v=VIDEO_ID"
yt-dlp --list-subs $url`}</Code>
          <p>
            看到人工字幕或 automatic captions，就不用跑語音辨識。把可能用到的繁中、中文、
            日文和英文字幕抓下來：
          </p>
          <Code lang="powershell">{`yt-dlp --skip-download --write-subs --write-auto-subs ` + "`" + `
  --sub-langs "zh-TW,zh-Hant,zh,ja.*,en" ` + "`" + `
  -o "%(id)s.%(ext)s" $url`}</Code>
          <p className="mt-4">
            產出的 VTT 已經有時間碼，可以直接整理。原始字幕先留著，不要一開始就叫模型「潤稿」；
            模型可能會把聽不清楚的地方順手補成一個看似合理、其實沒人說過的句子。
          </p>

          <SubHeading>第二步：沒有字幕才下載音訊</SubHeading>
          <p>
            <code>-x</code> 表示只取音訊，不會把整支影片載回來：
          </p>
          <Code lang="powershell">{`yt-dlp -x --audio-format m4a ` + "`" + `
  -o "%(id)s.%(ext)s" $url`}</Code>
          <p className="mt-4">
            如果只需要前十分鐘，直接加
            <code>--download-sections "*00:00-10:00"</code>，不必先下載整段再自己切。
          </p>

          <SubHeading>第三步：交給 Whisper</SubHeading>
          <Code lang="powershell">{`whisper "VIDEO_ID.m4a" ` + "`" + `
  --language Japanese ` + "`" + `
  --task transcribe ` + "`" + `
  --model turbo ` + "`" + `
  --output_format all ` + "`" + `
  --output_dir ".\\VIDEO_ID"`}</Code>
          <p className="mt-4">
            日文改 <code>Japanese</code>、中文改 <code>Chinese</code>；不確定語言也可以省略。
            <code>turbo</code> 適合先拿草稿，訪談、多人閒聊或專有名詞很多時，再換
            <code>large-v3</code>。第一次執行會先下載模型，之後才會快。
          </p>
          <p className="mt-4">
            已知會出現的人名、公司名或術語，可以加
            <code>--initial_prompt "會出現的詞：私立恵比寿中学、えびチリ"</code>。
            這不是保證正確，但通常比轉完後到處修同一個名字省事。
          </p>

        </FadeIn>

        <FadeIn>
          <Heading id="members">會員影片與失敗排查</Heading>
          <SubHeading>帳號有觀看權限</SubHeading>
          <p>
            讓本機 yt-dlp 讀取 Chrome 的登入狀態即可，不需要把帳密交給第三方網站：
          </p>
          <Code lang="powershell">{`yt-dlp --cookies-from-browser "chrome:Default" ` + "`" + `
  -x --audio-format m4a ` + "`" + `
  -o "%(id)s.%(ext)s" $url`}</Code>
          <p className="mt-4">
            帳號在別的 Chrome 使用者中，就把 <code>Default</code> 改成 <code>Profile 1</code>；
            cookie 資料庫被鎖住時，先完全關閉 Chrome 再跑。不要把 cookies 匯出後上傳給字幕網站、
            模型或其他人，那份檔案等同一段可用的登入權限。
          </p>

          <SubHeading>yt-dlp 看不到，但播放器其實有字幕軌</SubHeading>
          <p>
            這次實際踩到的情況，有兩個很容易誤判的點。第一，會員影片剛載入時，CC
            按鈕可能暫時顯示 unavailable，不能立刻斷定沒有字幕；等播放器初始化完，
            打開「設定 → Subtitles/CC」看有沒有字幕軌才算數。選單裡出現
            Subtitles/CC Chinese 這種選項，就是獨立的字幕軌，不只是壓在畫面上的字。
          </p>
          <p className="mt-4">
            第二，頁面原始碼裡的字幕 <code>baseUrl</code> 不一定抓得到內容：少了播放器產生的{" "}
            <code>pot</code> 這類參數時，伺服器會回 200 但內容是空的。
            拿到 200 不等於下載成功，要看內容有沒有東西。
          </p>
          <p className="mt-4">
            正確做法是攔播放器實際發出的請求：開 DevTools 的 Network、篩{" "}
            <code>timedtext</code>，把 CC 打開，抓那條完整的{" "}
            <code>{"/api/timedtext?...&pot=...&fmt=json3"}</code> 請求，把回應存下來。
            一開始沒看到請求，就把 CC 關掉再打開，讓播放器重新載入字幕。
          </p>
          <p className="mt-4">
            這條路不需要匯出 cookies。簽名過的 URL 通常有期限，抓到就立刻下載。
          </p>

          <SubHeading>常見錯誤</SubHeading>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li>
              <strong>No supported JavaScript runtime</strong>：先確認 Deno 安裝成功；如果已經有 Node 22 以上，
              也可以在 yt-dlp 指令後加 <code>--js-runtimes node</code>。
            </li>
            <li>
              <strong>ffmpeg not found</strong>：重開終端後再試；<code>-x</code> 和音訊格式轉換都依賴 FFmpeg。
            </li>
            <li>
              <strong>faster-whisper 報 CUDA DLL 不存在</strong>：有 NVIDIA 顯卡不等於 cuBLAS、cuDNN
              與 CTranslate2 已接好。Windows 可先安裝 <code>nvidia-cublas-cu12</code>、
              <code>nvidia-cudnn-cu12</code>，並確認兩者的 bin 目錄在 PATH；只想先拿草稿，就暫時改用 CPU 或 turbo。
            </li>
            <li>
              <strong>下載仍被擋</strong>：先更新 yt-dlp。真的碰到 DRM 或播放器專用串流，才退回 OBS／系統音訊錄製；
              這不是一般 YouTube 影片的預設流程。
            </li>
          </ul>
        </FadeIn>

        <FadeIn>
          <Heading id="example">這次實測</Heading>
          <p>
            我用 2026 年 7 月 22 日公開的{" "}
            <a href="https://www.youtube.com/watch?v=G-owM38MEvI" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              「えびチリ、はじめました」MV 幕後影片
            </a>{" "}
            跑了一次。影片長 18:50，<code>--list-subs</code> 確認人工字幕與自動字幕都不存在；
            接著直接下載 17.45 MiB 的 m4a 音訊，再以{" "}
            <a href="https://github.com/SYSTRAN/faster-whisper" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              faster-whisper
            </a>{" "}
            的日文 <code>large-v3</code> 轉錄。
          </p>
          <Callout>
            下載只花幾秒；補齊 CUDA runtime 後，RTX 5060 跑 large-v3 約 43 秒。
            整段都不需要播放 18 分 50 秒，也不占用瀏覽器。
          </Callout>
          <p className="mt-4">
            這類幕後花絮有多人同時說話、笑聲、遠距離收音和背景音樂，逐字稿一定要視為草稿。
            我也試過 CPU small：不到一分鐘就跑完，但重複與誤聽明顯，不能直接使用。
            人名、歌名和重疊對話仍要回到時間碼人工確認；模型大、輸出看起來流暢，也不代表每一句都是真的。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="organize">從逐字稿到文章</Heading>
          <p>
            我會把原始輸出、整理稿和最後文章分開。原始稿不修改，之後才有辦法回頭核對：
          </p>
          <Code lang="text">{`VIDEO_ID/
├── source.url       # 影片網址與基本資料
├── source.srt       # Whisper 或 YouTube 的原始字幕
├── transcript.md    # 人工修過的可讀稿
├── notes.md         # 重點、疑問與待查證項目
└── article.md       # 真的要發布時才建立`}</Code>

          <SubHeading>先修辨識，不要先改寫</SubHeading>
          <Code lang="text">{`保留所有時間碼與原意，修正明顯的語音辨識錯誤。
不要摘要、不要補寫講者沒說的內容。
無法確認的人名或句子標成 [聽不清]；多人同時說話標成 [重疊]。`}</Code>

          <SubHeading>再整理成能看的筆記</SubHeading>
          <Code lang="text">{`請根據逐字稿整理：
1. 內容按主題分段，每段附時間範圍
2. 核心主張、理由、例子與保留條件分開
3. 標出前後矛盾、值得查證的數字與專有名詞
4. 「講者實際說的」與「你的推論」分開
5. 不確定的地方保留 [待確認]，不要猜`}</Code>
          <p className="mt-4">
            大部分影片停在 notes.md 就夠了。這一步的重點不是文筆，而是拿到一份可搜尋、
            可回到時間碼核對，而且把事實與模型推論分開的筆記。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="article">最後才改成文章</Heading>
          <p>
            公開文章尤其容易把摘要寫成講者原話。涉及人物評論、財經或技術判斷時，數字、日期、
            引述與因果關係都要逐項查證。這也是我在{" "}
            <Link href="/blog/kol-bull-market-amplifier" className="text-primary hover:underline">
              KOL 言論要拆解不能照單全收
            </Link>{" "}
            裡採用的分法。
          </p>
          <Code lang="text">{`把 notes.md 改寫成文章：
- 按讀者理解順序重排，不照逐字稿逐句重述
- 引述、摘要與作者分析明確分開
- 待查證項目逐項查；查不到就寫「未確認」
- 刪掉套話、重複結論與 AI 常見的空泛收尾
- 保留具體細節與人的語氣，不替當事人補動機
- 另附一版適合社群發布的 300 字短文`}</Code>
          <p className="mt-4">
            不是每支影片都值得變成長文。先取得可靠的文字，值得留下的內容再投入時間查證和成文，
            這樣整條流程才不會反過來變成新的負擔。
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
