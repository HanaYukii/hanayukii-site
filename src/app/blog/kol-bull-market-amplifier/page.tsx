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
    "回頭看 D 大、JAM 和以前領過的 Google RSU，自己是怎麼把熟悉與相信，慢慢變成了過重的倉位。",
  openGraph: {
    title: "牛市放大效應與 KOL",
    description:
      "回頭看 D 大、JAM 和以前領過的 Google RSU，自己是怎麼把熟悉與相信，慢慢變成了過重的倉位。",
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
          這波調整完倉位，回頭看 D 大、JAM 和以前領過的 Google RSU
        </p>
        <p className="mb-8 text-sm text-text-muted">2026-05-02</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            這篇會寫到
          </p>
          <div className="space-y-2">
            {[
              { id: "d-as-case", title: "先從 D 大說起" },
              { id: "web3-distance", title: "JAM Protocol" },
              { id: "rsu", title: "Google RSU" },
              { id: "bull-amplifier", title: "KOL 是牛市放大器，價格會幫人寫故事" },
              { id: "prediction-leverage", title: "預測也是一種槓桿" },
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
            調整完才發現，D 大、自己參與 JAM / Web3 的那段時間，還有以前在 Google 領 RSU，看起來是三件事，最後卻讓我在配置上犯了很像的錯。
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
          <Heading id="d-as-case">先從 D 大說起</Heading>
          <p>
            D 大在台灣 crypto 圈算是很有代表性的創作者。我也看了他一段時間，就先從這裡講起。
          </p>
          <p>
            他不是那種割韭菜的 KOL。他長期看好 BTC、相對不鼓勵高槓桿、不賺交易所反傭，熊市時也鼓勵定投，這在幣圈內容裡算難得。他真的保護了不少人。
          </p>
          <p>
            接觸得早、BTC 比例又配得高，這波幣圈下來受的傷也算相對小。如果當時完全沒看他，可能會在股市跟幣圈踩更多坑，甚至配了更高比例的山寨幣或碰槓桿，受傷會更重。
          </p>
          <p>
            當一個創作者過去講準過很多事、又非常自信，觀眾很容易把他的結論當成更高信心的訊號，包括那些風險很大、目標價給得很滿、把 bull case 講得像 base case 在敘述的部分。
          </p>
          <p>
            他容易出問題的地方也很明顯。確定感太強，不太把「我可能看錯」放上檯面。某些山寨幣的目標價講得太滿。嘴上講 DCA，但頻道一路看下來實際在做的更像抄底。對批評者常用「level 不夠的人沒資格 judge」直接排除。
          </p>
          <p>
            最後一個自己也常有，很多批評也真的是雜訊。但說話的人 level 夠不夠，跟觀點本身對不對，還是兩件事。
          </p>
          <p>
            我比較在意的還有他常常會走到陰謀論。理論本身意識形態強，又少數據佐證，所以容易把市場上發生的事都解成「有人在主導」「主流故意打壓」這類論述。感染力多半來自這個，風險也是。
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
            他自己檢查別人時的標準其實很好：公開替一個東西背書，就要對結果有交代。這把尺沒有問題，只是同一把尺也適用於自己的公開發言。
          </p>
          <p>
            還有個比較結構性的觀察是會員內容。公開影片講的多半是通用而穩健的原則：別開槓桿、留現金流、定投。會員內容要撐起付費的稀缺感，反而更容易走向具體點位、機構意圖、高確信的預測。
          </p>
          <p>
            這不見得是刻意的：市場不會每天長出真正稀缺的洞見，但會員每天都要收到「只有這裡聽得到」的東西，推測就會被講得越來越具體。
          </p>
          <p>
            我現在的用法剛好反過來：公開的通用原則參考權重高一點，越像私藏預測的內容，權重越低。
          </p>
          <p>
            而且 D 大也不是單一案例。接收幣圈內容久了，bias 會越來越堆積，那些 KOL 的世界觀會慢慢變成自己的判斷。
          </p>
          <div className="my-6 rounded-xl border border-warm/30 bg-warm/5 px-6 py-5">
            <p className="text-text">
              現在回頭看，這些特質在牛市裡幾乎都很討喜：講得很滿像有遠見、不理批評像不受雜音影響、一路抱著 thesis 像有耐心。行情反過來，才會發現同一套東西也可能只是不認錯。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="web3-distance">JAM Protocol</Heading>
          <p>
            我有一段時間很投入 Web3 和 JAM Protocol，平常就是寫程式、看設計、跟一群人討論協議怎麼推進，期間領的報酬也一直是 token。
          </p>
          <p>
            那段時間碰到很多很認真的工程師和協議設計者，看著大家一點點把願景做出來，很難不被那個氛圍感染。
          </p>
          <p>
            當時也沒想那麼深，就是被那個氛圍影響著。回頭看才比較看清楚這個現象：<strong>近距離讓人看得更清楚，也讓人更難保持距離。</strong>你會更懂技術、更懂設計、更懂他們在解決什麼問題；但同時也更難對它的價格保持中立。市場定價並不在獎勵真誠或技術美感本身。
          </p>
          <p>
            問題是，技術價值、團隊的努力和市場報酬從來不會自動對上。願景也許最後真的會實現，但當下市場就是不看它。
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
            D 大的這些特質也不是他獨有。<strong>牛市很容易把一個人的風格全部解讀成優點，等劇本逆風，原本的魅力才會露出風險。換個平行時空，他也可能真的被封神。</strong>
          </p>
          <p>
            價格一漲，原本的看法就像被驗證，語氣會越來越有底氣，觀眾和流量也跟著進來。這個循環不分優缺點，什麼都一起放大。人未必變了，市場變了而已。
          </p>
          <p>
            這也不只發生在幣圈。台股、半導體、AI、黃金，任何正在大漲的市場都會冒出一批看起來很神的人。但很多時候順序是反的：不是故事先成立，所以價格漲。而是價格先漲，然後大家才開始替它補故事。
          </p>
          <p>
            事後算誰看錯也是一種偏見。如果 alt season 真的完整演出，D 大現在大概會被當成又一次驗證眼光的人。過去很多標的如果太早賣掉就會賣飛，過去在 MU、TSM、PLTR、AMD 這些後來大漲的股票上也都太早出場過。
          </p>
          <p>
            但現實是，這一年他主要的幾個觀點幾乎都走反方向；再拉長時間看劇本可能又不一樣，這也是平行時空的另一種可能。
          </p>
          <p>
            所以比較公平的評價方式，是回到當時已有的資訊：那個判斷合不合理、風險有沒有被講出來、倉位允不允許看錯。只用最後的漲跌打分數，對誰都不準。
          </p>
          <p>
            這跟德州撲克的邏輯一樣：贏一手不代表打法對，輸一手不代表決策錯。D 大是前職業德撲選手，這套思路他講起來特別有說服力；自己也打過一段時間德撲，最高大概穩定打到 NL25，深感投資市場跟德撲有很多相似之處。
          </p>
          <p>
            但兩者差在德撲一手會結束，逼你看著結果想下一手，投資沒有這個明確的結算點，於是不認錯的特質很容易把錯誤展延很久。
          </p>
          <p>
            這波罵 D 大的人也不一定比較高明。長期敘事派、合約交易派、攻擊型 KOL，每一種風格都有自己的死法。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="prediction-leverage">預測也是一種槓桿</Heading>
          <p>
            KOL 不需要真的開槓桿。公開發表一個強烈預測，本身就在槓桿化他的聲譽：講得越具體、語氣越確定，猜中的時候回報越大，舊影片會被反覆截圖，變成「早就看懂」的證據，流量、會員、話語權都跟著進來。
          </p>
          <p>
            但這種槓桿跟金融槓桿有個關鍵差別：<strong>沒有強制平倉。</strong>看錯的時候，時間尺度可以拉長、預測可以改寫成長期 thesis、可以歸因給黑天鵝或有人操控，或者用新內容蓋過去，只留下看對的那些。金融槓桿看錯會被清算；聲譽槓桿看錯，多半只是折損一部分信用。
          </p>
          <p>
            不對稱的地方在於，觀眾可能真的照著調了倉位。創作者付出的是信用，觀眾付出的是真金白銀。
          </p>
          <p>
            這不是說有觀點就有罪。有價值的分析本來就需要立場，真正的問題出在 bull case 被講成 base case、假設沒交代、看錯了沒有回顧。願意把「這裡我可能看錯」講出來的預測，才是能拿來用的預測。
          </p>
          <p>
            另一頭，也有一批很少表態的創作者，主要整理新聞、翻譯公告，不太給方向。這種風格常被當成比較中立，但其實是另一種安全牌：犯大錯的機率低、不容易被追究，同時提供的決策價值跟可驗證性也低。
          </p>
          <p>
            而且選擇報哪些新聞、標題怎麼下，本身還是有立場，「我只是分享」有時候只是把立場藏得比較深。
          </p>
          <p>
            一種人把自己的判斷槓桿化，一種人靠不表態降低被檢驗的風險。方向感跟篩選效率都有用，也都有各自的盲點。
          </p>
          <div className="my-6 rounded-xl border border-warm/30 bg-warm/5 px-6 py-5">
            <p className="text-text">
              我現在看內容比較在意的只剩一件事：他能不能讓我分得出來，哪些是事實、哪些是他的推論、哪些是行動建議，以及哪些地方連他自己也不確定。
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <Heading id="diversify">從信念回到配置</Heading>
          <p>
            回頭看，我會被這三種東西影響，理由其實都很普通。
          </p>
          <div className="my-6 rounded-xl border border-warm/30 bg-warm/5 px-6 py-5">
            <p className="text-text">
              D 大講得有道理又有成績；JAM 是自己真的下去做，看得到願景和投入；Google RSU 則是因為公司、產品和裡面的人都太熟。熟悉和相信都是真的，但還不足以讓倉位失衡。
            </p>
          </div>
          <p>
            我以前很容易把「我真的相信這個」直接翻成「我該重壓這個」。現在看，兩件事中間其實還差很多。
          </p>
          <p>
            現在比較相信的處理方式，是回到整體配置，不再死盯單一倉位的浮盈浮虧。
          </p>
          <p>
            不過仔細想想，抱上抱下這麼久了，也不需要因為這一波就突然改策略；動作做太大，反而會是帶情緒的行為。
          </p>
          <p>
            本來執行很久的高 variance 策略不需要大改，本業跟資產實力本來就有拉高 beta、用一些槓桿的空間。可以做的是讓整體資產 coverage 提高一點；但合約、重倉山寨這些，肯定不會碰。
          </p>
          <p>
            我現在更怕的是，為了一個相信的故事，把部位做得太激進。仍然相信 crypto 有未來，半年或一年後也許又是黑夜過去、海闊天空的新風景；但這不代表要用山寨幣或幣圈股票重壓這個信念。
          </p>
          <p>
            看好 AI 也一樣，不代表要把倉位都堆到最高 beta 的衍生品。連現在追在半導體高點，都很難說一年後的劇本會長成什麼樣；同樣的 trap，換個敘事就會再來一次。
          </p>
          <p>
            另外，我也不想再只是接收別人的結論。外部資訊看完、討論過，最後還是得整理成自己真的理解、也願意負責的一套。
          </p>
          <p>
            信念跟倉位中間，還有資產性質、比例、價格、時機這幾道過濾。少了任何一道，信念越強，倉位越危險。
          </p>
          <p>
            這樣做一定會錯過一些極端 upside，但我可以接受少賺一點，換部位不至於一次被打穿。
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
