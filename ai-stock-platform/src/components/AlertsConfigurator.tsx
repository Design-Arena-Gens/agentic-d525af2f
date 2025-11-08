"use client";

import { useState } from "react";

type AlertPreferences = {
  enableEmail: boolean;
  enablePush: boolean;
  priceThreshold: number;
  includeNews: boolean;
  includeFilings: boolean;
  includeSentiment: boolean;
  timeframe: string;
};

export function AlertsConfigurator() {
  const [preferences, setPreferences] = useState<AlertPreferences>({
    enableEmail: true,
    enablePush: false,
    priceThreshold: 5,
    includeNews: true,
    includeFilings: true,
    includeSentiment: true,
    timeframe: "1D",
  });

  return (
    <section
      id="alerts"
      aria-labelledby="alerts-heading"
      className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="alerts-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Customized Alerts
          </h2>
          <p className="text-sm text-slate-500">
            Tailor threshold-based price triggers and intelligence notifications.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:ring-4 focus-visible:ring-teal-200"
        >
          Save Preferences
        </button>
      </div>

      <form className="mt-6 grid gap-6 md:grid-cols-2" aria-live="polite">
        <fieldset className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
          <legend className="text-sm font-semibold text-slate-900">
            Delivery channels
          </legend>
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={preferences.enableEmail}
              onChange={(event) =>
                setPreferences((prev) => ({
                  ...prev,
                  enableEmail: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            Email notifications
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={preferences.enablePush}
              onChange={(event) =>
                setPreferences((prev) => ({
                  ...prev,
                  enablePush: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            Push notifications
          </label>
        </fieldset>

        <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Price swing trigger (% change)
            <input
              type="range"
              min={1}
              max={20}
              value={preferences.priceThreshold}
              onChange={(event) =>
                setPreferences((prev) => ({
                  ...prev,
                  priceThreshold: Number(event.target.value),
                }))
              }
              className="accent-teal-600"
            />
            <span className="text-xs font-semibold text-slate-500">
              Alert when daily change exceeds {preferences.priceThreshold}%.
            </span>
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Lookback window
            <select
              value={preferences.timeframe}
              onChange={(event) =>
                setPreferences((prev) => ({
                  ...prev,
                  timeframe: event.target.value,
                }))
              }
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
            >
              <option value="1D">1 Day</option>
              <option value="1W">1 Week</option>
              <option value="1M">1 Month</option>
            </select>
          </label>
        </div>

        <fieldset className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 md:col-span-2">
          <legend className="text-sm font-semibold text-slate-900">
            Include content types
          </legend>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={preferences.includeNews}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    includeNews: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              Price & news catalysts
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={preferences.includeFilings}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    includeFilings: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              Regulatory filings
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={preferences.includeSentiment}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    includeSentiment: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              Market sentiment scans
            </label>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
