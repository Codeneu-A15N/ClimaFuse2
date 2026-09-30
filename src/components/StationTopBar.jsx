import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CITIES } from '../api/cities';
import { exportStationCSV } from '../api/stationAnalysisData';

export default function StationTopBar({ station, currentCycle = 'Operational Forecast', onCycleChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = () => {
    setExporting(true);
    exportStationCSV(station);
    setTimeout(() => setExporting(false), 1500);
  };

  return (
    <header className="h-14 border-b border-[#262626] bg-[#121212]/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8 pl-16 lg:pl-20 w-full select-none">
      {/* Left: Brand & Breadcrumb City Selector */}
      <div className="flex items-center gap-3 lg:gap-4 min-w-0">
        <Link to="/dashboard" className="flex items-center gap-2.5 group shrink-0">
          <img src="/weather.png" alt="ClimaFuse Icon" className="w-5 h-5 object-contain rounded-full shadow-sm ring-1 ring-white/10" />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base lg:text-lg font-bold tracking-tight text-white group-hover:text-[#4edea3] transition-colors">
            ClimaFuse
          </span>
          <span className="text-[10px] font-mono text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/30 px-1.5 py-0.5 rounded uppercase hidden sm:inline-block">
            Station Analysis
          </span>
        </Link>

        <div className="h-4 w-px bg-[#262626] shrink-0"></div>

        {/* Station Breadcrumb with Dropdown */}
        <div className="relative shrink min-w-0" ref={dropdownRef}>
          <nav className="flex items-center gap-1.5 text-xs text-[#a3a3a3] font-mono truncate">
            <Link to="/dashboard" className="hover:text-white transition-colors hidden md:inline">
              Stations
            </Link>
            <span className="text-[#444748] hidden md:inline">/</span>
            <span className="hidden sm:inline text-[#8e9192]">{station.region}</span>
            <span className="text-[#444748] hidden sm:inline">/</span>

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white font-medium flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#262626] transition-all cursor-pointer truncate shadow-sm group"
              title="Switch Station"
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: station.alertColor }}></span>
              <span className="truncate">{station.name} ({station.awsId})</span>
              <span className={`material-symbols-outlined text-sm text-[#8e9192] group-hover:text-white transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
          </nav>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 max-h-96 bg-[#161616] border border-[#333] rounded-xl shadow-2xl overflow-y-auto py-1.5 z-50 divide-y divide-[#222] scrollbar-thin scrollbar-thumb-[#333]">
              <div className="px-3 py-1.5 text-[10px] font-mono text-[#8e9192] uppercase tracking-wider flex items-center justify-between">
                <span>Select IMD AWS Station</span>
                <span className="text-[#4edea3]">10 Reference Sites</span>
              </div>
              <div className="py-1">
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate(`/station/${c.id}`);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      c.id === station.id ? 'bg-[#252525] text-white font-semibold' : 'text-[#c4c7c8] hover:bg-[#1e1e1e] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.alertColor }}></span>
                      <div className="truncate">
                        <div className="truncate font-sans">{c.name}</div>
                        <div className="text-[10px] font-mono text-[#8e9192] truncate">{c.awsId} · {c.state.split(' ')[0]}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span className="font-mono text-white text-xs">{c.temp}°C</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Operational Status, Tab Switcher & Export */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Operational Pulse */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#a3a3a3] bg-[#181818] px-2.5 py-1 rounded-lg border border-[#262626]">
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
          <span>LIVE TELEMETRY (0.05° EPS)</span>
        </div>

        {/* Forecast / Observation Toggle */}
        <div className="hidden md:flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#262626]">
          <button
            onClick={() => onCycleChange && onCycleChange('Operational Forecast')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              currentCycle === 'Operational Forecast'
                ? 'bg-[#2a2a2a] text-white font-semibold shadow-sm'
                : 'text-[#8e9192] hover:text-white'
            }`}
          >
            Operational Forecast
          </button>
          <button
            onClick={() => onCycleChange && onCycleChange('Past Observations')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              currentCycle === 'Past Observations'
                ? 'bg-[#2a2a2a] text-white font-semibold shadow-sm'
                : 'text-[#8e9192] hover:text-white'
            }`}
          >
            Past Observations
          </button>
        </div>

        {/* Export CSV Button */}
        <button
          onClick={handleExport}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
          title="Export CSV Telemetry for this Station"
        >
          <span className="material-symbols-outlined text-[15px] font-bold">
            {exporting ? 'check' : 'download'}
          </span>
          <span className="hidden sm:inline">{exporting ? 'Exported!' : 'Export CSV'}</span>
        </button>

        {/* Back to Live Dashboard */}
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181818] hover:bg-[#252525] border border-[#262626] hover:border-[#383838] text-white text-xs font-mono transition-all shadow-sm group"
          title="Return to Live Map Dashboard"
        >
          <span className="material-symbols-outlined text-[16px] text-[#4edea3] group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </div>
    </header>
  );
}
