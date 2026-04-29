import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Cursor Teams 年繳踩雷紀錄 | 花雪 HanaYukii",
  description:
    "公司用 Cursor Teams 年繳遇到一個 seat billing 爭議：email rotation 被當成新增 seat，已付費 seat 沒人能用卻繼續被收錢。簡短紀錄一下。",
  openGraph: {
    title: "Cursor Teams 年繳踩雷紀錄",
    description:
      "Email rotation 被當成新增 seat，已付費 seat 沒人能用卻繼續被收錢。",
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

export default function CursorBillingDispute() {
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
            雜談
          </span>
          <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-medium text-warm">
            SaaS
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          Cursor Teams 年繳踩雷紀錄
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-04-29</p>
      </FadeIn>

      <div className="prose-custom space-y-4 text-text-muted leading-relaxed [&_strong]:text-text">

        <FadeIn>
          <p>
            公司用 Cursor Teams 年繳，最近遇到一個 seat billing 的爭議。簡短紀錄一下，也想請教有 SaaS team plan 經驗的人，這算正常嗎。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="what-happened">事情經過</Heading>
          <p>
            上個 cycle 結束前，把幾個用非公司 email 的成員移除，等新 cycle 開始後再用公司 email 邀請同一批人。人數沒變，純粹 email rotation。
          </p>
          <p>
            結果系統當成新增 seat，多收了年度席位費。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="stuck">卡住的點</Heading>
          <p>
            開 ticket 問客服，得到的解釋是：
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li>用過的 user 移除後不退費，那個 seat 會 lock 到 annual cycle 結束、繼續 billable</li>
            <li>之後邀請的人不會繼承這個 seat，會被當新 seat 收費</li>
            <li>連把同一個 email 加回來也算 new record，照收</li>
          </ul>
          <p>
            換句話說：那個已付費的 seat 沒有任何人能用，但會繼續被收錢到年底。我覺得很離譜。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="forum-vs-support">論壇官方說法 vs 客服</Heading>
          <p>
            Cursor 員工 Dean Rie 在
            {" "}
            <a
              href="https://forum.cursor.com/t/team-seat-management-best-practices-how-do-you-handle-member-changes/153016"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              官方論壇
            </a>
            {" "}
            自己承認：
          </p>
          <blockquote className="border-l-2 border-primary pl-4 italic">
            When a user is removed and then a new one is added, the system treats it as adding a new seat, even if the number of active users didn&apos;t actually increase.
          </blockquote>
          <p>
            同一段也提到 billing team 可以 review 並做 manual correction。
          </p>
          <p>
            但實際開了兩個 ticket，兩位客服都直接拒絕。第一個丟制式規則，第二個丟三個文件叫我自己讀，引用論壇證據時還選擇性引用，跳過「billing team can apply correction」的部分。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="my-take">我的看法</Heading>
          <p>
            不是要爭這筆錢，對方有解釋權，認賠就認賠。但有兩件事我想不通：
          </p>
          <ol className="list-inside list-decimal space-y-2 text-sm">
            <li>已付費的 seat 沒有任何人能用，但繼續被收錢——這個設計在 SaaS 圈算正常嗎？</li>
            <li>Slack、GitHub、Notion、Claude Team、ChatGPT Business 我所知都是 capacity-based，移除成員後 seat 可以重新分配。Cursor 是我目前知道唯一 identity-based 的。</li>
          </ol>
          <p>
            而且不只我這個 case。論壇上、GitHub issue、Trustpilot 都能找到類似的 billing 爭議，Trustpilot 評分 1.7/5，主要負評都跟 billing 有關。2025 年 6 月 CEO 也曾為 usage-based billing 風波公開道歉過，但結構性問題顯然沒解。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="conclusion">結論</Heading>
          <p>
            公司繳了一波學費。雖然我們規模不大，這幾個月累積下來也付了破萬美金的訂閱費。受到這樣的對待，心裡真的不平衡。
          </p>
          <p>
            選 Cursor 年繳是完全錯誤的決定，既然 seat 設計這麼硬，就不應該綁一年。如果回到當下，會直接走月繳。
          </p>
          <p>
            它們獨大就算了，現在看起來快被 Codex 跟 Claude Code 打趴，還要這樣對待客戶真的要確定耶。
          </p>
        </FadeIn>

      </div>
    </article>
  );
}
