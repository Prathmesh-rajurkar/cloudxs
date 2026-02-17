"use client";

import {
  ArrowRight,
  ChartColumn,
  CheckCircle2,
  Code2,
  Link2,
  Settings2,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";

const quickSetup = [
  {
    title: "Create your first API key",
    description:
      "Generate a key from API Keys page to authenticate upload flows.",
    href: "/dashboard/apis",
  },
  {
    title: "Read SDK integration guide",
    description:
      "Use the Developer Options page for code snippets and upload steps.",
    href: "/dashboard/settings",
  },
  {
    title: "Generate upload URL",
    description:
      "Use endpoint docs to request a signed upload URL from your backend.",
    href: "/dashboard/endpoints",
  },
];

const primaryActions = [
  {
    icon: UploadCloud,
    title: "Media Library",
    description:
      "View all uploaded files with URLs, previews, and media metadata.",
    href: "/dashboard/media",
    cta: "Open Media Library",
  },
  {
    icon: ChartColumn,
    title: "Usage Analytics",
    description:
      "Track uploads, storage usage, and upload activity trends by date.",
    href: "/dashboard/analytics",
    cta: "View Analytics",
  },
  {
    icon: Code2,
    title: "API Keys",
    description:
      "Create and manage API keys for all development and production apps.",
    href: "/dashboard/apis",
    cta: "Manage API Keys",
  },
];

const secondaryActions = [
  {
    icon: Link2,
    title: "URL Endpoints",
    description:
      "Reference upload and media endpoints with ready-to-use examples.",
    href: "/dashboard/endpoints",
  },
  {
    icon: Settings2,
    title: "Developer Options",
    description:
      "Follow CloudXS SDK setup, upload flow, and returned URL usage.",
    href: "/dashboard/settings",
  },
];

const Page = () => {
  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <section className="rounded-3xl bg-green-500 text-white p-6 sm:p-8 md:p-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          <CheckCircle2 size={14} />
          Get Started
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
          Build your media pipeline in minutes
        </h1>
        <p className="mt-3 text-sm sm:text-base text-emerald-50 max-w-3xl leading-6">
          Start by creating an API key, then upload with CloudXS SDK, and use
          the returned CDN links in your app. The cards below are ordered for a
          smooth first setup.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          Quick Setup Checklist
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickSetup.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border bg-white p-5 hover:shadow-md transition"
            >
              <p className="text-sm font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-gray-600 leading-6">
                {item.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-700">
                Continue
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          Primary Actions
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          {primaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border bg-white p-5 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 text-green-700">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {action.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-6">
                  {action.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-700">
                  {action.cta}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">
          Developer Resources
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {secondaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 text-gray-700">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 leading-6">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Page;
