import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/reset-influence-analysis", {
  title: "區塊鏈日報 RESET 活動心得 | 花雪 HanaYukii",
  description:
    "朋友剛好多一張票，我就去看了 RESET。整場安排得很完整，也讓我重新想了一次內容、敘事和影響力怎麼綁在一起。",
  openGraph: {
    title: "區塊鏈日報 RESET 活動心得",
    description:
      "朋友剛好多一張票，我就去看了 RESET。整場安排得很完整，也讓我重新想了一次內容、敘事和影響力怎麼綁在一起。",
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

export default function ResetInfluenceAnalysis() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/reset-influence-analysis" />
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

        <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl">
          區塊鏈日報 RESET 活動心得
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-04-12</p>

        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src="/images/reset/card.jpg"
            alt="RESET 從心啟動 活動卡片"
            width={800}
            height={600}
            className="w-full object-cover"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            這篇會寫到
          </p>
          <div className="space-y-2">
            {[
              { id: "context", title: "為什麼會來" },
              { id: "structure", title: "現場大概怎麼進行" },
              { id: "good", title: "我覺得做得好的地方" },
              { id: "questionable", title: "有些地方我還是有保留" },
              { id: "reflection", title: "回頭看自己" },
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
          <Heading id="context">為什麼會來</Heading>
          <div className="space-y-4">
            <p>
              朋友剛好多一張票，我想說去看看應該也會有收穫，就到了這場 RESET 從心啟動。
              個人成長和心靈課程這種內容我也有點好奇。平常幾個大的幣圈頻道我都有看，區塊鏈日報算是我很熟的一個。
            </p>
            <p>
              活動做得很完整，內容和橋段看得出花了不少時間。
            </p>
            <p>
              以前不只看投資頻道，很多事情我都很容易把別人的話照單全收，不太會拆背後的邏輯和動機。
              現在我還是覺得他的頻道有不少值得學的觀念，只是一定得自己消化。
            </p>
            <p>
              這次坐在現場，反而一直注意他是怎麼把影響力做出來的。
            </p>
          </div>
        </FadeIn>

        {/* ============ 活動結構 ============ */}
        <FadeIn>
          <Heading id="structure">現場大概怎麼進行</Heading>
          <div className="space-y-4">
            <p>
              因為是付費活動，具體內容就不展開了。
              整場大概一個多小時的演講，加上 QA 跟抽獎環節，
              抽獎禮物非常用心也很特別，很有個人風格。
            </p>
            <p>演講的結構很清楚：</p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                <strong>開場</strong>：
                先講準備這場活動的心情，也希望每個人都有收穫。
              </li>
              <li>
                <strong>個人故事</strong>：
                從家庭背景、早年經歷到後來的發展，大部分是頻道講過的故事。
              </li>
              <li>
                <strong>核心框架</strong>：
                幾個他常講的做人處事觀念。
              </li>
              <li>
                <strong>收尾 + QA + 抽獎</strong>：
                QA 環節風格跟平常節目差不多。
              </li>
            </ol>
          </div>

        </FadeIn>

        {/* ============ 好的部分 ============ */}
        <FadeIn>
          <Heading id="good">我覺得做得好的地方</Heading>
          <div className="space-y-4">
            <p>
              主題排得很順，現場很好跟，也容易記。
              裡面不少處世原則我原本就在頻道聽過，和他長期的內容很一致。
            </p>
            <p>
              他很會用自己和身邊人的經歷帶內容，現場氣氛也掌握得很好。
              對很多人來說應該很有鼓舞效果；講到決策時也有拆成步驟，不會只停在口號。
            </p>
          </div>
        </FadeIn>

        {/* ============ 存疑的部分 ============ */}
        <FadeIn>
          <Heading id="questionable">有些地方我還是有保留</Heading>
          <div className="space-y-4">
            <p>
              有些段落把重點放在「靠選擇改變人生」，但家庭背景、運氣、行業差異和個人條件，沒有被談得那麼多。
              整體比較像講者的一套觀點，主要靠個人經歷說服，外部資料和失敗案例比較少。
            </p>
            <p>
              整場在經營氛圍跟群體歸屬感上也下了不少功夫。
              語感偏成功學跟 sales 風格，對創業跟業務的人很有效，但不算是中性分享。
            </p>
            <h3 className="mt-6 mb-2 text-lg font-bold text-warm">比內容更讓我注意的事</h3>
            <p>
              我最後最在意的，其實不是哪一條原則，而是他怎麼把這些不算新鮮的道理講得有力量。
              故事比道理容易記，短句適合在社群流動，現場的群體感又讓內容更有重量。這套能力我是真的佩服。
            </p>
          </div>
        </FadeIn>

        {/* ============ 我的反思 ============ */}
        <FadeIn>
          <Heading id="reflection">回頭看自己</Heading>
          <div className="space-y-4">
            <p>
              現場遇到不少做銷售的人。以前我總覺得技術能力和學歷才算比較「正規」的路，對 sales 有一點工程師式的偏見。
              後來越來越覺得，能把東西賣出去本來就是能力；多數工作其實都是銷售鏈的一部分，只是未必由自己站在最前面。
              只要不是靠傷害別人賺錢，沒有必要一看到 sales 就先貼負面標籤。
            </p>
            <p>
              我會把這場當成講者提供的一套框架：有用的留下，不合的就放著，不用整包吞。
              散場後再把幾個當下沒想清楚的地方慢慢拆開，最後留下適合自己的版本。
            </p>

            <div className="my-2 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p>最後分享一句現場我很喜歡的歌詞：</p>
              <p className="mt-2 text-lg font-bold text-text">
                弱者抱著舊地圖，找新大陸。              </p>
              <p className="mt-2 text-sm">
                只是在這個時代，什麼是舊地圖，每個人的答案大概都不太一樣，也可能沒有標準答案。
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
      <RelatedPosts href="/blog/reset-influence-analysis" />
    </article>
  );
}
