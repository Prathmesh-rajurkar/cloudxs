import Link from "next/link";

const installSnippet = `npm install cloudxs`;

const initSnippet = `import { CloudXS } from "cloudxs";

const cloudxs = new CloudXS({
  apiKey: process.env.NEXT_PUBLIC_CLOUDXS_API_KEY!,
});`;

const uploadSnippet = `const handleUpload = async (file: File) => {
  try {
    const result = await cloudxs.upload(file);
    console.log("Uploaded URL:", result.url);
    return result.url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};`;

const reactSnippet = `"use client";

import { useState } from "react";
import { CloudXS } from "cloudxs";

const cloudxs = new CloudXS({
  apiKey: process.env.NEXT_PUBLIC_CLOUDXS_API_KEY!,
});

export default function UploadExample() {
  const [uploadedUrl, setUploadedUrl] = useState("");

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await cloudxs.upload(file);
    setUploadedUrl(result.url);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {uploadedUrl ? <p>{uploadedUrl}</p> : null}
    </div>
  );
}`;

const Page = () => {
  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Developer Options
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl">
          Follow these steps to create your API key, connect CloudXS SDK, upload
          media, and get the final link back.
        </p>
      </div>

      <section className="border rounded-xl p-4 sm:p-6 bg-white space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          1. Create API Key
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Open the API Keys page and create a new key. Keep it safe. You will
          use this key in your app when creating the CloudXS client.
        </p>
        <Link
          href="/dashboard/apis"
          className="inline-flex items-center rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 transition"
        >
          Open API Keys
        </Link>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-xl p-4 sm:p-6 bg-white space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            2. Install SDK
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Install the CloudXS SDK in your project.
          </p>
          <CodeBlock code={installSnippet} language="bash" />
        </div>

        <div className="border rounded-xl p-4 sm:p-6 bg-white space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            3. Initialize Client
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Create one CloudXS instance using your API key.
          </p>
          <CodeBlock code={initSnippet} language="ts" />
        </div>
      </section>

      <section className="border rounded-xl p-4 sm:p-6 bg-white space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          4. Upload File And Get URL
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          When you call `cloudxs.upload(file)`, CloudXS uploads the file and
          returns a CDN URL in `result.url`.
        </p>
        <CodeBlock code={uploadSnippet} language="ts" />
      </section>

      <section className="border rounded-xl p-4 sm:p-6 bg-white space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Full React Example
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Use this directly in a client component to upload and display the
          final media link.
        </p>
        <CodeBlock code={reactSnippet} language="tsx" />
      </section>

      <section className="border rounded-xl p-4 sm:p-6 bg-green-50 border-green-200">
        <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-3">
          Quick Flow
        </h2>
        <ol className="list-decimal pl-5 text-sm sm:text-base text-green-900 space-y-2">
          <li>Create API key from the API Keys page.</li>
          <li>Install `cloudxs` package.</li>
          <li>Initialize CloudXS client with your API key.</li>
          <li>Select file and call `cloudxs.upload(file)`.</li>
          <li>Read `result.url` and use it anywhere in your app.</li>
        </ol>
      </section>
    </div>
  );
};

const CodeBlock = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => (
  <pre className="w-full overflow-x-auto rounded-lg bg-gray-950 text-gray-100 p-4 text-xs sm:text-sm leading-6">
    <code>{`// ${language}\n${code}`}</code>
  </pre>
);

export default Page;
