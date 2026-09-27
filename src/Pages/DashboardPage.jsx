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

      {/* TOP NAVBAR */}
      <DashboardTopBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 w-full pl-16 pr-5 pb-4 min-h-0 flex gap-4 overflow-hidden z-20">
        {activeTab === 'map' && (
          <>
            {/* LEFT: MapLibre GL India Map Container */}
            <div className="relative flex-1 h-full flex flex-col">
              {/* MapComponent Instance */}
              <MapComponent
                selectedCity={selectedCity}
                onCityClick={(city) => setSelectedCity(city)}
                cities={CITIES}
              />
            </div>

            {/* RIGHT: Station Telemetry & Synoptic Inspection Panel */}
            <StationTelemetryPanel city={selectedCity} />
          </>
        )}

        {activeTab === 'comparison' && (
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
                  <div className="font-mono text-xs text-[#4edea3] mb-1">DEEP NEURAL MODEL</div>
                  <h3 className="text-xl font-bold text-white mb-2">ECMWF AIFS GNN</h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">
                    Graph Neural Network trained on 40-year ERA5 reanalyses. Rapid sub-seasonal thermodynamic convergence.
                  </p>
                  <div className="pt-3 border-t border-[#262626] flex justify-between text-xs font-mono">
                    <span className="text-[#8e9192]">RMSE (Z500)</span>
                    <span className="text-[#4edea3] font-semibold">12.8 m</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                  <div className="font-mono text-xs text-[#f97316] mb-1">REGIONAL CALIBRATION</div>
                  <h3 className="text-xl font-bold text-white mb-2">NCMRWF Unified Model</h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">
                    India-specific orographic parametrization tuned for Himalayan barrier and Western Ghats rainfall.
                  </p>
                  <div className="pt-3 border-t border-[#262626] flex justify-between text-xs font-mono">
                    <span className="text-[#8e9192]">RMSE (Z500)</span>
                    <span className="text-white font-semibold">15.1 m</span>
                  </div>
                </div>
              </div>

              {/* Station Blend Attribution Table */}
              <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-semibold text-white mb-4">
                  Real-time Station Attribution Weights (10 Key Stations)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#262626] text-[#8e9192]">
                        <th className="pb-3">Station Name</th>
                        <th className="pb-3">IMD AWS ID</th>
                        <th className="pb-3">IFS Weight</th>
                        <th className="pb-3">AIFS Weight</th>
                        <th className="pb-3">NCMRWF</th>
                        <th className="pb-3">Reliability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]/50">
                      {CITIES.map((c) => (
                        <tr key={c.id} className="hover:bg-[#181818]/60 transition-colors">
                          <td className="py-2.5 text-white font-medium">{c.name}</td>
                          <td className="py-2.5 text-[#a3a3a3]">{c.awsId}</td>
                          <td className="py-2.5 text-white">{c.blend.ec}%</td>
                          <td className="py-2.5 text-[#4edea3]">{c.blend.ai}%</td>
                          <td className="py-2.5 text-[#8e9192]">{c.blend.ncmrwf}%</td>
                          <td className="py-2.5 text-white font-bold">{c.blend.reliability}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="flex-1 h-full rounded-2xl bg-[#0e0e0e] border border-[#262626]/70 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-white">
                      Active IMD Severe Weather Bulletins
                    </h2>
                  </div>
                  <p className="font-sans text-sm text-[#a3a3a3] mt-1">
                    Multi-model probabilistic threshold warnings mapped to standard 4-tier IMD severity protocol.
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
                {CITIES.filter((c) => c.alertTier !== 'Green').map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-[#121212] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    style={{ borderColor: `${c.alertColor}60` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5"
                        style={{ backgroundColor: `${c.alertColor}25` }}
                      >
                        <span className="material-symbols-outlined text-xl" style={{ color: c.alertColor }}>
                          warning
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white">
                            {c.name} ({c.state})
                          </h3>
                          <span
                            className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${c.alertColor}25`, color: c.alertColor }}
                          >
                            Tier: {c.alertTier}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-[#a3a3a3] mt-1">
                          {c.alertDesc}
                        </p>
                        <div className="flex items-center gap-4 mt-2 font-mono text-xs text-[#8e9192]">
                          <span>Current Temp: {c.temp}°C</span>
                          <span>•</span>
                          <span>Wind: {c.wind} {c.windDir}</span>
                          <span>•</span>
                          <span>Duration: {c.alertDuration}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCity(c);
                        setActiveTab('map');
                      }}
                      className="px-4 py-2 rounded-full bg-white text-[#0a0a0a] font-sans text-xs font-semibold hover:bg-[#e2e2e2] transition-colors cursor-pointer shrink-0"
                    >
                      Focus on Map
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="flex-1 h-full rounded-2xl bg-[#0e0e0e] border border-[#262626]/70 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-6">
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-white">
                    Subcontinental Synoptic Intelligence Brief
                  </h2>
                  <p className="font-sans text-sm text-[#a3a3a3] mt-1">
                    AI-Physics blended meteorological analysis across South Asian synoptic features.
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
                  <span className="font-mono text-xs text-[#4edea3] uppercase">SYNOPTIC FEATURE 01</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">Arabian Sea Anticyclonic Ridge</h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">
                    Persistent subsidence over western India maintains dry tropospheric air across Gujarat and Rajasthan. ECMWF IFS and AIFS demonstrate 98% convergence on low precipitable water.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                  <span className="font-mono text-xs text-[#f97316] uppercase">SYNOPTIC FEATURE 02</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">Bay of Bengal Low Pressure Trough</h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">
                    Convective cyclonic shear anomaly detected off the Andhra-Tamil Nadu coast. Dynamic Bayesian weights shift 58% to physical thermodynamics to preserve vorticity conservation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                  <span className="font-mono text-xs text-[#8e9192] uppercase">SYNOPTIC FEATURE 03</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">Indo-Gangetic Boundary Layer Inversion</h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">
                    Nocturnal radiative cooling traps particulate matter below 300m AGL across the National Capital Region. High confidence in CPCB AQI exceedances through the 06:00 UTC cycle.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626]">
                  <span className="font-mono text-xs text-[#10b981] uppercase">SYNOPTIC FEATURE 04</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">Western Ghats Orographic Lift</h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">
                    Moist south-westerly onshore winds encountering steep topological barriers yield localized convective precipitation clusters along coastal Karnataka and Konkan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
