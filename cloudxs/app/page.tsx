"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getToken } from "@/utils/auth";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Shield,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import Link from "next/link";

const featureCards = [
  {
    icon: UploadCloud,
    title: "Direct Upload Flow",
    description:
      "Generate signed upload URLs and push media from client apps without exposing storage credentials.",
  },
  {
    icon: Zap,
    title: "Fast Global Delivery",
    description:
      "Serve optimized images and video through CDN URLs with consistent low-latency performance.",
  },
  {
    icon: Code2,
    title: "SDK + API First",
    description:
      "Integrate upload and delivery quickly with a developer-first SDK and clear endpoint flows.",
  },
  {
    icon: Database,
    title: "Media Metadata",
    description:
      "Store and retrieve file type, dimensions, size, and ownership details in a single media layer.",
  },
  {
    icon: Shield,
    title: "Secure Access",
    description:
      "Use API keys and scoped upload operations to keep your pipeline secure and controlled.",
  },
];

const onboardingSteps = [
  {
    id: "01",
    title: "Create API Key",
    description:
      "Create your key from the dashboard and keep it in environment variables.",
  },
  {
    id: "02",
    title: "Upload With SDK",
    description:
      "Call `cloudxs.upload(file)` and CloudXS handles signed upload and metadata storage.",
  },
  {
    id: "03",
    title: "Use Returned URL",
    description:
      "Read `result.url` and use it immediately in your app or store it in your database.",
  },
];

export default function Home() {
  const token = getToken();
  const primaryHref = token
    ? "/dashboard"
    : "/register";
  const primaryLabel = token
    ? "Open Dashboard"
    : "Start Free";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <Navbar isLoggedIn={!!token} />

      <main className="pt-20">
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-10 pb-16">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="absolute top-1/3 -left-20 h-52 w-52 rounded-full bg-teal-300/20 blur-3xl" />

          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-semibold">
                <Sparkles size={14} />
                Developer-first media infrastructure
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-tight">
                Ship media workflows faster with
                <span className="text-emerald-600"> CloudXS</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                Upload, optimize, and deliver images/videos with a clear API
                flow. From first file upload to production CDN links in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={primaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700 transition-colors"
                >
                  {primaryLabel}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                >
                  View Developer Guide
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                <Metric title="Upload Flow" value="3 Steps" />
                <Metric title="API + SDK" value="Ready" />
                <Metric title="Media URLs" value="CDN Fast" />
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white shadow-xl p-5 sm:p-6">
              <p className="text-sm font-medium text-gray-500">
                Upload example
              </p>
              <pre className="mt-3 rounded-xl bg-gray-950 text-gray-100 p-4 overflow-x-auto text-xs sm:text-sm leading-6">
                <code>{`import { CloudXS } from "cloudxs";

const cloudxs = new CloudXS({
  apiKey: process.env.NEXT_PUBLIC_CLOUDXS_API_KEY!,
});

const result = await cloudxs.upload(file);
console.log(result.url);`}</code>
              </pre>
              <div className="mt-4 flex items-start gap-2 text-sm text-emerald-700">
                <CheckCircle2 size={16} className="mt-0.5" />
                Returns production-ready URL after upload.
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 sm:px-6 lg:px-10 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                Built for teams shipping media-heavy products
              </h2>
              <p className="mt-3 text-gray-600">
                Clear primitives for upload, storage metadata, and delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 hover:-translate-y-1 hover:shadow-lg transition-all"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-6">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="px-4 sm:px-6 lg:px-10 pb-16"
        >
          <div className="max-w-7xl mx-auto rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8 lg:p-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Integration in 3 clear steps
            </h2>
            <p className="mt-3 text-gray-700 max-w-2xl">
              Move from setup to first uploaded URL with a predictable flow.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {onboardingSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-2xl bg-white border border-emerald-100 p-5"
                >
                  <p className="text-xs font-semibold tracking-widest text-emerald-600">
                    STEP {step.id}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="developer"
          className="px-4 sm:px-6 lg:px-10 pb-20"
        >
          <div className="max-w-7xl mx-auto rounded-2xl bg-gray-950 text-white p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Ready to run your first upload?
            </h2>
            <p className="mt-3 text-gray-300 max-w-2xl">
              Start with API key creation, then follow the SDK-based upload flow
              from the Developer Options page.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-gray-950 hover:bg-emerald-400 transition-colors"
              >
                Open Developer Options
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard/apis"
                className="inline-flex items-center justify-center rounded-xl border border-gray-700 px-5 py-3 font-medium text-white hover:bg-gray-900 transition-colors"
              >
                Create API Key
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const Metric = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white p-3">
    <p className="text-xs text-gray-500">{title}</p>
    <p className="mt-1 text-sm font-semibold text-gray-900">
      {value}
    </p>
  </div>
);
