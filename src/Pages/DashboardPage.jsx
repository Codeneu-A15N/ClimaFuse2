import React, { useState } from 'react';
import DashboardNavDock from '../components/DashboardNavDock';
import DashboardTopBar from '../components/DashboardTopBar';
import MapComponent from '../components/MapComponent';
import StationTelemetryPanel from '../components/StationTelemetryPanel';
import { CITIES } from '../api/cities';

export default function DashboardPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="bg-[#131313] text-[#e5e2e1] antialiased overflow-hidden w-screen h-screen select-none font-sans flex flex-col">
      {/* COMPACT VERTICALLY CENTERED FLOATING LEFT NAVIGATION DOCK */}
      <DashboardNavDock activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 w-full pl-16 pr-5 py-2.5 min-h-0 flex gap-3.5 overflow-hidden z-20">
        {activeTab === 'map' && (
          <>
            {/* LEFT / CENTER COLUMN: TopBar + MapLibre GL India Map Container */}
            <div className="relative flex-1 h-full flex flex-col gap-2.5 min-h-0 min-w-0">
              {/* TOP NAVBAR (Takes required space above map only) */}
              <DashboardTopBar onResetMap={() => setSelectedCity(CITIES[0])} />

              {/* MapComponent Instance */}
              <div className="relative flex-1 w-full min-h-0">
                <MapComponent
                  selectedCity={selectedCity}
                  onCityClick={(city) => setSelectedCity(city)}
                  cities={CITIES}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Station Telemetry Panel (Takes full upper vertical space available) */}
            <div className="w-full lg:w-[420px] shrink-0 h-full flex flex-col min-h-0">
              <StationTelemetryPanel city={selectedCity} />
            </div>
          </>
        )}

        {activeTab === 'comparison' && (
          <div className="flex-1 h-full flex flex-col gap-2.5 min-h-0 min-w-0">
            <DashboardTopBar onResetMap={() => setActiveTab('map')} />
            <div className="flex-1 h-full rounded-2xl bg-[#0e0e0e] border border-[#262626]/70 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-6">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-white">
                      Multi-Model Convergence &amp; Skill Verification
                    </h2>
                    <p className="font-sans text-sm text-[#a3a3a3] mt-1">
                      Continuous Ranked Probability Score (CRPS) and RMSE benchmarks across lead times (T+0h to T+240h).
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-4 py-1.5 rounded-full bg-[#201f1f] border border-[#262626] text-sm text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    Back to Live Map
                  </button>
                </div>

                {/* Model Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                    <div className="font-mono text-xs text-[#a3a3a3] mb-1">PHYSICS NWP</div>
                    <h3 className="text-xl font-bold text-white mb-2">ECMWF IFS HRES</h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">
                      High-res deterministic atmospheric conservation dynamics. Superior cyclonic track trajectory accuracy.
                    </p>
                    <div className="pt-3 border-t border-[#262626] flex justify-between text-xs font-mono">
                      <span className="text-[#8e9192]">RMSE (Z500)</span>
                      <span className="text-white font-semibold">14.2 m</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                    <div className="font-mono text-xs text-[#a3a3a3] mb-1">DEEP LEARNING NWP</div>
                    <h3 className="text-xl font-bold text-white mb-2">ECMWF AIFS</h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">
                      Graph Neural Network trained on 44 years of ERA5 reanalysis. 98.4% faster computation with lower RMSE at T+120h.
                    </p>
                    <div className="pt-3 border-t border-[#262626] flex justify-between text-xs font-mono">
                      <span className="text-[#8e9192]">RMSE (Z500)</span>
                      <span className="text-[#4edea3] font-semibold">12.8 m</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#121212] border border-[#4edea3]/40 shadow-lg">
                    <div className="font-mono text-xs text-[#4edea3] mb-1">DYNAMIC ENSEMBLE</div>
                    <h3 className="text-xl font-bold text-white mb-2">ClimaFuse BMA</h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">
                      Adaptive Bayesian Model Averaging calibrated by 800+ IMD AWS ground observations.
                    </p>
                    <div className="pt-3 border-t border-[#262626] flex justify-between text-xs font-mono">
                      <span className="text-[#4edea3]">CRPS Skill Score</span>
                      <span className="text-white font-semibold">+18.4% gain</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="flex-1 h-full flex flex-col gap-2.5 min-h-0 min-w-0">
            <DashboardTopBar onResetMap={() => setActiveTab('map')} />
            <div className="flex-1 h-full rounded-2xl bg-[#0e0e0e] border border-[#262626]/70 p-6 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-6">
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-white flex items-center gap-3">
                    Active IMD Bulletins &amp; Severe Warnings
                    <span className="px-2 py-0.5 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] text-xs font-mono font-bold">
                      2 ACTIVE
                    </span>
                  </h2>
                  <p className="font-sans text-sm text-[#a3a3a3] mt-1">
                    Standard IMD 4-tier color code alert system verified against real-time automatic weather station feeds.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="px-4 py-1.5 rounded-full bg-[#201f1f] border border-[#262626] text-sm text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  Back to Live Map
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#1c1212] border border-[#ef4444]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#ef4444] font-bold tracking-wider">
                      IMD LEVEL 4 WARNING — RED ALERT
                    </span>
                    <span className="font-mono text-xs text-[#a3a3a3]">BULLETIN #849</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Konkan Heavy Precipitation &amp; Squall Wind Event
                  </h3>
                  <p className="text-sm text-[#d4d4d4] mb-3">
                    Affecting: Mumbai, Thane, Raigad, Ratnagiri. Expected rainfall &gt;200mm in 24 hours with wind gusts reaching 65 km/h.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#a3a3a3]">
                    <span>Valid: 24 Oct 06:00 UTC – 25 Oct 06:00 UTC</span>
                    <span>•</span>
                    <span className="text-[#ef4444]">Action: Take Action / Evacuate Lowlands</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1c1810] border border-[#f97316]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#f97316] font-bold tracking-wider">
                      IMD LEVEL 3 ALERT — ORANGE ALERT
                    </span>
                    <span className="font-mono text-xs text-[#a3a3a3]">BULLETIN #848</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Aravalli Convective Instability &amp; Gust Front
                  </h3>
                  <p className="text-sm text-[#d4d4d4] mb-3">
                    Affecting: Jaipur, Ajmer, Sikar. Rapid temperature gradient leading to isolated thunderstorms and dry squalls.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#a3a3a3]">
                    <span>Valid: 24 Oct 12:00 UTC – 24 Oct 21:00 UTC</span>
                    <span>•</span>
                    <span className="text-[#f97316]">Action: Be Prepared / Secure Infrastructure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="flex-1 h-full flex flex-col gap-2.5 min-h-0 min-w-0">
            <DashboardTopBar onResetMap={() => setActiveTab('map')} />
            <div className="flex-1 h-full rounded-2xl bg-[#0e0e0e] border border-[#262626]/70 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-6">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-white">
                      Synoptic Meteorology &amp; Boundary Layer Dynamics
                    </h2>
                    <p className="font-sans text-sm text-[#a3a3a3] mt-1">
                      Upper air jet streams, 850 hPa moisture convergence, and Western Disturbance tracking.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-4 py-1.5 rounded-full bg-[#201f1f] border border-[#262626] text-sm text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                  >
                    Back to Live Map
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                    <h3 className="font-mono text-sm text-[#4edea3] mb-2 uppercase">
                      Subtropical Westerly Jet (200 hPa)
                    </h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">
                      Core velocity: 110 knots over Jammu &amp; Kashmir at 34°N. Trough axis extending southwards toward Northern Rajasthan.
                    </p>
                    <div className="font-mono text-xs text-white">Status: Stable Zonal Flow</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                    <h3 className="font-mono text-sm text-[#38bdf8] mb-2 uppercase">
                      Arabian Sea Moisture Transport (850 hPa)
                    </h3>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">
                      Integrated water vapor transport (IVT) exceeding 650 kg/m/s colliding with Western Ghats escarpment.
                    </p>
                    <div className="font-mono text-xs text-white">Status: Strong Orographic Forcing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
