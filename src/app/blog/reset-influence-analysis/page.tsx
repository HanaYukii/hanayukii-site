import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "區塊鏈日報 RESET 活動心得 | 花雪 HanaYukii",
  description:
    "區塊鏈日報 RESET 從心啟動活動的觀察與反思。",
  openGraph: {
    title: "區塊鏈日報 RESET 活動心得",
    description:
      "區塊鏈日報 RESET 從心啟動活動的觀察與反思。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold text-warm scroll-mt-20">
      {children}
    </h2>
  );
}

export default function ResetInfluenceAnalysis() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            Life
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            觀察
          </span>
        </div>

        <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          區塊鏈日報 RESET 活動心得
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-04-12</p>

        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src="/images/reset/stage.jpg"
            alt="RESET 從心啟動 活動現場"
            width={800}
            height={600}
            className="w-full object-cover"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "context", title: "背景" },
              { id: "structure", title: "活動結構" },
              { id: "good", title: "好的部分" },
              { id: "questionable", title: "存疑的部分" },
              { id: "reflection", title: "我的反思" },
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

      <div className="prose-custom space-y-4 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ============ 背景 ============ */}
        <FadeIn>
          <Heading id="context">背景</Heading>
          <div className="space-y-4">
            <p>
              2026 還是來參加了區塊鏈日報 D大的見面會，
              今年包裝成比較偏個人成長、心靈課程方向的活動 RESET 從心啟動。
              我自己對幾個大的幣圈頻道都有持續收看，區塊鏈日報算是蠻熟悉的創作者。
            </p>
            <p>
              整體活動質感很好，內容跟橋段可以感受到是有用心花時間準備的。
              這篇比較想聊的是我自己觀察到的一些東西。
            </p>
            <p>
              更早期的我，不只是投資頻道，在很多地方都很容易把各種言論照單全收，
              不太會去拆解背後的邏輯跟動機。
              而我現在對他的頻道的總體評價，依然還是有很多值得學習的觀念，
              不過一定要自己消化，用適合的方式活用。
            </p>
            <p>
              這次參加 RESET，我也在過程中發現並思考更多，這套影響力是怎麼被建立起來的。
            </p>
          </div>
        </FadeIn>

        {/* ============ 活動結構 ============ */}
        <FadeIn>
          <Heading id="structure">活動結構</Heading>
          <div className="space-y-4">
            <p>
              因為是付費活動，具體內容就不展開了。
              整場大概一個多小時的演講，加上 QA 跟抽獎環節，
              抽獎禮物非常用心也很特別，很有個人風格。
            </p>
            <p>演講的結構很清楚：</p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                <strong>開場</strong>  -
                用心準備的誠意，希望每個人都有收穫。
              </li>
              <li>
                <strong>個人故事</strong>  -
                從家庭背景、早年經歷到後來的發展，大部分是頻道講過的故事。
              </li>
              <li>
                <strong>核心框架</strong>  -
                一套做人處事的觀念，圍繞幾個人生主題展開。
              </li>
              <li>
                <strong>收尾 + QA + 抽獎</strong>  -
                QA 環節風格跟平常節目差不多。
              </li>
            </ol>
          </div>

        </FadeIn>

        {/* ============ 好的部分 ============ */}
        <FadeIn>
          <Heading id="good">好的部分</Heading>
          <div className="space-y-4">
            <p>
              整場結構很完整，有明確的主題順序，觀眾很容易跟上也有記憶點。
              內容本身也有不少非常好的處世觀念原則，
              總體也是跟頻道長期的輸出方向很一致。
            </p>
            <p>
              故事性很強，一直用自己跟身邊人的經歷去帶，很容易讓人記住。
              現場感染力也很明顯，他知道怎麼經營氛圍，讓大家覺得來這裡是有意義的，
              對很多人來說會有鼓舞效果。
              決策的部分也有拆成步驟，很有系統。
            </p>
          </div>
        </FadeIn>

        {/* ============ 存疑的部分 ============ */}
        <FadeIn>
          <Heading id="questionable">存疑的部分</Heading>
          <div className="space-y-4">
            <p>
              有些觀點比較偏行動導向的詮釋，像是可以透過自己的選擇決定很多事，
              但現實還有家庭背景、運氣、行業差異這些變數，可能被忽略了一些。
              整體比較像是一種觀點框架，說服方式也偏個人經歷，較少引用外部資料或失敗案例的分析。
            </p>
            <p>
              整場在經營氛圍跟群體歸屬感上也下了不少功夫。
              語感偏成功學跟 sales 風格，對創業跟業務的人很有效，但不算是中性分享。
            </p>
            <h3 className="mt-6 mb-2 text-lg font-bold text-warm">最大的體會</h3>
            <p>
              這次最大的體會是這整套敘事工程的力量。
              其實很多觀點跟故事雖然都很好，也很值得學習，
              但也有點老生常談，不一定那麼特別。
              真正厲害的可能不是內容本身，而是這整套影響力工程，
              用故事取代道理，容易被記住；把原則壓成短句，容易在社群擴散；
              經營現場能量跟群體感，創造一種歸屬感。
              這點我是蠻佩服的。
            </p>
          </div>
        </FadeIn>

        {/* ============ 我的反思 ============ */}
        <FadeIn>
          <Heading id="reflection">我的反思</Heading>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/reset/card.jpg"
                alt="RESET 從心啟動 活動卡片"
                width={800}
                height={600}
                className="w-full object-cover"
              />
            </div>
            <p>
              現場接觸到不少背景跟銷售相關的人。
              以前我覺得技術能力、學歷才是比較正規、走正道、比較高級的路，
              可能也是工程師背景的偏見，對銷售一直有點距離。
              但現在越來越覺得能把東西賣出去就是本事，
              而現實上，幾乎所有工作，本質上都在某種程度參與價值交換與說服。
              很多人會在類似情況直接套負面標籤，
              但只要不是在害人，賣東西沒有那麼罪大惡極。
            </p>
            <p>
              整體來說，這場比較適合當成一套講者提供的框架來看，
              吸收裡面有用的部分，但不要整包吞下去。
              我覺得現在搭配 AI 分析很重要，可以拆解一路聽過去並沒有那麼注意到的點，
              最後內化成適合每個人的一套，才是真正的收穫。
            </p>

            <div className="my-2 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p>最後分享一句現場我很喜歡的歌詞：</p>
              <p className="mt-2 text-lg font-bold text-text">
                弱者抱著舊地圖，找新大陸。              </p>
              <p className="mt-2 text-sm">
                可能每個人都在用不同的地圖，甚至沒意識到自己正在用哪一張。
              </p>
            </div>
          </div>
        </FadeIn>

      </div>

      <FadeIn delay={0.5}>
        <div className="mt-12 flex flex-wrap gap-2 text-xs">
          {["Life", "觀察", "影響力", "銷售", "心理", "包裝"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface px-3 py-1 text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeIn>
    </article>
  );
}
