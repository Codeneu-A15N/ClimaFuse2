import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StationTopBar from '../components/StationTopBar';
import StationSummaryBanner from '../components/StationSummaryBanner';
import StationParameterGrid from '../components/StationParameterGrid';
import StationCharts from '../components/StationCharts';
import StationReasoningAndScorecard from '../components/StationReasoningAndScorecard';
import StationRadiosonde from '../components/StationRadiosonde';
import { getStationAnalysis, exportStationCSV } from '../api/stationAnalysisData';

export default function StationAnalysisPage() {
  const { cityId } = useParams();
  const station = getStationAnalysis(cityId);
  const [activeView, setActiveView] = useState('all'); // 'all', 'charts', 'radiosonde'
  const [forecastCycle, setForecastCycle] = useState('Operational Forecast');
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0a] text-[#e5e2e1] antialiased min-h-screen selection:bg-[#2a2a2a] selection:text-white font-sans flex flex-col">
      {/* ────────────────────────────────────────────────────────── */}
      {/* FLOATING VERTICAL ICON-ONLY DOCK (Matches Stitch Design)   */}
      {/* ────────────────────────────────────────────────────────── */}
      <aside
        className="fixed top-1/2 -translate-y-1/2 left-3 lg:left-4 z-50 flex flex-col items-center gap-2.5 p-2 rounded-2xl bg-[#121212]/95 border-2 border-white shadow-2xl shadow-black/80 backdrop-blur-md"
        aria-label="Navigation Dock"
      >
        {/* Brand Anchor Mini Icon */}
        <Link
          to="/dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-neutral-950 font-bold text-sm mb-1 hover:bg-[#e2e2e2] transition-colors"
          title="ClimaFuse Dashboard"
        >
          CF
        </Link>

        {/* 1. Severe Alerts */}
        <Link
          to="/dashboard?tab=alerts"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-[#a3a3a3] hover:bg-[#201f1f] hover:text-white transition-colors"
          title="Active Alerts"
        >
          <span className="material-symbols-outlined text-[20px] text-[#f97316]">warning</span>
        </Link>

        {/* 2. Model Analysis / Comparison */}
        <Link
          to="/dashboard?tab=comparison"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-[#a3a3a3] hover:bg-[#201f1f] hover:text-white transition-colors"
          title="Model Comparison"
        >
          <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
        </Link>

        {/* 3. Station Detail / Station Analysis (ACTIVE) */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2a2a2a] text-white border border-[#353534] shadow-inner transition-colors"
          title="Station Analysis (Active)"
        >
          <span className="material-symbols-outlined text-[20px] text-[#4edea3]">travel_explore</span>
        </button>

        <div className="w-6 h-px bg-white/20 my-1"></div>

        {/* Home / Overview */}
        <Link
          to="/"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-[#8e9192] hover:text-white hover:bg-[#201f1f] transition-colors"
          title="Platform Landing Page"
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
        </Link>
      </aside>

      {/* ────────────────────────────────────────────────────────── */}
      {/* TOP HORIZONTAL UTILITY BAR                                */}
      {/* ────────────────────────────────────────────────────────── */}
      <StationTopBar
        station={station}
        currentCycle={forecastCycle}
        onCycleChange={(cycle) => setForecastCycle(cycle)}
      />

      {/* ────────────────────────────────────────────────────────── */}
      {/* MAIN VIEWPORT CONTAINER                                    */}
      {/* ────────────────────────────────────────────────────────── */}
      <main className="pl-16 sm:pl-20 lg:pl-24 pr-4 sm:pr-6 lg:pr-8 py-6 max-w-[1680px] w-full mx-auto space-y-6 flex-1">
        {/* 1. Page Header & Station Summary Banner */}
        <StationSummaryBanner station={station} />

        {/* 2. Parameter Summary Row (5 Cards) */}
        <StationParameterGrid summaryCards={station.summaryCards} />

        {/* 3. Section Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="inline-flex p-1 rounded-xl bg-[#121212] border border-[#262626] text-xs font-mono">
            <button
              onClick={() => setActiveView('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === 'all'
                  ? 'bg-[#252525] text-white font-semibold shadow-sm'
                  : 'text-[#8e9192] hover:text-white'
              }`}
            >
              All Station Analytics
            </button>
            <button
              onClick={() => setActiveView('charts')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === 'charts'
                  ? 'bg-[#252525] text-white font-semibold shadow-sm'
                  : 'text-[#8e9192] hover:text-white'
              }`}
            >
              Synoptic Timeseries &amp; Hyetograph
            </button>
            <button
              onClick={() => setActiveView('radiosonde')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === 'radiosonde'
                  ? 'bg-[#252525] text-white font-semibold shadow-sm'
                  : 'text-[#8e9192] hover:text-white'
              }`}
            >
              Radiosonde Sounding
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#8e9192]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Station ID: <strong className="text-white">{station.wmoId}</strong></span>
            <span className="text-[#383838]">·</span>
            <span>Ground Truth AWS: <strong className="text-[#4edea3]">Calibrated</strong></span>
          </div>
        </div>

        {/* 4. Timeseries Graphs (Temperature, Heat Index, Precipitation) */}
        {(activeView === 'all' || activeView === 'charts') && (
          <StationCharts station={station} />
        )}

        {/* 5. Radiosonde Sounding Profile */}
        {(activeView === 'all' || activeView === 'radiosonde') && (
          <StationRadiosonde station={station} />
        )}

        {/* 6. Two-Column Bottom Section: Reasoning & Accuracy Scorecard */}
        <StationReasoningAndScorecard station={station} />

        {/* 7. Footer Telemetry Anchor */}
        <footer className="pt-6 pb-12 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8e9192] font-mono gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-medium">ClimaFuse Meteorological Intelligence</span>
            <span>·</span>
            <span>IMD {station.name} ({station.awsId}) Telemetry Feed</span>
            <span>·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Online &amp; Synchronized
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Cycle Latency: 142ms</span>
            <span>·</span>
            <span>Data standard: WMO BUFR / NetCDF4</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
