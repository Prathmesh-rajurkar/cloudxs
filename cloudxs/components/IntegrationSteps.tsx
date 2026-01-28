import React from "react";

const steps = [
  {
    id: 1,
    title: "Set up your account",
    description: (
      <>
        Connect your existing cloud storage, HTTP server, or use CloudXS as a
        media proxy.
        <br />
        <br />
        Or upload files directly to CloudXS using our API or dashboard for
        instant access.
      </>
    ),
  },
  {
    id: 2,
    title: "Switch delivery URLs",
    description: (
      <>
        Replace your media URLs with CloudXS URLs or use a custom CNAME.
        <br />
        <br />
        Start delivering optimized images and videos instantly — no backend
        changes required.
      </>
    ),
  },
  {
    id: 3,
    title: "Apply transformations",
    description: (
      <>
        Resize, crop, optimize, and transform images and videos in real time
        using simple URL-based parameters.
        <br />
        <br />
        Use our SDKs to integrate transformations seamlessly into your app.
      </>
    ),
  },
];

const IntegrationSteps = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Integration in <span className="text-green-600">3 steps</span>
        </h2>

        {/* Subheading */}
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Get started with CloudXS without migrating your existing media.
          Plug into your current setup or upload directly — and start delivering
          optimized visuals instantly.
        </p>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
            >
              {/* Step Number */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-semibold">
                  {step.id}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSteps;
