"use client";

import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export type Risk = {
  id: string;
  title: string;
  severity: "medium" | "high";
  description: string;
  mitigation: string;
};

const severityMap: Record<
  Risk["severity"],
  { label: string; color: string; bg: string }
> = {
  medium: {
    label: "Medium",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  high: {
    label: "High",
    color: "text-rose-600",
    bg: "bg-rose-100",
  },
};

type RiskAssessmentProps = {
  risks: Risk[];
};

export function RiskAssessment({ risks }: RiskAssessmentProps) {
  const [openRisk, setOpenRisk] = useState<string | null>(risks[0]?.id ?? null);

  return (
    <section
      aria-labelledby="risk-heading"
      className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <h2 id="risk-heading" className="text-lg font-semibold text-slate-900">
          Risk Assessment
        </h2>
        <p className="text-sm text-slate-500">
          Expand each scenario to review looming downside catalysts and
          mitigation cues.
        </p>
      </div>
      <div className="mt-6 space-y-4">
        {risks.map((risk) => {
          const meta = severityMap[risk.severity];
          const isOpen = openRisk === risk.id;
          return (
            <article
              key={risk.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/60 transition hover:border-teal-200 hover:bg-white focus-within:border-teal-300"
            >
              <button
                type="button"
                onClick={() => setOpenRisk(isOpen ? null : risk.id)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus-visible:ring-4 focus-visible:ring-teal-200"
                aria-expanded={isOpen}
                aria-controls={`risk-panel-${risk.id}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full ${meta.bg}`}
                  >
                    <FiAlertTriangle className={`text-xl ${meta.color}`} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {risk.title}
                    </p>
                    <span
                      className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${meta.bg} ${meta.color}`}
                    >
                      {meta.label} risk
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-teal-700">
                  {isOpen ? "Hide" : "Review"}
                </span>
              </button>
              {isOpen && (
                <div
                  id={`risk-panel-${risk.id}`}
                  className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600"
                >
                  <p>{risk.description}</p>
                  <p className="mt-3 font-semibold text-slate-800">
                    Mitigation:{" "}
                    <span className="font-normal text-slate-600">
                      {risk.mitigation}
                    </span>
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
