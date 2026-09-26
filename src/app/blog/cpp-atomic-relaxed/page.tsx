import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";
import PostJsonLd from "@/components/PostJsonLd";
import RelatedPosts from "@/components/RelatedPosts";
import { articleMetadata } from "@/lib/seo";

const href = "/blog/cpp-atomic-relaxed";
const title = "C++ memory_order_relaxed：計數器與完成旗標的差別";
const description =
  "用兩個有執行緒的小例子理解 relaxed：只讀統計數字，和看到完成旗標後讀另一份資料，需要的保證有什麼不同？";

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
        <Link href="/blog" className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary">
          &larr; Back to Blog
        </Link>
        <div className="mb-4 flex flex-wrap gap-2">
          {["C++", "Concurrency"].map((tag) => (
            <span key={tag} className="tag text-xs font-medium text-primary">{tag}</span>
          ))}
        </div>
        <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
        <p className="mb-8 text-sm text-text-muted">2026-09-27</p>
      </FadeIn>

      <div className="prose-custom space-y-4 leading-relaxed text-text-muted [&_strong]:text-text">
        <FadeIn>
          <p>
            一個執行緒更新封包數 rx，另一個每 10 ms 讀一次做監控。
            只有一個 writer，能把 <code>std::atomic&lt;uint64_t&gt;</code> 換成普通的 <code>uint64_t</code> 嗎？
          </p>
          <p>
            不能直接換。不同執行緒讀寫同一個普通變數，沒有鎖或其他同步，
            就會有 data race（資料競爭），造成未定義行為。
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
