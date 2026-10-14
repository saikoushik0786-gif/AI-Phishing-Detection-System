import React, { useState } from 'react';
import { Menu, Shield, X } from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'analyze'
  | 'examples'
  | 'methodology'
  | 'evaluation'
  | 'about';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  engineStatus: {
    hasGeminiKey: boolean;
    model: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  engineStatus,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'analyze', label: 'Analyze Message' },
    { id: 'examples', label: 'Demo Examples' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'evaluation', label: 'Model Evaluation' },
    { id: 'about', label: 'About Project' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single text element with icon) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <button
              onClick={() => handleNavClick('overview')}
              className="text-left font-extrabold tracking-tight text-lg text-slate-900 whitespace-nowrap hover:text-blue-600 transition-colors"
            >
              PhishGuard AI
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean text with underline / active styling) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action / Engine Indicator */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
              <span
                className={`w-2 h-2 rounded-full ${
                  engineStatus.hasGeminiKey ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
                title={engineStatus.hasGeminiKey ? 'Gemini 3.8 Flash Online' : 'Local Heuristic Engine Active'}
              />
              <span className="font-mono text-[11px]">
                {engineStatus.hasGeminiKey ? 'Gemini 3.8 Flash' : 'Heuristic Engine'}
              </span>
            </div>

            <button
              onClick={() => handleNavClick('analyze')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              Analyze Message
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Engine:</span>
            <span className="text-xs font-mono font-medium text-slate-700">
              {engineStatus.hasGeminiKey ? 'Gemini 3.8 Flash' : 'Local Heuristic Engine'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
