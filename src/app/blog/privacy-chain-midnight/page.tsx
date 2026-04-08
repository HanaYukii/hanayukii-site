import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "隱私鏈技術入門：Midnight Network | 花雪 HanaYukii",
  description:
    "用 Midnight 這個例子，快速看懂隱私鏈在解什麼問題，以及 ZK proof 在鏈上怎麼用。",
  openGraph: {
    title: "隱私鏈技術入門：Midnight Network",
    description:
      "用 Midnight 這個例子，快速看懂隱私鏈在解什麼問題，以及 ZK proof 在鏈上怎麼用。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold scroll-mt-20">
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

export default function PrivacyChainMidnight() {
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
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Web3
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Privacy
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            ZK-SNARKs
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          隱私鏈技術入門：Midnight Network
        </h1>
        <p className="mb-8 text-sm text-text-muted">2026-04-06</p>
      </FadeIn>

      {/* ── 前言 ── */}
      <FadeIn>
        <div className="space-y-4">
          <p>
            公鏈最大的優點是透明，但這也剛好是它最不適合企業的地方。
            假設一家公司用鏈上錢包付供應商，競爭對手只要知道地址，就能一路看到付款頻率、金額區間，甚至猜出你在跟誰合作。
          </p>
          <p>
            從工程角度看，這其實是資料分層的問題：
            哪些資料要交給共識層，哪些資料只該留在使用者端。
            Midnight 有意思的地方就在這裡，它不是只想把轉帳藏起來，而是想把這套分層能力直接做進智能合約。
          </p>
        </div>
      </FadeIn>

      {/* ── 公鏈透明性的問題 ── */}
      <FadeIn>
        <Heading id="problem">公鏈透明的問題</Heading>
        <div className="space-y-4">
          <p>
            對個人來說，你只要公開過一次地址，別人就可能一路串出你的資產、交易習慣、還有常互動的對象。
            對企業更麻煩：薪資、供應商付款、倉位調整，都可能直接變成競爭情報。
          </p>
          <p>
            幣圈很習慣把透明當成預設美德，但透明到連 business logic 和 flow 都外露，很多場景根本上不了鏈。
            所以很多企業不是不想用區塊鏈，而是不想把營運細節直播給全世界看。
          </p>
        </div>
      </FadeIn>

      {/* ── 現有方案比較 ── */}
      <FadeIn>
        <Heading id="comparison">隱私方案的三條路線</Heading>
        <div className="space-y-4">
          <p>
            現在常見做法大概三種。差別不在誰比較酷，而在隱私做到哪一層。
          </p>

          <SubHeading>1. 全隱私：Monero</SubHeading>
          <p>
            Monero 走的是「預設全隱藏」。
            發送者、收款地址、金額都盡量藏起來，隱私很強。
          </p>
          <p>
            代價也很直接：合規很難做，而且它主要還是轉帳系統，不是拿來寫複雜 DApp 的平台。
          </p>

          <SubHeading>2. 可選隱私：Zcash</SubHeading>
          <p>
            Zcash 是「你可以選擇隱藏」。
            公開交易跟一般鏈差不多，shielded transaction 才會把內容藏起來。
          </p>
          <p>
            問題是隱藏交易通常比較麻煩、也比較貴，最後很多人還是走公開路徑。
            而且它的隱私主要還是在轉帳，不是在智能合約層。
          </p>

          <SubHeading>3. 可程式化隱私：Midnight</SubHeading>
          <p>
            Midnight 想做的是「可程式化隱私」。
            不是只有交易可不可以藏，而是合約可以直接規定哪些資料公開、哪些不公開。
          </p>
          <p>
            例如使用者可以證明自己通過了 KYC、已成年、或信用分數高於某個門檻，
            但不需要把名字、生日、完整信用報告交給合約。
            換句話說，Monero 和 Zcash 比較像在處理「交易隱私」，Midnight 想處理的是「合約邏輯裡的資料隱私」。
          </p>
        </div>
      </FadeIn>

      {/* ── ZK-SNARKs 原理 ── */}
      <FadeIn>
        <Heading id="zk-snarks">ZK-SNARKs：不揭露秘密就能證明真相</Heading>
        <div className="space-y-4">
          <p>
            ZK-SNARKs 可以先記成一句話：
            <strong>你可以證明「我符合條件」，但不必交出原始資料</strong>。
          </p>

          <SubHeading>最直觀的例子：年齡驗證</SubHeading>
          <p>
            想像一下酒吧只想知道你有沒有滿 18 歲。
            傳統做法是看身分證，所以店員會連生日、姓名、照片一起看到。
          </p>
          <p>
            ZK proof 的理想狀況是：系統只收到「這個人已成年」的證明，
            其他資料完全不給。放到鏈上也是同樣概念，合約驗證 proof，
            不需要碰到底層文件。
          </p>

          <SubHeading>這四個字到底在說什麼</SubHeading>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Zero-Knowledge</strong>：只知道結果是真的，不知道原始資料
            </li>
            <li>
              <strong>Succinct</strong>：proof 很短，驗證很快
            </li>
            <li>
              <strong>Non-Interactive</strong>：不用來回問答，一次提交就能驗
            </li>
            <li>
              <strong>Argument of Knowledge</strong>：你不是亂猜，而是真的握有那份秘密資料
            </li>
          </ul>

          <SubHeading>在區塊鏈上怎麼用</SubHeading>
          <p>
            放到區塊鏈上，可以把它想成一句更實際的話：
            <strong>原始資料留在本地，只有「我符合條件」這件事上鏈</strong>。
          </p>
          <p>
            對工程師來說，這比較像 validity proof。
            使用者先在本地把輸入算完，再提交一個 proof，鏈上 verifier 只檢查這次狀態轉移是否合法。
          </p>
          <p>
            例如借貸協議只需要知道你的信用分數大於 700，不需要知道完整報表；
            合約只驗證 proof 是否成立，不讀原始資料本身。
          </p>
          <Callout>
            這也是 ZK proof 最有價值的地方：
            合約驗的是「條件」，不是「文件」。
          </Callout>
        </div>
      </FadeIn>

      {/* ── Midnight 架構 ── */}
      <FadeIn>
        <Heading id="architecture">Midnight 的架構拆解</Heading>
        <div className="space-y-4">
          <p>
            Midnight 可以先抓三個關鍵：雙狀態、本地執行加 proof、以及能寫隱私合約。
          </p>

          <SubHeading>雙狀態模型：公開 + 私有</SubHeading>
          <p>
            它把狀態拆成公開和私有兩部分：
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Public State</strong>：大家都看得到的部分，例如合約規則、公開更新、可驗證的鏈上狀態
            </li>
            <li>
              <strong>Private State</strong>：留在使用者本地的部分，例如身份資料、私有屬性、或不想曝光的狀態
            </li>
          </ul>
          <p>
            如果用工程師比較熟的講法，Public State 是共識層真正要維護的 shared state，
            Private State 則比較像 client-side state，只是它的狀態轉移要能被 proof 約束。
          </p>

          <SubHeading>Kachina Protocol：橋接公開和私有狀態</SubHeading>
          <p>
            真正關鍵不是「有私有資料」，而是「私有資料怎麼安全參與合約執行」。
            Midnight 的答案可以很簡單地記成四個字：本地算，鏈上驗。
          </p>
          <p>
            Kachina Protocol 的流程大致是：
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>使用者在本地執行合約，讀取公開狀態和自己的私有資料</li>
            <li>本地算完後生成一個 proof</li>
            <li>把 proof 和必要的公開更新一起送上鏈</li>
            <li>鏈上只驗 proof，不看私有資料本身</li>
          </ol>
          <p>
            這整件事最像的其實不是傳統 on-chain execution，而是
            <strong>off-chain execution + on-chain verification</strong>。
            例如一個 KYC 合約，鏈上公開更新的可能只是「這個地址可以進入某市場」，
            不是你的護照、姓名或住址。
          </p>

          <SubHeading>Compact：寫隱私合約的語言</SubHeading>
          <p>
            如果每次都要手寫 ZK 電路，幾乎沒幾個開發者受得了。
            Compact 的價值就在這裡：你用接近 TypeScript 的方式寫規則，再把 public / private 分清楚。
          </p>
          <Code lang="typescript">{`// Compact 智能合約範例（類 TypeScript 語法）
contract AgeVerification {
  public minimumAge: number = 18;
  private birthDate: Date;

  isAdult(): boolean {
    return this.age() >= this.minimumAge;
  }
}`}</Code>
          <p>
            對幣圈開發者來說，可以把它理解成：
            你不是在寫「所有 state 都直接上鏈」的 Solidity 版本，
            而是在寫一個有明確公開邊界和私有邊界的合約。
          </p>

          <SubHeading>NIGHT / DUST 雙代幣模型</SubHeading>
          <p>
            Midnight 還把付費資源拆成 NIGHT / DUST。
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>NIGHT</strong>：公開的治理 / 質押代幣
            </li>
            <li>
              <strong>DUST</strong>：shielded、不可轉讓的資源，用來付交易手續費
            </li>
          </ul>
          <p>
            直觀理解就好：如果 gas fee 本身是公開的，觀察者還是可能從付費模式猜出你的活動。
            DUST 的存在，就是想把這種側漏也壓低。
          </p>
        </div>
      </FadeIn>

      {/* ── Selective Disclosure ── */}
      <FadeIn>
        <Heading id="selective-disclosure">選擇性揭露：隱私和合規可以共存</Heading>
        <div className="space-y-4">
          <p>
            Midnight 想打的不是「完全躲監管」，而是「只交代必要資訊」。
            這就是 Selective Disclosure。
          </p>
          <p>
            幾個很直觀的例子：
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>KYC 合規</strong>：DeFi 只需要知道你通過 KYC，不需要拿到你的名字和住址
            </li>
            <li>
              <strong>信用驗證</strong>：借貸協議只需要知道你的信用分數大於 700，不需要整份信用報告
            </li>
            <li>
              <strong>年齡驗證</strong>：遊戲或平台只需要知道你已成年，不需要看到生日
            </li>
          </ul>
          <p>
            這些例子的共同點很重要：合約驗的是條件，不是原始文件。
            工程上看，這代表你不用在每個協議裡複製一份敏感資料庫，也不用讓每個合作方都接觸完整個資。
          </p>
        </div>
      </FadeIn>

      {/* ── 共識機制 ── */}
      <FadeIn>
        <Heading id="consensus">共識先知道這些就夠</Heading>
        <div className="space-y-4">
          <p>
            共識不是這篇的主角。先記兩件事就好：
            Midnight 是獨立 L1，但和 Cardano 生態綁得很深；另外它現在還在很早期，驗證者開放程度也還在往外擴。
          </p>
        </div>
      </FadeIn>

      {/* ── 總結比較 ── */}
      <FadeIn>
        <Heading id="tradeoff">各方案的取捨</Heading>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-semibold"></th>
                  <th className="pb-3 pr-4 font-semibold">Monero</th>
                  <th className="pb-3 pr-4 font-semibold">Zcash</th>
                  <th className="pb-3 pr-4 font-semibold">Aztec</th>
                  <th className="pb-3 font-semibold">Midnight</th>
                </tr>
              </thead>
              <tbody className="text-text-muted">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-text">隱私模式</td>
                  <td className="py-3 pr-4">預設全隱藏</td>
                  <td className="py-3 pr-4">可選</td>
                  <td className="py-3 pr-4">L2 Rollup</td>
                  <td className="py-3">可程式化</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-text">密碼學</td>
                  <td className="py-3 pr-4">Ring Sig</td>
                  <td className="py-3 pr-4">ZK-SNARKs</td>
                  <td className="py-3 pr-4">ZK-SNARKs</td>
                  <td className="py-3">Recursive ZK-SNARKs</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-text">智能合約</td>
                  <td className="py-3 pr-4">無</td>
                  <td className="py-3 pr-4">無</td>
                  <td className="py-3 pr-4">有 (Noir)</td>
                  <td className="py-3">有 (Compact)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium text-text">合規</td>
                  <td className="py-3 pr-4">不支援</td>
                  <td className="py-3 pr-4">有限</td>
                  <td className="py-3 pr-4">開發中</td>
                  <td className="py-3">原生支援</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-text">架構</td>
                  <td className="py-3 pr-4">L1</td>
                  <td className="py-3 pr-4">L1</td>
                  <td className="py-3 pr-4">Ethereum L2</td>
                  <td className="py-3">L1 (Cardano partner)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            如果只看一句話：Monero 偏極致隱私，Zcash 偏可選隱私，
            Midnight 偏合約層的可程式化隱私。
            Midnight 最吸引人的點不是「更神祕」，而是它比較像給開發者用的隱私工具箱。
            但它也還很早，技術方向清楚，不代表生態和採用一定跟得上。
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          {["Web3", "Privacy", "ZK-SNARKs", "Midnight", "Blockchain"].map((tag) => (
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
