import FadeIn from "@/components/FadeIn";

export default function Tutoring() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          Algorithm Tutoring
        </h1>
        <p className="mb-10 text-lg text-text-muted">
          演算法、競賽、面試準備。教學相長，也希望認識更多厲害的人。
        </p>
      </FadeIn>

      {/* Background */}
      <section className="mb-12">
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold">背景</h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <ul className="space-y-2 text-sm text-text-muted">
              <li>ICPC Gold、Codeforces IM、LeetCode ~2800</li>
              <li>Ex-Google Cloud Infrastructure，3 年 C++ backend 經驗</li>
              <li>現役選手，持續參與主流 OJ contest</li>
              <li>有幾年教學經驗，教過從高中競賽到業界面試準備</li>
            </ul>
          </div>
        </FadeIn>
      </section>

      {/* What I Teach */}
      <section className="mb-12">
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold">教學內容</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <ul className="space-y-3 text-text-muted">
              {[
                {
                  title: "資料結構 & 演算法",
                  desc: "基礎到進階，segment tree、graph、DP optimization 等",
                },
                {
                  title: "ICPC / 競賽準備",
                  desc: "練習方法、讀題技巧、時間分配",
                },
                {
                  title: "面試準備",
                  desc: "LeetCode 常見題型、面試變化題 follow up、解題思路",
                },
                {
                  title: "C++ for CP",
                  desc: "STL、實作習慣、讓 contest code 更快更乾淨的細節",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">&#10003;</span>
                  <span>
                    <strong className="text-text">{item.title}</strong> -{" "}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </section>

      {/* Student Achievements */}
      <section className="mb-12">
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold">過去學生成果</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <ul className="space-y-2 text-sm text-text-muted">
              <li>學生入選 TOI 國手選訓營</li>
              <li>多位學生透過特殊選才錄取清大、交大</li>
              <li>學生拿到 Google、Microsoft 等公司 offer</li>
            </ul>
          </div>
        </FadeIn>
      </section>

      {/* Contact */}
      <FadeIn>
        <section className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm text-center">
          <p className="mb-4 text-text-muted">
            有興趣的話跟我聊聊你目前的程度跟目標，我可以很快判斷適不適合、怎麼安排。
          </p>
          <a
            href="mailto:islu245777@gmail.com"
            className="inline-block rounded-lg border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Contact Me
          </a>
        </section>
      </FadeIn>
    </div>
  );
}
