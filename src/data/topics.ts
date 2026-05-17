export type Topic = {
  /** Canonical tag value; matches `Post.tags` entries and the `/blog?tag=` URL */
  tag: string;
  /** Short label shown in the site footer */
  footerLabel: string;
  /**
   * Optional homepage card content. Topics with `home` defined appear in the
   * "常寫的主題" grid on the homepage.
   */
  home?: {
    label: string;
    summary: string;
  };
};

export const topics: Topic[] = [
  {
    tag: "Competitive Programming",
    footerLabel: "演算法 / CP",
    home: {
      label: "Competitive Programming",
      summary: "演算法、競賽題解、解題思路與訓練回顧。",
    },
  },
  {
    tag: "C++",
    footerLabel: "C++ / 系統",
    home: {
      label: "Systems / C++",
      summary: "效能、記憶體、編譯期技巧與工程面試。",
    },
  },
  {
    tag: "Career",
    footerLabel: "職涯 / 反思",
    home: {
      label: "Career",
      summary: "從 Google 到新創，工作選擇與職涯反思。",
    },
  },
  {
    tag: "投資",
    footerLabel: "投資 / 觀察",
  },
  {
    tag: "Life",
    footerLabel: "生活 / 雜談",
    home: {
      label: "Life",
      summary: "偶像現場、投資觀察、旅行與日常紀錄。",
    },
  },
];

export type FeaturedTopic = Topic & { home: NonNullable<Topic["home"]> };

export const featuredTopics: FeaturedTopic[] = topics.filter(
  (t): t is FeaturedTopic => Boolean(t.home),
);
