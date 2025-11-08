"use client";

import { FiArrowUpRight, FiInfo, FiMinus, FiSmile } from "react-icons/fi";
import { IconType } from "react-icons";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  source: string;
  time: string;
  category: "news" | "sentiment" | "filing";
};

const sentimentMap: Record<
  NewsItem["sentiment"],
  { label: string; color: string; Icon: IconType }
> = {
  positive: {
    label: "Positive",
    color: "text-emerald-600 bg-emerald-50",
    Icon: FiSmile,
  },
  neutral: {
    label: "Neutral",
    color: "text-slate-600 bg-slate-100",
    Icon: FiMinus,
  },
  negative: {
    label: "Negative",
    color: "text-amber-600 bg-amber-50",
    Icon: FiInfo,
  },
};

const categoryLabel: Record<NewsItem["category"], string> = {
  news: "Market Update",
  sentiment: "Sentiment Insight",
  filing: "Regulatory Filing",
};

type NewsFeedProps = {
  items: NewsItem[];
};

export function NewsFeed({ items }: NewsFeedProps) {
  return (
    <section
      aria-labelledby="news-feed-heading"
      className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2
            id="news-feed-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Real-time Intelligence Feed
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Consolidated newsroom, sentiment pulses, and filings with source
            transparency.
          </p>
        </div>
        <a
          href="#alerts"
          className="hidden rounded-full border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:border-teal-400 hover:text-teal-600 focus-visible:ring-4 focus-visible:ring-teal-200 md:inline-flex"
        >
          Configure alerts
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const meta = sentimentMap[item.sentiment];
          const CategoryIcon = meta.Icon;

          return (
            <article
              key={item.id}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-teal-200 hover:bg-white focus-within:border-teal-300"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  <FiArrowUpRight aria-hidden className="text-teal-500" />
                  {categoryLabel[item.category]}
                </span>
                <time
                  className="text-xs font-medium text-slate-500"
                  dateTime={item.time}
                >
                  {item.time}
                </time>
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{item.summary}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${meta.color}`}
                >
                  <CategoryIcon aria-hidden />
                  {meta.label}
                </span>
                <span className="text-xs text-slate-500">Source: {item.source}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
