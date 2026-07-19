import type { Metadata } from "next";
import FeedbackForm from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback | 花雪 HanaYukii",
  description: "想聊文章、幫忙糾錯或打個招呼，都可以從這裡留言。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Feedback() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-3 text-4xl font-bold tracking-tight">Feedback</h1>
      <p className="mb-10 text-text-muted leading-relaxed">
        想糾錯、聊文章，或只是打個招呼都可以。訊息會直接寄到我的信箱，只有我看得到；想公開討論的話，歡迎走 GitHub 或直接 email。
      </p>
      <FeedbackForm />
    </div>
  );
}
