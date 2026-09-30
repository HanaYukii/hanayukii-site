import ArticleHeader from "@/components/ArticleHeader";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/cpp-atomic-relaxed";
const title = "C++ atomic 用法入門";
const description =
  "從多人加同一個計數器開始，認識 atomic、load、store 與 fetch_add，再比較 relaxed 計數和 release／acquire 交接資料。";

export const metadata: Metadata = articleMetadata(href, {
  title: `${title} | 花雪 HanaYukii`,
  description,
  openGraph: { title, description, type: "article" },
});

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 scroll-mt-20 text-2xl font-bold text-warm">
      {children}
    </h2>
  );
}

export default function CppAtomicRelaxed() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <PostJsonLd href={href} />
      <FadeIn>
        <ArticleHeader href="/blog/cpp-atomic-relaxed" />
      </FadeIn>

      <div className="prose-custom space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
        <FadeIn>
          <p>
            多個執行緒共用一個計數器時，普通的 <code>count++</code> 不能直接拿來用。
            先認識 <code>std::atomic</code> 怎麼處理這件事，再看什麼時候能用 relaxed。
          </p>
          <figure className="my-8 grid items-center gap-5 rounded-lg border border-border bg-surface/40 p-4 sm:grid-cols-[240px_1fr]">
            <video
              controls
              playsInline
              preload="none"
              poster="/media/atomic-intro-preview/atomic-intro-v2-poster.png"
              aria-label="C++ atomic 用法入門動畫"
              className="mx-auto max-h-[70svh] w-full rounded-md bg-[#0b101b] sm:max-h-none"
              style={{ aspectRatio: "9 / 16" }}
            >
              <source src="/media/atomic-intro-preview/atomic-intro-v2.mp4" type="video/mp4" />
              <track kind="captions" src="/media/atomic-intro-preview/atomic-intro-v2.vtt" srcLang="zh-TW" label="繁體中文" />
              瀏覽器不支援影片，可閱讀下方相同主題的圖文說明。
            </video>
            <figcaption>
              <p className="mb-2 text-sm text-primary">動畫講解 · 2 分 30 秒</p>
              <p className="text-base leading-relaxed text-text">用計數器與資料交接動畫，整理 atomic、relaxed 和 release／acquire 的差別。</p>
              <p className="mt-3 text-sm text-text-muted">無配音，搭配字幕與輕音樂，可自行靜音。點播放才會載入影片，完整程式碼在下方。</p>
            </figcaption>
          </figure>
          <Heading id="atomic">基本操作</Heading>
          <p>
            加一包含「讀取、加一、寫回」。假設 count 原本是 0，兩個執行緒都先讀到 0，
            各自算出 1 再寫回，就可能把兩次加一算成一次。
            這只是幫助理解衝突的示意；C++ 普通變數這樣讀寫會有 data race（資料競爭），
            屬於未定義行為，結果不只可能少算。
          </p>
          <p>
            <code>std::atomic&lt;int&gt;</code> 提供原子操作：對同一個 atomic 的其他原子操作來說，
            一次操作不可分割。讀取不會拼到一半新值、一半舊值；原子加法也不會因為同時加一而漏算。
          </p>
          <Code lang="cpp">{`#include <atomic>

int main() {
    std::atomic<int> count{0};
    count.store(10);             // 原子寫入：設成 10
    int value = count.load();    // 原子讀取：讀到 10
    int old = count.fetch_add(1); // 原子加一：變成 11，回傳舊值 10
    ++count;                    // 也是原子加一：變成 12
    // 此處依序執行，沒有其他執行緒同時修改。
}`}</Code>
          <p>
            <code>fetch_add(1)</code> 把讀取、加一、寫回合成一次原子操作。
            若寫成 <code>count.store(count.load() + 1)</code>，雖然讀寫各自都是原子的，
            中間仍可能被其他執行緒插入更新，多個 writer 就可能漏算。這次沒有 count 本身的 data race，
            但邏輯仍然錯了。
          </p>
          <Heading id="ordering">記憶體順序</Heading>
          <p>
            atomic 管的是這個值的存取；記憶體順序還決定能不能透過它同步其他資料。
            不填參數時預設是 <code>memory_order_seq_cst</code>。先用預設寫對，
            確認只需要這個 atomic 值本身時，再考慮 <code>memory_order_relaxed</code>。
          </p>
          <p>
            一個執行緒更新封包數 rx，另一個每 10 ms 讀一次做監控。
            只有一個 writer，能把 <code>std::atomic&lt;uint64_t&gt;</code> 換成普通的 <code>uint64_t</code> 嗎？
          </p>
          <p>
            不能直接換。不同執行緒讀寫同一個普通變數，沒有鎖或其他同步，
            就會有 data race，造成未定義行為。
            <strong>只有一個 writer、讀得很少，都不能取代同步。</strong>
          </p>
          <p>
            不過，若 rx 只拿來顯示統計數字，保留 atomic、搭配 <code>memory_order_relaxed</code> 就夠了。
            差別要看讀完它之後做什麼。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="counter">只讀計數：relaxed 就夠</Heading>
          <p>把收封包簡化成加 1000 次，監控也只讀一次。以下兩個程式都可以用 C++11 以上編譯。</p>
          <Code lang="cpp">{`#include <atomic>
#include <iostream>
#include <thread>

int main() {
    std::atomic<int> count{0};

    std::thread worker([&] {
        for (int i = 0; i < 1000; ++i)
            count.fetch_add(1, std::memory_order_relaxed);
    });

    std::thread monitor([&] {
        std::cout << count.load(std::memory_order_relaxed) << '\\n';
    });

    worker.join();
    monitor.join();
    std::cout << count.load(std::memory_order_relaxed) << '\\n';
}`}</Code>
          <p>
            第一行可能是 0～1000，取決於讀到哪次更新；第二行一定是 1000，
            因為主執行緒已經透過 <code>join()</code> 等 worker 結束並完成同步。
          </p>
          <p>
            relaxed 保留每次操作的原子性，讀寫 count 本身不會有 data race。
            monitor 只拿這個值來印，沒有藉它判斷其他資料能不能讀，因此不需要用它交接其他資料。
            但 relaxed 沒有「幾毫秒內一定讀到最新值」的保證。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="publication">看到完成旗標，才讀報告：需要同步</Heading>
          <Code lang="cpp">{`#include <atomic>
#include <iostream>
#include <string>
#include <thread>

int main() {
    std::string report;
    std::atomic<bool> done{false};

    std::thread worker([&] {
        report = "result: 42";
        done.store(true, std::memory_order_release);
    });

    std::thread viewer([&] {
        while (!done.load(std::memory_order_acquire)) { }
        std::cout << report << '\\n';
    });

    worker.join();
    viewer.join();
}`}</Code>
          <p>
            viewer 讀 done，是為了接著讀 <strong>另一份資料 report</strong>。
            當 acquire 讀到這次 release 寫入的 true，兩邊就建立同步關係：
          </p>
          <Code lang="text">{`寫 report
    → release 寫入 true
    → acquire 讀到這個 true
    → 讀 report`}</Code>
          <p>
            這條關係保證 report 的寫入 happens-before（先行於）它的讀取。
            此例只交接一次，worker 發出訊號後也不再修改 report，所以可以安全讀取。
            空迴圈是為了凸顯交接；長時間等待時可改用 condition_variable 等阻塞機制。
          </p>
          <p>
            若把這裡的 release 和 acquire 都改成 relaxed，done 本身仍然安全，
            但 report 的讀寫失去同步，會有 data race。這是<strong>未定義行為</strong>，
            不能只當成「偶爾印出空字串」。主執行緒最後的兩次 join，也補不了 worker 與 viewer 之間缺少的交接。
          </p>
          <p>
            省略記憶體順序參數也能讓這個例子正確：<code>done.store(true)</code> 和 <code>done.load()</code>{" "}
            預設使用 <code>memory_order_seq_cst</code>，已包含這裡需要的 release／acquire 保證。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="meaning">relaxed 會改變行為嗎？</Heading>
          <p>
            它會放寬程式要求的記憶體順序保證。上面的完成旗標改用 relaxed，
            就會從正確程式變成有 data race 的程式，所以它有實際語意。
          </p>
          <p>
            但不保證比較快。同一個 atomic 操作在某些平台上，relaxed 和預設順序可能產生相同機器碼；
            能省下多少排序成本，要看編譯器、CPU 和操作種類。
          </p>
          <p>
            relaxed 的值仍然會給其他執行緒用，第一個例子的 monitor 就在用。
            它沒有提供的是：<strong>只憑看見這個值更新，就推論其他資料也已經可以讀。</strong>
          </p>
          <p>
            回到 rx：只顯示「收到 100 包」，可以用 relaxed。
            如果看到 rx == 100 就去讀第 100 包的內容，便需要另外建立資料交接的同步。
            這是判斷這兩類用途的起點；複雜的多變數演算法仍要逐一確認順序需求。
          </p>
        </FadeIn>

        <FadeIn>
          <Heading id="references">參考</Heading>
          <p>
            C++ 標準草案：{" "}
            <a className="prose-link" href="https://eel.is/c++draft/intro.races">data race 與 happens-before</a>
            、<a className="prose-link" href="https://eel.is/c++draft/atomics.order">atomic 記憶體順序</a>
            、<a className="prose-link" href="https://eel.is/c++draft/thread.thread.member">join 的同步保證</a>
            、<a className="prose-link" href="https://eel.is/c++draft/atomics.types.operations">load／store 的預設順序</a>。
          </p>
        </FadeIn>
      </div>
      <RelatedPosts href={href} />
    </article>
  );
}
