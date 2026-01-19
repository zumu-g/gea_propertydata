import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Property Data | Grants Estate Agents',
  description: 'View recent sales, rentals, and planning permits around any property in Victoria. Powered by property.com.au and planning.vic.gov.au data.',
  keywords: ['property data', 'real estate', 'sales history', 'rental data', 'planning permits', 'Victoria', 'Melbourne'],
  authors: [{ name: 'Grants Estate Agents' }],
  openGraph: {
    title: 'Property Data | Grants Estate Agents',
    description: 'View recent sales, rentals, and planning permits around any property in Victoria.',
    type: 'website',
    locale: 'en_AU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-brand-cream">
        {/* Header */}
        <header className="bg-gradient-brand text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-gold flex items-center justify-center">
                  <span className="font-display font-bold text-brand-navy text-lg">G</span>
                </div>
                <div>
                  <h1 className="font-display font-semibold text-lg leading-tight">
                    Grants Estate
                  </h1>
                  <p className="text-xs text-gray-400">Property Data</p>
                </div>
              </a>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <a 
                  href="/" 
                  className="text-sm text-gray-300 hover:text-white transition-colors animated-underline"
                >
                  Search
                </a>
                <a 
                  href="/recent" 
                  className="text-sm text-gray-300 hover:text-white transition-colors animated-underline"
                >
                  Recent Activity
                </a>
                <a 
                  href="/planning" 
                  className="text-sm text-gray-300 hover:text-white transition-colors animated-underline"
                >
                  Planning Permits
                </a>
              </nav>

              {/* User Menu */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 hidden sm:block">
                  Internal Use Only
                </span>
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-brand-gold">GEA</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-brand-navy text-gray-400 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-white">Grants Estate Agents</span>
                <span className="text-sm">| Property Data Platform</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>Data sources:</span>
                <a 
                  href="https://property.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-gold-light transition-colors"
                >
                  property.com.au
                </a>
                <a 
                  href="https://planning.vic.gov.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-brand-gold-light transition-colors"
                >
                  planning.vic.gov.au
                </a>
              </div>
              <p className="text-xs">
                © {new Date().getFullYear()} Grants Estate Agents. For internal use only.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
