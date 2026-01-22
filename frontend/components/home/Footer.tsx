// Footer.tsx
export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12 border-t border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
        
        {/* Logo */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
            <span className="font-bold text-xl text-gray-900">NExplain</span>
          </div>
        </div>

        {/* Integrations */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Integrations</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Slack</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Zendesk</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Front App</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Genesys</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">HubSpot</a></li>
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Industries</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Finance</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Consumer Electronics</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Professional Services</a></li>
          </ul>
        </div>

        {/* Technology */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Technology</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">LLM</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Multi-Agent System</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Features</a></li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Solutions</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Service</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm mb-4 transition-colors">
            Contact us
          </button>
          <div className="flex gap-3">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-4 md:mb-0">
          © 2026 NExplain AI. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</a>
        </div>
      </div>
    </footer>
  );
}