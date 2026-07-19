import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { articleMetadata } from "@/lib/seo";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";

export const metadata: Metadata = articleMetadata("/blog/kol-bull-market-amplifier", {
  title: "牛市放大效應與 KOL | 花雪 HanaYukii",
  description:
    "從 D 大、JAM 到 Google RSU 的投資反思。三條線指向同一件事：當距離太近、信念太強、故事太順，就容易把對某件事的真心相信，誤認成應該重壓的理由。",
  openGraph: {
    title: "牛市放大效應與 KOL",
    description:
      "從 D 大、JAM 到 Google RSU 的投資反思。當距離太近、信念太強、故事太順，就容易把相信誤認成重壓的理由。",
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

export default function KolBullMarketAmplifier() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href="/blog/kol-bull-market-amplifier" />
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
            投資
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl">
          牛市放大效應與 KOL
        </h1>
        <p className="mb-2 text-base text-text-muted leading-relaxed">
          從 D 大、JAM 到 Google RSU 的投資反思
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-05-02</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            Agenda
          </p>
          <div className="space-y-2">
            {[
              { id: "d-as-case", title: "D 大：外部 KOL 的案例" },
              { id: "web3-distance", title: "JAM Protocol" },
              { id: "rsu", title: "Google RSU" },
              { id: "bull-amplifier", title: "KOL 是牛市放大器，價格會幫人寫故事" },
              { id: "diversify", title: "從信念回到配置" },
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

        <FadeIn>
          <p>
            就是心血來潮。這幾天科技股跟幣圈都回血了一大波，也認真思考了一下，做了一波資產配置調動。
          </p>
          <p>
            幣圈的部分主要以 BTC 為主，本來就算相對穩健。這一波還是有受傷，但拿一般幣圈投資人比，算輕的。
          </p>
          <p>
            這篇想用三條線來整理這波的投資反思：D 大這個外部 KOL、自己參與 JAM / Web3 那段時間、跟在 Google 領 RSU 的那段時間。
          </p>
          <div className="my-8">
            <Image
              src="/images/kol-three-threads.png"
              alt="木塊在橫木板上保持平衡，分別標著 Beliefs、Allocation Structure、Surviving Parallel Worlds"
              width={1038}
              height={422}
              className="rounded-lg border border-border"
            />
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="d-as-case">D 大：外部 KOL 的案例</Heading>
          <p>
            D 大在台灣 crypto 圈算是相對有代表性的創作者，所以拿他當第一條線來談。
          </p>
          <p>
            他不是那種割韭菜的 KOL。他長期看好 BTC、相對不鼓勵高槓桿、不賺交易所反傭，熊市時也鼓勵定投，這在幣圈內容裡算難得。他真的保護了不少人。接觸得早、BTC 比例又配得高，這波幣圈下來受的傷也算相對小。如果當時完全沒看他，可能會在股市跟幣圈踩更多坑，甚至配了更高比例的山寨幣或碰槓桿，受傷會更重。
          </p>
          <p>
            當一個創作者過去講準過很多事、又非常自信，觀眾很容易把他的結論當成更高信心的訊號，包括那些風險很大、目標價給得很滿、把 bull case 講得像 base case 在敘述的部分。
          </p>
          <p>
            他容易出問題的地方也很明顯。確定感太強，不太把「我可能看錯」放上檯面。某些山寨幣的目標價講得太滿。嘴上講 DCA，但頻道一路看下來實際在做的更像抄底。對批評者常用「level 不夠的人沒資格 judge」直接排除。
          </p>
          <p>
            最後一個自己也常有，很多批評也真的是雜訊。但這不是百分之百，客觀來看這個觀念還是不對的。一個觀點對不對，跟說話的人 level 夠不夠是兩件事。
          </p>
          <p>
            另外一個問題是他常常會走到陰謀論。理論本身意識形態強，又少數據佐證，所以容易把市場上發生的事都解成「有人在主導」「主流故意打壓」這類論述。感染力多半來自這個，風險也是。
          </p>
          <p>
            像最近美股暴漲那段，他講起來也比較少帶 PE、獲利、利率這類能對照的數據。看法本身不一定錯，美股這幾年累積的估值風險本來就存在；但如果論述一直走敘事卻沒什麼數據進來，就比較難判斷是分析還是 push 世界觀。
          </p>
          <p>
            這跟他自己一直強調的「投資不要帶情緒」「不要被政治立場影響」是衝突的。一套世界觀長期帶著這麼強的意識形態，那本身就是一種立場，只是被包裝成「我比別人看得深」。
          </p>
          <p>
            敘事一旦長出來就很難動。再怎麼跟原本想法衝突的訊號，最後常常還是收回「信仰價位早晚會到」這種說法。久了就比較像在護自己原本的故事，不太像在研究市場。
          </p>
          <p>
            而且 D 大也不是單一案例。接收幣圈內容久了，bias 會越來越堆積，那些 KOL 的世界觀會慢慢變成自己的判斷。
          </p>
          <div className="my-6 space-y-3 rounded-xl border border-warm/30 bg-warm/5 px-6 py-5">
            <p className="text-text">
              牛市時，極度自信看起來像遠見；熊市時，極度自信就變成不認錯。
            </p>
            <p className="text-text">
              牛市時，堅持 thesis 看起來像耐心；熊市時，就只是拒絕承認劇本變了。
            </p>
            <p className="text-text">
              牛市時，高目標價看起來像看得比別人遠；熊市時，就變成不切實際的期待。
            </p>
            <p className="text-text">
              牛市時，忽略批評像不被雜音影響；熊市時，就是 ego 太重沒有校正機制。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="web3-distance">JAM Protocol</Heading>
          <p>
            持續比較深入參與 Web3 跟 JAM Protocol 相關的事，做的事情包括寫程式、看設計、跟一群人討論協議怎麼推進，期間領的報酬也一直是 token。
          </p>
          <p>
            那段經歷學到的東西很多。你會看到認真在做事的工程師、認真推進協議設計的人、認真試著把願景落地的團隊，技術感、願景感、社群感放在一起，感染力很強。
          </p>
          <p>
            當時也沒想那麼深，就是被那個氛圍影響著。回頭看才比較看清楚這個現象：<strong>近距離讓人看得更清楚，也讓人更難保持距離。</strong>你會更懂技術、更懂設計、更懂他們在解決什麼問題；但同時也更難對它的價格保持中立。市場定價並不在獎勵真誠或技術美感本身。
          </p>
          <p>
            技術很有價值，不等於它的幣價有大的 upside。<br />
            團隊很認真，不代表能拿到應有的財務報酬。<br />
            願景很漂亮，也許未來真的會實現，但當下市場就是不看它。
          </p>
          <p>
            熊市走到現在，官方似乎也受了不小的傷：進度緩慢、核心人員離開、不時遭遇質疑。這可能又是另一回事。
          </p>
          <p>
            主要的 exposure 是領到的 token 沒賣，心態上比自己重金買進的標的好不少。但財務上的打擊還是實實在在的。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="rsu">Google RSU</Heading>
          <p>
            以前在 Google 領 RSU。人在公司裡，每天看到很多聰明人在解問題、用著自家的產品、也知道有些東西早就在內部跑很久，自然會對這家公司多一份信心。
          </p>
          <p>
            題外話，當時畢業前也很接近去 NVDA，那幾乎是最完美的時機。最後還是選了 Google。這條沒走的路一直耿耿於懷，現在回頭看，當年那個近乎隨機的決定背後可能是完全不同的財務累積劇本。
          </p>
          <p>
            當時在 Cloud infrastructure 相關的地方，雖然不是直接做 AI 產品，但 AI 算力 fleet 怎麼擴張、轉向 TPU 的那一大 pivot，多少都有些接觸。當然當時也想像不到後來會被外面炒成這個敘事。
          </p>
          <p>
            <strong>但公司很強，不代表單一股票就應該在投資組合裡佔很高比例。熟悉感會增加信心，也會偷偷降低對集中風險的敏感度。</strong>
          </p>
          <p>
            GOOG、NVDA 這些長抱賺到的故事，本身就有很強的倖存者偏差。長抱贏到的人會被看見，但比較少人去看平行時空裡的另一面：RSU vest 之後股票腰斬，甚至跌到連當初 vest 時被課的稅都繳不起。這也是身邊聽過的案例。
          </p>
          <p>
            未來在新創拿到的 equity，如果真的累積出不小的價值，大概也是同一個劇本，到時候可能又是另一個課題。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="bull-amplifier">KOL 是牛市放大器，價格會幫人寫故事</Heading>
          <p>
            D 大這些特質不只他才有。<strong>KOL 在牛市是放大器。價格順風時，人格缺陷會被包裝成魅力；劇本逆風時，同一套風格才會變成風險。而且在另一個平行時空，他可能真的會被封神。</strong>
          </p>
          <p>
            機制不複雜：價格上漲，讓觀點看起來更正確；觀點被驗證，語氣就更自信；自信吸引更多觀眾，流量回過頭再強化權威感。這個正回饋對所有特質都是中性的，照樣放大優點跟缺點。問題是，他一直都是同一個人，變的是市場。
          </p>
          <p>
            這也不只發生在幣圈。台股、半導體、AI、黃金，任何正在大漲的市場都會冒出一批看起來很神的人。但很多時候順序是反的：不是故事先成立，所以價格漲。而是價格先漲，然後大家才開始替它補故事。
          </p>
          <p>
            事後算誰看錯也是一種偏見。如果 alt season 真的完整演出，D 大現在大概會被當成又一次驗證眼光的人。過去很多標的如果太早賣掉就會賣飛，過去在 MU、TSM、PLTR、AMD 這些後來大漲的股票上也都太早出場過。但現實是，這一年他主要的幾個觀點幾乎都走反方向；再拉長時間看劇本可能又不一樣，這也是平行時空的另一種可能。
          </p>
          <p>
            結果不能反推策略一定正確，這跟德州撲克的邏輯一樣：贏一手不代表打法對，輸一手不代表決策錯。D 大是前職業德撲選手，這套思路他講起來特別有說服力；自己也打過一段時間德撲，最高大概穩定打到 NL25，深感投資市場跟德撲有很多相似之處。但兩者差在德撲一手會結束，逼你看著結果想下一手，投資沒有這個明確的結算點，於是不認錯的特質很容易把錯誤展延很久。
          </p>
          <p>
            這波罵 D 大的人也不一定比較高明。長期敘事派、合約交易派、攻擊型 KOL，每一種風格都有自己的死法。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="diversify">從信念回到配置</Heading>
          <p>
            把這三條線放在一起看，是同一件事的不同版本：
          </p>
          <div className="my-6 space-y-3 rounded-xl border border-warm/30 bg-warm/5 px-6 py-5">
            <p className="text-text">
              外部 KOL 會影響我，因為他講得有道理、有成績、有自信。
            </p>
            <p className="text-text">
              技術社群會影響我，因為真的參與其中，看得到願景跟努力。
            </p>
            <p className="text-text">
              公司 RSU 會影響我，因為熟悉公司、熟悉產品、熟悉裡面的人。
            </p>
            <p className="text-text font-medium">
              但這些都不是「讓倉位失衡」的充分理由。
            </p>
          </div>
          <p>
            作用結果差不多：都會讓人把「我真的相信這個」直接當成「我該重壓這個」的理由。但相信跟重壓，本來就是兩件事。
          </p>
          <p>
            比較相信的處理方式是回到資產配置的角度，不再死盯單一倉位的浮盈浮虧。
          </p>
          <p>
            不過仔細想想，抱上抱下這麼久了，也不需要因為這一波就突然改策略；動作做太大，反而會是帶情緒的行為。本來執行很久的高 variance 策略不需要大改，本業跟資產實力本來就有拉高 beta、用一些槓桿的空間。可以做的是讓整體資產 coverage 提高一點；但合約、重倉山寨這些，肯定不會碰。
          </p>
          <p>
            更需要警覺的是對單一敘事的過度表達。仍然相信 crypto 有未來，半年或一年後也許又是黑夜過去、海闊天空的新風景；但這不代表要用山寨幣或幣圈股票去過度表達這個信念。看好 AI 也一樣，不代表要把倉位都堆到最高 beta 的衍生品。連現在追在半導體高點，都很難說一年後的劇本會長成什麼樣；同樣的 trap，換個敘事就會再來一次。
          </p>
          <p>
            另一個核心是：自己的觀點要是真正自己的。搭配 AI 一起分析、討論，把外部資訊內化成自己的一套，比以前容易很多。
          </p>
          <p>
            信念跟倉位中間，還有資產性質、比例、價格、時機這幾道過濾。少了任何一道，信念越強，倉位越危險。
          </p>
          <p>
            在過濾上多謹慎一點，代價當然是某些極端 upside 會錯過。但少賺是這套思路的成本，少受傷是這套思路的收益。
          </p>
          <p>
            比起問誰會被封神，比較常問自己三個問題：如果他看錯了，配置會不會被打穿？如果市場劇本換了，有沒有別的東西接住？如果最後是自己看錯，還有沒有機會修正？
          </p>
          <p>
            剩下的，交給市場劇本吧。
          </p>
        </FadeIn>

      </div>
      <RelatedPosts href="/blog/kol-bull-market-amplifier" />
    </article>
  );
}
