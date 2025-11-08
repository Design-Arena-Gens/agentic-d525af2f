"use client";

import { useMemo, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export type MetricRow = {
  year: string;
  revenue: number;
  profitMargin: number;
  roe: number;
  debtEquity: number;
  marketShare: number;
};

type SortKey = keyof MetricRow;

type MetricsTableProps = {
  rows: MetricRow[];
};

const PAGE_SIZE = 5;

export function MetricsTable({ rows }: MetricsTableProps) {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  const filteredRows = useMemo(() => {
    const filtered = rows.filter((row) =>
      row.year.toLowerCase().includes(filter.toLowerCase()),
    );
    return filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      const direction = sortDir === "asc" ? 1 : -1;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction;
      }
      return aValue.toString().localeCompare(bValue.toString()) * direction;
    });
  }, [filter, rows, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE);
  const currentPageRows = filteredRows.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <section
      aria-labelledby="metrics-heading"
      className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="metrics-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Financial Quality Snapshot
          </h2>
          <p className="text-sm text-slate-500">
            Sort and filter operating metrics to benchmark consistency.
          </p>
        </div>
        <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 focus-within:border-teal-400 focus-within:text-teal-700">
          <span className="font-semibold text-slate-500">Filter</span>
          <input
            type="search"
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
              setPage(0);
            }}
            placeholder="Year 2023..."
            className="w-32 bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {(
                [
                  ["year", "Year"],
                  ["revenue", "Revenue ₹Cr"],
                  ["profitMargin", "Profit Margin %"],
                  ["roe", "ROE %"],
                  ["debtEquity", "Debt/Equity"],
                  ["marketShare", "Market Share %"],
                ] as [SortKey, string][]
              ).map(([key, label]) => {
                const isActive = sortKey === key;
                return (
                  <th
                    key={key}
                    scope="col"
                    className="rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-700"
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(key)}
                      className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-teal-200"
                    >
                      {label}
                      {isActive &&
                        (sortDir === "asc" ? (
                          <FiArrowUp aria-label="ascending" />
                        ) : (
                          <FiArrowDown aria-label="descending" />
                        ))}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentPageRows.map((row) => (
              <tr
                key={row.year}
                className="rounded-2xl bg-white text-slate-700 shadow-sm"
              >
                <td className="rounded-l-2xl px-4 py-3 font-semibold">
                  {row.year}
                </td>
                <td className="px-4 py-3">
                  ₹{row.revenue.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3">{row.profitMargin.toFixed(1)}%</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">
                  {row.roe.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-amber-600">
                  {row.debtEquity.toFixed(2)}
                </td>
                <td className="rounded-r-2xl px-4 py-3">
                  {row.marketShare.toFixed(1)}%
                </td>
              </tr>
            ))}
            {currentPageRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                  No records match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {page * PAGE_SIZE + 1}-
          {Math.min((page + 1) * PAGE_SIZE, filteredRows.length)} of{" "}
          {filteredRows.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition enabled:hover:border-teal-200 enabled:hover:text-teal-600 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-teal-200"
          >
            Previous
          </button>
          <span className="font-semibold text-slate-600">
            Page {page + 1} of {Math.max(totalPages, 1)}
          </span>
          <button
            type="button"
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page >= totalPages - 1}
            className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition enabled:hover:border-teal-200 enabled:hover:text-teal-600 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-teal-200"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
