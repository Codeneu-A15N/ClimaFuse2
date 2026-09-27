import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SideNavDock() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const navItems = [
    { label: 'Overview', icon: 'hub', href: '/' },
    { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
    { label: 'Coverage Mesh', icon: 'radar', href: '/#coverage' },
    { label: 'Methodology', icon: 'tune', href: '/#how-it-works' },
    { label: 'Architecture', icon: 'splitscreen', href: '/#why-climafuse' },
    { label: 'Operational Outputs', icon: 'grain', href: '/#outputs' },
  ];

  return (
    <aside
      aria-label="Global System Navigation"
      className="fixed left-6 top-6 z-50 hidden sm:flex flex-col items-center rounded-full bg-[#111111]/90 backdrop-blur-xl border border-[#262626] shadow-2xl p-1.5"
    >
      {/* Brand Insignia */}
      <Link
        to="/"
        className="group relative flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-[#181818] transition-colors duration-150 mb-1"
        aria-label="ClimaFuse Home"
      >
        <span className="material-symbols-outlined text-[20px] font-bold">hub</span>
        <span className="absolute left-14 px-2.5 py-1 rounded bg-[#181818] border border-[#262626] text-[0.6875rem] font-mono text-[#e5e2e1] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
          ClimaFuse Platform
        </span>
      </Link>

      {/* Divider */}
      <div className="w-5 h-px bg-[#262626] mb-1.5" />

      {/* Navigation Items */}
      <div className="flex flex-col items-center space-y-1">
        {navItems.map((item) => {
          const isHash = item.href.includes('#');
          return isHash ? (
            <a
              key={item.label}
              href={item.href}
              className="group relative flex items-center justify-center w-10 h-10 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#181818] transition-colors duration-150"
              aria-label={item.label}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="absolute left-14 px-2.5 py-1 rounded bg-[#181818] border border-[#262626] text-[0.6875rem] font-mono text-[#e5e2e1] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                {item.label}
              </span>
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              className="group relative flex items-center justify-center w-10 h-10 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#181818] transition-colors duration-150"
              aria-label={item.label}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="absolute left-14 px-2.5 py-1 rounded bg-[#181818] border border-[#262626] text-[0.6875rem] font-mono text-[#e5e2e1] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-5 h-px bg-[#262626] my-1.5" />

      {/* Theme Toggle Button */}
      <button
        type="button"
        aria-label="Toggle Theme"
        onClick={toggleTheme}
        className="group relative flex items-center justify-center w-10 h-10 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#181818] transition-colors duration-150 cursor-pointer"
        id="themeToggleBtn"
      >
        <span className="material-symbols-outlined text-[18px]" id="themeIcon">
          {isDark ? 'dark_mode' : 'light_mode'}
        </span>
        <span className="absolute left-14 px-2.5 py-1 rounded bg-[#181818] border border-[#262626] text-[0.6875rem] font-mono text-[#e5e2e1] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
          Theme: {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    </aside>
  );
}
