export type Post = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  tagStyle: string;
  href: string | null;
  hot?: boolean;
};

export const posts: Post[] = [
  {
    title: "財務自由是不是假議題",
    date: "",
    summary:
      "明知道這輩子不需要太擔心，卻停不下來想捲。科技圈的投資焦慮、亞洲文化的匱乏感，跟那個永遠不夠的數字。",
    tags: ["Life", "Career"],
    tagStyle: "bg-warm/10 text-warm",
    href: null,
  },
  {
    title: "如果人生可以 A/B Test",
    date: "",
    summary:
      "人過度美化自己沒選的路，也過度合理化已選的路。但真相是你永遠跑不了對照組。",
    tags: ["Life", "Personal"],
    tagStyle: "bg-warm/10 text-warm",
    href: null,
  },
  {
    title: "寫文件為什麼在 AI 時代更重要",
    date: "",
    summary:
      "大家都討厭寫文件，但 AI 時代文件的價值被放大了。你餵給 AI 的 context 越多，它能幫你的就越多。",
    tags: ["Software Engineering", "AI"],
    tagStyle: "bg-primary/10 text-primary",
    href: null,
  },
  {
    title: "各大 Online Judge 介紹",
    date: "",
    summary:
      "Codeforces、LeetCode、AtCoder、TIOJ 等主流 OJ 的差異、適合誰、怎麼用。",
    tags: ["Competitive Programming"],
    tagStyle: "bg-accent/10 text-accent",
    href: null,
  },
  {
    title: "什麼叫做強",
    date: "",
    summary:
      "CP 的強、工程的強、職場的強，不同維度的定義跟我自己的體會。",
    tags: ["Career", "Personal"],
    tagStyle: "bg-warm/10 text-warm",
    href: null,
  },
  {
    title: "LeetCode 2463 Minimum Total Distance Traveled",
    date: "2026-04-15",
    summary:
      "直觀的二維匹配 DP，但轉移的實作不太直觀。每日一題的好題。",
    tags: ["Algorithm", "DP"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/lc-2463",
  },
  {
    title: "多年後的程式競賽選手生涯回憶錄",
    date: "2026-04-14",
    summary:
      "從計概作業太難開始刷題，到 ICPC Gold。你永遠不知道，你的興趣可以把你帶得多遠。",
    tags: ["Competitive Programming", "Personal"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/cp-career-memoir",
    hot: true,
  },
  {
    title: "LeetCode Weekly Contest 497 Q4 Good Subsequence Queries",
    date: "2026-04-12",
    summary:
      "Segment Tree 維護 GCD，分 case 討論。值域限制讓拿掉誰 GCD 都不為 1 只在很小的 n 才可能。",
    tags: ["Competitive Programming", "Number Theory"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/lc-wc497-q4",
    hot: true,
  },
  {
    title: "區塊鏈日報 RESET 活動心得",
    date: "2026-04-12",
    summary:
      "去年我是粉絲，今年我換了角度。一場心理成長活動背後的包裝、銷售設計，以及我自己的反思。",
    tags: ["Life", "觀察"],
    tagStyle: "bg-warm/10 text-warm",
    href: "/blog/reset-influence-analysis",
  },
  {
    title: "系統設計面試的經典注意事項",
    date: "2026-04-11",
    summary:
      "以 Auto-complete 為案例，整理系統設計面試中常見的思路：需求分析、狀態設計、Debounce、快取策略、Accessibility。",
    tags: ["System Design", "Interview"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/system-design-fundamentals",
  },
  {
    title: "CF2217F Interval Game",
    date: "2026-04-08",
    summary:
      "Nim + XOR 加法恆等式 + Digit DP。把區間博弈轉成 Nim，再用代數轉換拆解 counting。",
    tags: ["Competitive Programming", "Game Theory"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/cf2217f",
  },
  {
    title: "2025 偶像現場全紀錄",
    date: "2026-04-08",
    summary:
      "意外回歸星塵的一年，感謝各種現場的相遇與告別。從桃草到蝦中、從虎魚組到高嶺のなでしこ，2025 年的偶像現場紀錄。",
    tags: ["Life", "Idol"],
    tagStyle: "bg-warm/10 text-warm",
    href: "/blog/idol-2025",
  },
  {
    title: "從 Midnight 看隱私鏈技術",
    date: "2026-04-06",
    summary:
      "從零開始理解隱私鏈的核心技術：ZK-SNARKs、雙狀態架構、可程式化隱私，以 Midnight Network (NIGHT) 為例拆解。",
    tags: ["Web3", "Privacy"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/privacy-chain-midnight",
  },
  {
    title: "離開 Google 半年後的轉職紀錄",
    date: "2026-04-06",
    summary:
      "在 Google Cloud 待了三年，我最後選擇裸辭。不是因為壓力太大，而是因為太輕鬆。",
    tags: ["Career", "Personal"],
    tagStyle: "bg-warm/10 text-warm",
    href: "/blog/leaving-google",
    hot: true,
  },
  {
    title: "搞懂 Dependency Injection",
    date: "2026-04-06",
    summary:
      "我想把這個很常被講得很玄的主題講清楚，所以直接用例子拆到夠細。",
    tags: ["Design Pattern", "Software Engineering"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/dependency-injection",
  },
  {
    title: "C++ 編譯期可以做的五件事",
    date: "2026-03-31",
    summary:
      "從 constexpr 到 LUT 生成 - 五個實用的編譯期技巧，把能在編譯期做的事移到編譯期。",
    tags: ["C++", "Performance"],
    tagStyle: "bg-sky/10 text-sky",
    href: "/blog/cpp-compile-time-optimization",
  },
  {
    title: "SSO 跟 Copy Elision：C++ 背後在偷做什麼",
    date: "2026-03-31",
    summary:
      "std::string 不一定用 heap？return 時加 std::move 反而更慢？拆解編譯器與標準庫在背後做的事。",
    tags: ["C++", "Performance", "Memory"],
    tagStyle: "bg-sky/10 text-sky",
    href: "/blog/cpp-secret-optimizations-1",
  },
  {
    title: "Padding、Vtable、Smart Pointer：C++ 的隱藏成本",
    date: "2026-03-31",
    summary:
      "sizeof 不是你想的那樣、virtual 讓物件膨脹 4 倍、shared_ptr 的隱藏原子操作代價。",
    tags: ["C++", "Performance", "Memory"],
    tagStyle: "bg-sky/10 text-sky",
    href: "/blog/cpp-secret-optimizations-2",
  },
  {
    title: "手寫 inplace_vector：一場硬核 C++ 面試",
    date: "2026-03-31",
    summary:
      "世界頂級量化交易公司的面試，面試官劍橋畢業，從零實作 inplace_vector：aligned storage、placement new、Rule of Five。",
    tags: ["C++", "C++26", "Interview"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/cpp-inplace-vector",
  },
  {
    title: "HFT 面試的六道 C++ 效能題",
    date: "2026-03-31",
    summary:
      "我親身參與的某知名 Crypto / HFT 公司 C++ 面試，涵蓋 string 傳遞、lambda 捕獲、Order Book 設計等六道效能分析題。",
    tags: ["C++", "Interview", "HFT"],
    tagStyle: "bg-warm/10 text-warm",
    href: "/blog/cpp-interview-performance-analysis",
  },
];

export const hotPosts = posts.filter((p) => p.hot);
export const recentPosts = posts.filter((p) => !p.hot && p.href);
