import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Cloud
              <span className="text-emerald-600">XS</span>
            </h3>
            <p className="mt-3 text-sm text-gray-600 leading-6">
              Upload, optimize, and deliver media
              globally with API-first workflows.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Product
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <a href="#features" className="hover:text-gray-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-gray-900">
                  How It Works
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Developers
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/dashboard/settings"
                  className="hover:text-gray-900"
                >
                  SDK Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/apis"
                  className="hover:text-gray-900"
                >
                  API Keys
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/endpoints"
                  className="hover:text-gray-900"
                >
                  Endpoints
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Account
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/register" className="hover:text-gray-900">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gray-900">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>
            © {new Date().getFullYear()} CloudXS. All
            rights reserved.
          </p>
          <p>Built for developers shipping media-heavy apps.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
