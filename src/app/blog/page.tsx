export default function Blog() {
  const posts = [
    {
      title: "Understanding System Design Fundamentals",
      date: "Coming Soon",
      summary:
        "A comprehensive guide to system design interviews and real-world architecture patterns.",
      tags: ["System Design", "Backend"],
    },
    {
      title: "ICPC Preparation Guide: From Zero to Gold",
      date: "Coming Soon",
      summary:
        "My journey and practical tips for competitive programming training and ICPC preparation.",
      tags: ["Competitive Programming", "ICPC"],
    },
    {
      title: "Getting Started with Polkadot JAM Protocol",
      date: "Coming Soon",
      summary:
        "An introduction to the JAM protocol and its role in the Polkadot ecosystem.",
      tags: ["Web3", "Polkadot"],
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mb-10 text-text-muted">
        Technical articles on algorithms, systems, and more.
      </p>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
            <p className="mb-2 text-sm leading-relaxed text-text-muted">
              {post.summary}
            </p>
            <p className="text-xs text-text-muted">{post.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
