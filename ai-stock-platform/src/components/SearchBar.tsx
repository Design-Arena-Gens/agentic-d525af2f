"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type Company = {
  name: string;
  ticker: string;
  sector: string;
  marketCap: string;
};

type SearchBarProps = {
  companies: Company[];
  onSelect: (company: Company) => void;
  selected?: Company;
};

export function SearchBar({ companies, onSelect, selected }: SearchBarProps) {
  const [query, setQuery] = useState<string>(
    selected ? `${selected.name} (${selected.ticker})` : "",
  );
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxRef = useRef<HTMLUListElement>(null);

  const suggestions = useMemo(() => {
    if (!query.trim()) {
      return companies.slice(0, 5);
    }
    return companies
      .filter((company) => {
        const normalized = `${company.name} ${company.ticker} ${company.sector}`.toLowerCase();
        return normalized.includes(query.toLowerCase());
      })
      .slice(0, 8);
  }, [companies, query]);

  const handleSelect = (company: Company) => {
    onSelect(company);
    setQuery(`${company.name} (${company.ticker})`);
    setIsFocused(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1,
      );
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && listboxRef.current) {
      const option = listboxRef.current.children[activeIndex] as HTMLElement;
      option?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full max-w-3xl" role="search">
      <label htmlFor="company-search" className="sr-only">
        Search companies
      </label>
      <div className="relative">
        <input
          id="company-search"
          type="search"
          className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 pr-16 text-base shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          placeholder="Search Indian companies by name, ticker, or sector"
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            window.setTimeout(() => setIsFocused(false), 150);
          }}
          onKeyDown={handleKeyDown}
          aria-controls="company-suggestions"
          aria-expanded={isFocused && suggestions.length > 0}
          aria-autocomplete="list"
          role="combobox"
        />
        <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
          ⌘K
        </span>
      </div>
      {isFocused && suggestions.length > 0 && (
        <ul
          id="company-suggestions"
          role="listbox"
          ref={listboxRef}
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl"
        >
          {suggestions.map((company, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={company.ticker}
                role="option"
                aria-selected={isActive}
                className={`cursor-pointer px-6 py-4 transition ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "hover:bg-slate-50 focus-visible:bg-slate-50"
                }`}
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleSelect(company);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    {company.name}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {company.ticker}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {company.sector} • Market Cap: {company.marketCap}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
