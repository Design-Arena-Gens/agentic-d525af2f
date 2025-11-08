"use client";

import { useMemo, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type HelpCenterProps = {
  faqs: FaqItem[];
};

export function HelpCenter({ faqs }: HelpCenterProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return faqs.filter((faq) =>
      `${faq.question} ${faq.answer}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [faqs, query]);

  return (
    <section
      aria-labelledby="help-heading"
      className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="help-heading" className="text-lg font-semibold text-slate-900">
            Help & FAQ
          </h2>
          <p className="text-sm text-slate-500">
            Quick answers about coverage, scoring logic, and your account.
          </p>
        </div>
        <label className="flex w-full max-w-xs items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 focus-within:border-teal-400 focus-within:text-teal-700">
          <FiHelpCircle aria-hidden />
          <span className="sr-only">Search help topics</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search help..."
            className="w-full bg-transparent outline-none"
          />
        </label>
      </div>

      <ul className="mt-6 space-y-4">
        {filtered.map((faq) => (
          <li
            key={faq.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              {faq.question}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            No help topics match that search. Try alternative keywords.
          </li>
        )}
      </ul>
    </section>
  );
}
