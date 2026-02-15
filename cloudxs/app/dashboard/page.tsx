"use client";

import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome to CloudXS
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          CloudXS is a developer-focused media infrastructure platform that
          allows you to securely upload, store, and manage digital assets using
          simple API integrations. Generate upload URLs, track storage usage,
          manage media files, and integrate seamlessly into your applications.
        </p>
      </div>

      {/* What We Do */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          What CloudXS Does
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5">
            <h3 className="font-medium text-gray-800 mb-2">
              Secure File Upload Infrastructure
            </h3>
            <p className="text-gray-600 text-sm">
              Generate secure upload URLs via API and allow users to upload
              files directly without exposing your storage credentials.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-medium text-gray-800 mb-2">
              Media Metadata Management
            </h3>
            <p className="text-gray-600 text-sm">
              Store and manage file metadata including file name, size, type,
              storage usage, and ownership.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-medium text-gray-800 mb-2">
              Developer APIs & SDK
            </h3>
            <p className="text-gray-600 text-sm">
              Integrate CloudXS into your frontend or backend using simple
              API endpoints and SDK support.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-medium text-gray-800 mb-2">
              Usage & Storage Analytics
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor total storage usage, file counts, and track how your
              application consumes storage resources.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Explore Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Media Library */}
          <Link
            href="/media"
            className="border rounded-lg p-5 hover:shadow-sm transition"
          >
            <h3 className="font-medium text-gray-800 mb-2">
              Media Library
            </h3>
            <p className="text-sm text-gray-600">
              View, manage, and organize all uploaded media files. Access
              file URLs and metadata.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Go to Media Library →
            </p>
          </Link>

          {/* Usage Analytics */}
          <Link
            href="/analytics"
            className="border rounded-lg p-5 hover:shadow-sm transition"
          >
            <h3 className="font-medium text-gray-800 mb-2">
              Usage Analytics
            </h3>
            <p className="text-sm text-gray-600">
              Track total storage usage, monitor upload activity, and analyze
              application resource consumption.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              View Analytics →
            </p>
          </Link>

          {/* URL Endpoints */}
          <Link
            href="/endpoints"
            className="border rounded-lg p-5 hover:shadow-sm transition"
          >
            <h3 className="font-medium text-gray-800 mb-2">
              URL Endpoints
            </h3>
            <p className="text-sm text-gray-600">
              Generate secure upload URLs and manage API endpoints for your
              application.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Manage Endpoints →
            </p>
          </Link>

          {/* Developer Options */}
          <Link
            href="/developer"
            className="border rounded-lg p-5 hover:shadow-sm transition"
          >
            <h3 className="font-medium text-gray-800 mb-2">
              Developer Options
            </h3>
            <p className="text-sm text-gray-600">
              Configure API keys, manage integrations, and control developer
              settings.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Open Developer Settings →
            </p>
          </Link>

          {/* APIs */}
          <Link
            href="/apis"
            className="border rounded-lg p-5 hover:shadow-sm transition"
          >
            <h3 className="font-medium text-gray-800 mb-2">
              APIs
            </h3>
            <p className="text-sm text-gray-600">
              Explore available CloudXS APIs including upload generation,
              metadata storage, and media retrieval.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Explore APIs →
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
