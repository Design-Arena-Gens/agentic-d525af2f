"use client";

import { useState } from "react";

type ProfileState = {
  fullName: string;
  email: string;
  role: string;
  plan: "Starter" | "Growth" | "Institutional";
};

export function UserAccountSections() {
  const [profile, setProfile] = useState<ProfileState>({
    fullName: "Arjun Mehra",
    email: "arjun.mehra@example.com",
    role: "Portfolio Manager",
    plan: "Growth",
  });

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage personal identifiers for compliance-ready communication.
        </p>
        <form className="mt-4 space-y-4">
          <label className="block text-sm text-slate-600">
            <span className="font-semibold">Full name</span>
            <input
              type="text"
              value={profile.fullName}
              onChange={(event) =>
                setProfile((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
          </label>
          <label className="block text-sm text-slate-600">
            <span className="font-semibold">Email address</span>
            <input
              type="email"
              value={profile.email}
              onChange={(event) =>
                setProfile((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
          </label>
          <label className="block text-sm text-slate-600">
            <span className="font-semibold">Role / designation</span>
            <input
              type="text"
              value={profile.role}
              onChange={(event) =>
                setProfile((prev) => ({
                  ...prev,
                  role: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
          </label>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-900">Workspace</h2>
        <p className="mt-1 text-sm text-slate-500">
          Configure data refresh cadence, notifications, and sharing settings.
        </p>
        <form className="mt-4 space-y-4">
          <label className="flex items-center justify-between gap-3 text-sm text-slate-600">
            Refresh daily snapshots
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
          </label>
          <label className="flex items-center justify-between gap-3 text-sm text-slate-600">
            Share dashboards with team
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
          </label>
          <fieldset className="rounded-xl border border-slate-200 p-3">
            <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Digest frequency
            </legend>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              defaultValue="Weekly"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </fieldset>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-900">Subscription</h2>
        <p className="mt-1 text-sm text-slate-500">
          Review your plan and scale coverage effortlessly.
        </p>
        <div className="mt-4 space-y-4 text-sm text-slate-600">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              Current plan
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {profile.plan} Plan
            </p>
            <p className="mt-1 text-sm">
              ₹14,999 / year • Includes premium AI models, 200 alert rules, and
              NSE/BSE coverage.
            </p>
          </div>
          <button
            type="button"
            className="w-full rounded-full border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:border-teal-400 hover:text-teal-600 focus-visible:ring-4 focus-visible:ring-teal-200"
          >
            Manage billing
          </button>
          <button
            type="button"
            className="w-full rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:ring-4 focus-visible:ring-teal-200"
          >
            Upgrade to Institutional
          </button>
        </div>
      </div>
    </section>
  );
}
