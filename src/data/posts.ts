export type Post = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  tagStyle: string;
  href: string | null;
  hot?: boolean;
};

// tagStyle convention:
//   bg-primary/10 text-primary  →  technical writeups (CP, C++, SWE, Web3, system design)
//   bg-accent/10 text-accent    →  personal essays / life / career narratives

export const posts: Post[] = [
  {
    title: "C++20 的 std::span 應用整理",
    date: "2026-06-10",
    summary:
      "std::span 把 vector、array、指標加長度收成同一個介面：基本用法、subspan 切片、static extent，還有 span<const T> 跟 const span<T> 不是同一回事的坑。",
    tags: ["C++", "C++20"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cpp-span",
  },
  {
    title: "在晴朗的風裡翻頁 — TEAM SHACHI 最終曲「晴れ晴れ」",
    date: "2026-05-27",
    summary:
      "youth case 寫給 TEAM SHACHI 的畢業曲〈晴れ晴れ〉。寫給曾經一起走過一段路的人，關於離別，也關於離別之後。",
    tags: ["Idol", "Live", "Life"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/shachi-harebare",
  },
  {
    title: "聊聊 C++20 的 std::format",
    date: "2026-05-26",
    summary:
      "std::format 格式語法速記：對齊寬度、浮點數的 precision 與 type，還有 precision 在浮點數跟字串上語義不同的坑。",
    tags: ["C++", "C++20"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cpp-format",
  },
  {
    title: "TEAM SHACHI —「マジ感謝」歌詞翻譯",
    date: "2026-05-25",
    summary:
      "TEAM SHACHI「マジ感謝」歌詞翻譯與心得。為什麼這首歌在解散、畢業、最後一場 Live 幾乎是無敵的存在。",
    tags: ["Idol", "Life"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/maji-kansha",
  },
  {
    title: "ukka Final Chapter — 我認識的 ukka，從一開始就是最後一年",
    date: "2026-05-25",
    summary:
      "看完 ukka 最後一場 live 後的感想。我認識的 ukka，從一開始就是最後一年；最遺憾的不是解散，而是剛開始喜歡，就發現已經是最後一章。",
    tags: ["Idol", "Live", "Life"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/ukka-final-chapter",
  },
  {
    title: "推し清單 — 現在跟以前推過的偶像",
    date: "2026-05-25",
    summary:
      "從 Stardust 起點，到現在主要在追、已解散的推、以前喜歡偶爾看、觀望中的團。成員名以代表色標示。",
    tags: ["Idol", "Life"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/oshi-list",
  },
  {
    title: "高嶺のなでしこ — 生きてりゃいい 歌詞翻譯",
    date: "2026-05-14",
    summary:
      "高嶺のなでしこ「生きてりゃいい」歌詞翻譯。エースコック はるさめキャンペーン主題曲，shito・中西作詞作曲，HoneyWorks 編曲。",
    tags: ["Idol", "takaneko"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/takaneko-ikite-ryaii",
  },
  {
    title: "文件在 AI 時代的價值",
    date: "2026-05-03",
    summary:
      "以前文件常常像成本；現在它可能是讓 AI、團隊、未來的自己都更快進入 context 的介面。AI 時代不是讓文件變得不重要，而是讓文件的價值被放大。",
    tags: ["Software Engineering", "AI"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/documentation-ai-era",
  },
  {
    title: "AtCoder ABC 456 F Plan Holidays",
    date: "2026-05-03",
    summary:
      "把買假日問題轉成最大不相鄰省略和，並用線段樹「左右端狀態相依」模式維護動態查詢。順便整理 max subarray sum 同模式的對照。",
    tags: ["Competitive Programming", "Segment Tree"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/abc456f-plan-holidays",
  },
  {
    title: "牛市放大效應與 KOL",
    date: "2026-05-02",
    summary:
      "牛市會把一個人的魅力放大成神，熊市才會把同樣的特質放大成風險。從 D 大、反 D 大的人、其他 KOL 類型,到我自己對配置跟少賺的反思。",
    tags: ["Life", "投資"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/kol-bull-market-amplifier",
  },
  {
    title: "各大 Online Judge 介紹",
    date: "2026-04-29",
    summary:
      "從台灣的 ZeroJudge、TIOJ 到 Codeforces、AtCoder、LeetCode，主流 OJ 的特色、適合誰、怎麼用。給想入坑 CP 或不知道往哪邊練的人。",
    tags: ["Competitive Programming"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/online-judge-guide",
    hot: true,
  },
  {
    title: "Cursor Teams 年繳踩雷紀錄",
    date: "2026-04-29",
    summary:
      "公司用 Cursor Teams 年繳遇到的 seat billing 爭議：email rotation 被當成新增 seat，已付費 seat 沒人能用卻繼續被收錢。簡短紀錄一下。",
    tags: ["雜談", "SaaS"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/cursor-billing-dispute",
  },
  {
    title: "LeetCode 2463 Minimum Total Distance Traveled",
    date: "2026-04-15",
    summary:
      "直觀的二維匹配 DP，但轉移的實作不太直觀。每日一題的好題。",
    tags: ["Algorithm", "DP"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/lc-2463",
  },
  {
    title: "我的競賽程式生涯回顧",
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
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/lc-wc497-q4",
  },
  {
    title: "區塊鏈日報 RESET 活動心得",
    date: "2026-04-12",
    summary:
      "去年我是粉絲，今年我換了角度。一場心理成長活動背後的包裝、銷售設計，以及我自己的反思。",
    tags: ["Life", "觀察"],
    tagStyle: "bg-accent/10 text-accent",
    href: "/blog/reset-influence-analysis",
  },
  {
    title: "CF2217F Interval Game",
    date: "2026-04-08",
    summary:
      "Nim + XOR 加法恆等式 + Digit DP。把區間博弈轉成 Nim，再用代數轉換拆解 counting。",
    tags: ["Competitive Programming", "Game Theory"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cf2217f",
  },
  {
    title: "2025 偶像現場全紀錄",
    date: "2026-04-08",
    summary:
      "意外回歸星塵的一年，感謝各種現場的相遇與告別。從桃草到蝦中、從虎魚組到高嶺のなでしこ，2025 年的偶像現場紀錄。",
    tags: ["Life", "Idol"],
    tagStyle: "bg-accent/10 text-accent",
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
    tagStyle: "bg-accent/10 text-accent",
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
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cpp-compile-time-optimization",
  },
  {
    title: "SSO 跟 Copy Elision：編譯器與標準庫做的事",
    date: "2026-03-31",
    summary:
      "std::string 不一定用 heap？return 時加 std::move 反而更慢？拆解編譯器與標準庫在背後做的事。",
    tags: ["C++", "Performance", "Memory"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cpp-secret-optimizations-1",
  },
  {
    title: "Padding、Vtable、Smart Pointer 的成本",
    date: "2026-03-31",
    summary:
      "sizeof 不是你想的那樣、virtual 讓物件膨脹 4 倍、shared_ptr 的隱藏原子操作代價。",
    tags: ["C++", "Performance", "Memory"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cpp-secret-optimizations-2",
  },
  {
    title: "手寫 inplace_vector（C++ 面試題）",
    date: "2026-03-31",
    summary:
      "世界頂級量化交易公司的面試，面試官劍橋畢業，從零實作 inplace_vector：aligned storage、placement new、Rule of Five。",
    tags: ["C++", "C++26", "Interview"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cpp-inplace-vector",
  },
  {
    title: "HFT 面試的六道 C++ 效能題",
    date: "2026-03-31",
    summary:
      "我親身參與的某知名 Crypto / HFT 公司 C++ 面試，涵蓋 string 傳遞、lambda 捕獲、Order Book 設計等六道效能分析題。",
    tags: ["C++", "Interview", "HFT"],
    tagStyle: "bg-primary/10 text-primary",
    href: "/blog/cpp-interview-performance-analysis",
  },
  // ───── Drafts ─────
  {
    title: "系統設計面試的注意事項",
    date: "",
    summary:
      "以 Auto-complete 為案例，整理系統設計面試中常見的思路：需求分析、狀態設計、Debounce、快取策略、Accessibility。",
    tags: ["System Design", "Interview"],
    tagStyle: "bg-primary/10 text-primary",
    href: null,
  },
  {
    title: "財務自由是不是假議題",
    date: "",
    summary:
      "明知道這輩子不需要太擔心，卻停不下來想捲。科技圈的投資焦慮、亞洲文化的匱乏感，跟那個永遠不夠的數字。",
    tags: ["Life", "Career"],
    tagStyle: "bg-accent/10 text-accent",
    href: null,
  },
  {
    title: "如果人生可以 A/B Test",
    date: "",
    summary:
      "人過度美化自己沒選的路，也過度合理化已選的路。但真相是你永遠跑不了對照組。",
    tags: ["Life", "Personal"],
    tagStyle: "bg-accent/10 text-accent",
    href: null,
  },
  {
    title: "什麼叫做強",
    date: "",
    summary:
      "CP 的強、工程的強、職場的強，不同維度的定義跟我自己的體會。",
    tags: ["Career", "Personal"],
    tagStyle: "bg-accent/10 text-accent",
    href: null,
  },
];

export const hotPosts = posts
  .filter((p) => p.hot)
  .sort((a, b) => a.date.localeCompare(b.date));
export const recentPosts = posts.filter((p) => !p.hot && p.href);
