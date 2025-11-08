"use client";

import { useState } from "react";
import { FiBarChart2, FiBell, FiBookOpen, FiHelpCircle, FiHome, FiShield } from "react-icons/fi";

type Section = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  sections: Section[];
  activeSection: string;
  onNavigate: (id: string) => void;
  collapsed?: boolean;
};

export function Sidebar({
  sections,
  activeSection,
  onNavigate,
  collapsed = false,
}: SidebarProps) {
  return (
    <nav
      className={`${
        collapsed ? "hidden" : "flex"
      } h-full w-72 flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl lg:flex`}
      aria-label="Primary"
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">
          AstraMultibagger
        </span>
        <p className="mt-2 text-base font-semibold text-slate-900">
          Intelligent India Equities Radar
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {sections.map((section) => {
          const isActive = section.id === activeSection;
          return (
            <li key={section.id}>
              <button
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-teal-200 ${
                  isActive
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
                onClick={() => onNavigate(section.id)}
              >
                <span aria-hidden>{section.icon}</span>
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-xs text-slate-600">
        <h3 className="text-sm font-semibold text-slate-900">Disclaimer</h3>
        <p className="mt-2">
          Research outputs are AI-simulated and must be supplemented with
          independent diligence. Markets involve risk of capital loss.
        </p>
      </div>
    </nav>
  );
}

export function useDefaultSections(): Section[] {
  return [
    { id: "overview", label: "Overview", icon: <FiHome /> },
    { id: "analytics", label: "Analytics", icon: <FiBarChart2 /> },
    { id: "alerts", label: "Alerts", icon: <FiBell /> },
    { id: "risks", label: "Risk Radar", icon: <FiShield /> },
    { id: "account", label: "Account", icon: <FiBookOpen /> },
    { id: "help", label: "Help", icon: <FiHelpCircle /> },
  ];
}

type MobileHeaderProps = {
  sections: Section[];
  activeSection: string;
  onNavigate: (id: string) => void;
};

export function MobileHeader({
  sections,
  activeSection,
  onNavigate,
}: MobileHeaderProps) {
  const [open, setOpen] = useState(false);
  const activeLabel =
    sections.find((section) => section.id === activeSection)?.label ??
    "Overview";

  return (
    <header className="mb-4 flex items-center justify-between rounded-3xl border border-slate-100 bg-white px-4 py-3 shadow-lg lg:hidden">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">
          AstraMultibagger
        </p>
        <p className="text-sm font-semibold text-slate-900">{activeLabel}</p>
      </div>
      <div className="relative">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-teal-300 hover:text-teal-600 focus-visible:ring-2 focus-visible:ring-teal-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          ☰
          <span className="sr-only">Toggle navigation</span>
        </button>
        {open && (
          <div className="absolute right-0 z-40 mt-3 w-56 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
            <ul className="space-y-1" role="menu">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    role="menuitem"
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold ${
                      section.id === activeSection
                        ? "bg-teal-50 text-teal-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => {
                      onNavigate(section.id);
                      setOpen(false);
                    }}
                  >
                    <span aria-hidden>{section.icon}</span>
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
