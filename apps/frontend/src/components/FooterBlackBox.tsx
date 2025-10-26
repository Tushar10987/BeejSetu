import { useEffect, useState } from 'react';

interface VisitorMetrics {
  visitors_today: number;
  visitors_month: number;
  registered_users: number;
  active_fpos: number;
}

const PLATFORM_NAME = 'BeejSetu';
const DOMAIN = 'beejsetu.in';
const ORG_NAME = 'BeejSetu Technologies';
const CURRENT_YEAR = new Date().getFullYear();

export default function FooterBlackBox() {
  const [metrics, setMetrics] = useState<VisitorMetrics>({
    visitors_today: 0,
    visitors_month: 0,
    registered_users: 0,
    active_fpos: 0
  });

  useEffect(() => {
    // In production, this would fetch from your API
    // fetch('/api/v1/metrics/footer')
    setMetrics({
      visitors_today: 1247,
      visitors_month: 28456,
      registered_users: 5689,
      active_fpos: 234
    });
  }, []);

  return (
    <footer 
      className="bg-gray-900 text-white w-full py-4 mt-auto"
      role="contentinfo" 
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* About Us */}
          <div className="space-y-2" data-section="footer" data-subsection="about">
            <h2 className="text-base font-semibold">About Us</h2>
            <p className="text-gray-400 text-sm">
              {PLATFORM_NAME} empowers farmers, FPOs, processors and buyers to capture full value from oilseed by-products, 
              connecting smallholders with processors and export opportunities.
            </p>
          </div>

          {/* Contact Us */}
          <div className="space-y-2" data-section="footer" data-subsection="contact">
            <h2 className="text-base font-semibold">Contact Us</h2>
            <address className="not-italic space-y-1.5 text-sm text-gray-400">
              <p>
                <span className="text-gray-300">Support:</span>{' '}
                <a href={`mailto:support@${DOMAIN}`} className="hover:underline">
                  support@{DOMAIN}
                </a>
              </p>
              <p>
                <span className="text-gray-300">Helpline:</span>{' '}
                +91-8888888888
              </p>
              <p>
                <span className="text-gray-300">Business:</span>{' '}
                <a href={`mailto:partners@${DOMAIN}`} className="hover:underline">
                  partners@{DOMAIN}
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div className="space-y-2" data-section="footer" data-subsection="links">
            <h2 className="text-base font-semibold">Quick Links</h2>
            <nav>
              <ul className="space-y-1.5 text-sm text-gray-400">
                <li><a href="/how-it-works" className="hover:underline">How it Works</a></li>
                <li><a href="/marketplace" className="hover:underline">Marketplace</a></li>
                <li><a href="/loans" className="hover:underline">Loans & Insurance</a></li>
                <li><a href="/export" className="hover:underline">Export</a></li>
                <li><a href="/help" className="hover:underline">Help Center</a></li>
              </ul>
            </nav>
          </div>

          {/* Newsletter & Metrics */}
          <div className="space-y-4" data-section="footer" data-subsection="newsletter">
            <div className="space-y-2">
              <h2 className="text-base font-semibold">Stay Updated</h2>
              <p className="text-sm text-gray-400">
                Subscribe to {PLATFORM_NAME} updates
              </p>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-1.5 text-sm rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div 
              className="space-y-2 mt-4" 
              data-section="footer" 
              data-subsection="metrics"
              aria-live="polite"
            >
              <h2 className="text-base font-semibold">Platform Metrics</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Today's Visitors</p>
                  <p className="text-base font-medium">{metrics.visitors_today}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Monthly Visitors</p>
                  <p className="text-base font-medium">{metrics.visitors_month}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Registered Users</p>
                  <p className="text-base font-medium">{metrics.registered_users}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Active FPOs</p>
                  <p className="text-base font-medium">{metrics.active_fpos}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-xs text-gray-400">
              © {CURRENT_YEAR} {ORG_NAME}. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs text-gray-400">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Use</a>
              <a href="/accessibility" className="hover:underline">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}