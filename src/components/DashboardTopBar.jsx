import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

/**
 * DashboardTopBar
 *
 * Streamlined horizontal bar positioned directly above the MapLibre viewport.
 * Redundant tab buttons have been removed (handled by the vertical dock).
 * Includes an interactive calendar popover for NWP forecast run selection.
 */
export default function DashboardTopBar({ onResetMap }) {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 9, 24)); // 24 Oct 2024
  const [selectedCycle, setSelectedCycle] = useState('06:00 UTC');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  const SYNOPTIC_CYCLES = ['00:00 UTC', '06:00 UTC', '12:00 UTC', '18:00 UTC'];

  // Close calendar popover on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleQuickPreset = (offsetDays) => {
    const base = new Date(2024, 9, 24);
    base.setDate(base.getDate() + offsetDays);
    setSelectedDate(base);
    setIsCalendarOpen(false);
  };

  return (
    <header className="w-full z-30 shrink-0">
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-2xl bg-[#121212]/90 backdrop-blur-xl border border-[#262626]/80 shadow-lg">
        {/* Left: Brand Title & Live Pulse Badge */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2.5">
            <img src="/weather.png" alt="ClimaFuse Icon" className="w-6 h-6 object-contain rounded-full shadow-sm ring-1 ring-white/10" />
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold tracking-tight text-white hover:text-[#4edea3] transition-colors">
              ClimaFuse
            </span>
            <span className="text-[#444748] font-mono text-xs">/</span>
            <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest uppercase">
              AI-NWP PLATFORM
            </span>
          </Link>
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#1b2a22] border border-[#4edea3]/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4edea3]" />
            </span>
            <span className="font-mono text-[10px] text-[#4edea3] tracking-wider font-semibold">LIVE</span>
          </div>
        </div>

        {/* Right: Operational Telemetry Badge, Interactive Calendar Dropdown & Settings */}
        <div className="flex items-center space-x-2.5 relative" ref={calendarRef}>
          {/* Hybrid EPS Mode Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
            <span className="text-[#a3a3a3]">
              OPERATIONAL · <strong className="text-white font-medium">0.05° EPS</strong>
            </span>
          </div>

          {/* Interactive Date & Time Selector Button */}
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`flex items-center px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-mono text-[11px] space-x-2 ${
              isCalendarOpen
                ? 'bg-[#2a2a2a] border-white text-white shadow-md'
                : 'bg-[#1c1c1c] border-[#2e2e2e] text-[#e5e2e1] hover:border-[#444748] hover:bg-[#252525]'
            }`}
            title="Click to change Forecast Run date or synoptic cycle"
          >
            <span className="material-symbols-outlined text-[#4edea3] text-[15px]">calendar_today</span>
            <span className="font-medium text-white tracking-wide uppercase">
              {format(selectedDate, 'dd MMM yyyy')}
            </span>
            <span className="text-[#555] font-mono">·</span>
            <span className="text-[#4edea3] font-semibold">{selectedCycle}</span>
            <span className={`material-symbols-outlined text-[14px] text-[#8e9192] transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>

          {/* Settings / Reset View Button */}
          <button
            onClick={onResetMap}
            className="p-1.5 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] text-[#8e9192] hover:text-white hover:border-[#444748] transition-colors cursor-pointer"
            title="Reset Map Bounds"
          >
            <span className="material-symbols-outlined text-[17px]">tune</span>
          </button>

          {/* DROPDOWN CALENDAR POPOVER */}
          {isCalendarOpen && (
            <div className="absolute right-0 top-12 z-50 w-[330px] rounded-2xl bg-[#111111] border border-[#2e2e2e] p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
              {/* Popover Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#262626] mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4edea3] text-[16px]">schedule</span>
                  <span className="font-mono text-xs text-white font-semibold uppercase tracking-wider">
                    Synoptic Run Cycle
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#8e9192]">ECMWF EPS</span>
              </div>

              {/* Synoptic Cycle Buttons (00Z, 06Z, 12Z, 18Z) */}
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {SYNOPTIC_CYCLES.map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setSelectedCycle(cycle)}
                    className={`py-1 rounded-lg font-mono text-[10px] transition-all cursor-pointer ${
                      selectedCycle === cycle
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'bg-[#1b1b1b] text-[#a3a3a3] hover:text-white hover:bg-[#252525] border border-[#262626]'
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>

              {/* DayPicker Calendar */}
              <div className="flex justify-center calendar-dark-theme mb-3">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  defaultMonth={selectedDate}
                  className="font-sans text-xs text-white"
                />
              </div>

              {/* Quick Preset Chips */}
              <div className="pt-2.5 border-t border-[#262626] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#8e9192]">Presets:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleQuickPreset(0)}
                    className="px-2 py-0.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[10px] font-mono text-white border border-[#333] transition-colors cursor-pointer"
                  >
                    T+0
                  </button>
                  <button
                    onClick={() => handleQuickPreset(1)}
                    className="px-2 py-0.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[10px] font-mono text-white border border-[#333] transition-colors cursor-pointer"
                  >
                    +24h
                  </button>
                  <button
                    onClick={() => handleQuickPreset(2)}
                    className="px-2 py-0.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[10px] font-mono text-white border border-[#333] transition-colors cursor-pointer"
                  >
                    +48h
                  </button>
                  <button
                    onClick={() => handleQuickPreset(3)}
                    className="px-2 py-0.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[10px] font-mono text-white border border-[#333] transition-colors cursor-pointer"
                  >
                    +72h
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
