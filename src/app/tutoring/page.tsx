import FadeIn from "@/components/FadeIn";

export default function Tutoring() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          Algorithm Tutoring
        </h1>
        <p className="mb-10 text-lg text-text-muted">
          演算法、競賽、面試準備，有多年教學跟實戰經驗。
        </p>
      </FadeIn>

      {/* Why Me */}
      <section className="mb-12">
        <FadeIn>
          <h2 className="mb-4 text-2xl font-bold">Why Me</h2>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: "🏅",
              title: "ICPC Gold Medalist",
              desc: "ICPC 金牌、Codeforces IM (2350)、LeetCode ~2800。",
            },
            {
              icon: "🏢",
              title: "Ex-Google · 3 yr",
              desc: "Google Cloud Infrastructure，C++ backend，有業界實戰經驗。",
            },
            {
              icon: "📊",
              title: "現役選手",
              desc: "到現在還在打比賽，題目跟趨勢都有在跟。",
            },
            {
              icon: "🎓",
              title: "多年教學經驗",
              desc: "教過的學生拿過 TOI 選訓營、特殊選才、Google / Microsoft offer。",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="rounded-xl border border-border bg-surface/40 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover">
                <div className="mb-2 text-2xl">{item.icon}</div>
                <h3 className="mb-1 font-bold">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
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
                  desc: "LeetCode 常見題型、面試陷阱、解題思路",
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
          <h2 className="mb-4 text-2xl font-bold">學生成果</h2>
          <div className="rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
            <div className="space-y-4">
              {[
                {
                  icon: "🏆",
                  title: "TOI 選訓營",
                  desc: "學生入選國手選訓營",
                },
                {
                  icon: "🎓",
                  title: "特殊選才",
                  desc: "多位學生透過特殊選才錄取清大、交大",
                },
                {
                  icon: "💼",
                  title: "Big Tech Offers",
                  desc: "學生拿到 Google、Microsoft 等公司 offer",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg">{item.icon}</span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <FadeIn>
        <section className="rounded-xl bg-gradient-to-r from-sky via-primary to-accent p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">有興趣的話</h2>
          <p className="mb-6 text-white/80">
            跟我說你目前的程度跟目標，我可以很快判斷適不適合、怎麼安排。
          </p>
          <a
            href="mailto:islu245777@gmail.com"
            className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-bg shadow-md transition-colors hover:bg-white/90"
          >
            Contact Me
          </a>
        </section>
      </FadeIn>
    </div>
  );
}
