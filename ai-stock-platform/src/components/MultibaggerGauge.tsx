"use client";

import { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Factor = {
  name: string;
  weight: number;
  description: string;
  score: number;
};

type MultibaggerGaugeProps = {
  score: number;
  factors: Factor[];
};

export function MultibaggerGauge({ score, factors }: MultibaggerGaugeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative flex h-64 w-64 shrink-0 items-center justify-center rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="gauge-breakdown"
      >
        <span className="sr-only">
          Multibagger potential score {score} out of 100. Click to view
          contributing factors.
        </span>
        <CircularProgressbarWithChildren
          value={score}
          maxValue={100}
          styles={buildStyles({
            pathColor: "#008080",
            trailColor: "#e2e8f0",
            textColor: "#0f172a",
          })}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Potential
          </span>
          <span className="mt-2 text-5xl font-extrabold text-slate-900">
            {score}
          </span>
          <span className="mt-1 text-xs font-medium text-slate-500">
            out of 100
          </span>
        </CircularProgressbarWithChildren>
        <span className="absolute bottom-6 text-sm font-semibold text-teal-700 transition group-hover:text-teal-600">
          View breakdown →
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          id="gauge-breakdown"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-12"
        >
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Multibagger Potential Breakdown
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Weighted assessment across qualitative and quantitative
                  factors. Hover to learn how each element contributes.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-teal-500 hover:text-teal-600 focus-visible:ring-4 focus-visible:ring-teal-200"
                onClick={() => setIsOpen(false)}
                aria-label="Close breakdown modal"
              >
                ✕
              </button>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {factors.map((factor) => (
                <li
                  key={factor.name}
                  className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-teal-200 hover:bg-teal-50/50 focus-within:border-teal-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {factor.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Weight {factor.weight}%
                      </p>
                    </div>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                      {factor.score}/10
                    </span>
                  </div>
                  <p
                    className="mt-3 text-sm text-slate-600"
                    title={factor.description}
                  >
                    {factor.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
