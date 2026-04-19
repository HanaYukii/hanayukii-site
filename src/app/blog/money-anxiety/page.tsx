import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "財務自由是不是假議題 | 花雪 HanaYukii",
  description:
    "明知道這輩子不需要太擔心，卻停不下來想捲。科技圈的投資焦慮、亞洲文化的匱乏感，跟那個永遠不夠的數字。",
  openGraph: {
    title: "財務自由是不是假議題",
    description:
      "明知道這輩子不需要太擔心，卻停不下來想捲。科技圈的投資焦慮、亞洲文化的匱乏感，跟那個永遠不夠的數字。",
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

export default function MoneyAnxiety() {
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
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            Career
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          財務自由是不是假議題
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          Draft
        </p>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text">

        {/* ── 科技圈的投資焦慮 ── */}
        <FadeIn>
          <Heading id="anxiety">科技圈的投資焦慮</Heading>
          <p>
            {/* 這個圈子人人在聊投資，好像不投資就是落後 */}
            {/* TC 焦慮 → 投資焦慮 → 永遠覺得不夠 */}
            {/* 身邊的人 TC 都很高，比較基準被拉歪 */}
          </p>
        </FadeIn>

        {/* ── 客觀上不需要擔心 ── */}
        <FadeIn>
          <Heading id="enough">客觀上不需要擔心</Heading>
          <p>
            {/* 算一下真正需要的數字，很多人早就夠了 */}
            {/* 這輩子客觀上並不需要太擔心 */}
            {/* 被動收入的迷思：大部分人追的是安全感不是錢 */}
          </p>
        </FadeIn>

        {/* ── 但還是想捲 ── */}
        <FadeIn>
          <Heading id="contradiction">但還是想捲</Heading>
          <p>
            {/* 明知道夠了，但骨子裡還是停不下來 */}
            {/* 想趁現在擴大自己的安定性 */}
            {/* 理性上知道夠了 vs 情緒上停不下來，這兩者可以共存 */}
            {/* 這個矛盾本身就值得正視 */}
          </p>
        </FadeIn>

        {/* ── 亞洲文化的匱乏感 ── */}
        <FadeIn>
          <Heading id="culture">亞洲文化的匱乏感</Heading>
          <p>
            {/* 父母那代的匱乏感傳下來了 */}
            {/* 亞洲文化常見的「多存一點」思維 */}
            {/* 不是個人問題，是文化驅動的集體焦慮 */}
          </p>
        </FadeIn>

        {/* ── 「財務自由」這個詞本身 ── */}
        <FadeIn>
          <Heading id="myth">「財務自由」這個詞本身</Heading>
          <p>
            {/* 這個詞本身就是陷阱 — 數字永遠會往上調 */}
            {/* 花時間盯盤不如花時間做自己喜歡的事 */}
            {/* 不是要說「知足常樂」那種雞湯，而是承認這個矛盾 */}
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
