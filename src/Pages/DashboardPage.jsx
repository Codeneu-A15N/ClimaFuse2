import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardNavDock from '../components/DashboardNavDock';
import DashboardTopBar from '../components/DashboardTopBar';
import MapComponent from '../components/MapComponent';
import StationTelemetryPanel from '../components/StationTelemetryPanel';
import NationalOverviewPanel from '../components/NationalOverviewPanel';
import ModelWeightMap from '../components/ModelWeightMap';
import ModelWeightAnalysisPanel from '../components/ModelWeightAnalysisPanel';
import { CITIES } from '../api/cities';
import { WEIGHT_REGIMES } from '../api/modelWeightsData';

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState('temperature');
  const [activeTab, setActiveTab] = useState(
    tabParam && ['map', 'alerts', 'comparison'].includes(tabParam) ? tabParam : 'map'
  );

  useEffect(() => {
    if (tabParam && ['map', 'alerts', 'comparison'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  const [modelWeightRegime, setModelWeightRegime] = useState('thermal');
  const [modelFocus, setModelFocus] = useState('blend');
  const [selectedRegion, setSelectedRegion] = useState('maharashtra');
  const [leadTime, setLeadTime] = useState('24h');

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
              <DashboardTopBar onResetMap={() => setSelectedCity(null)} />

              {/* MapComponent Instance */}
              <div className="relative flex-1 w-full min-h-0">
                <MapComponent
                  selectedCity={selectedCity}
                  onCityClick={(city) => setSelectedCity(city)}
                  layerType={activeOverlay}
                  onLayerChange={(layer) => setActiveOverlay(layer)}
                  cities={CITIES}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: National Overview Panel (Default) or Station Telemetry Panel (When City Clicked) */}
            <div className="w-full lg:w-[420px] shrink-0 h-full flex flex-col min-h-0">
              {selectedCity ? (
                <StationTelemetryPanel
                  city={selectedCity}
                  onBack={() => setSelectedCity(null)}
                />
              ) : (
                <NationalOverviewPanel
                  cities={CITIES}
                  onSelectCity={(city) => setSelectedCity(city)}
                  activeOverlay={activeOverlay}
                  onOverlayChange={(layer) => setActiveOverlay(layer)}
                />
              )}
            </div>
          </>
        )}

        {activeTab === 'comparison' && (
          <>
            {/* LEFT / CENTER COLUMN: TopBar + Prominent Model Weight Map (~60% space) */}
            <div className="relative flex-1 h-full flex flex-col gap-2.5 min-h-0 min-w-0">
              {/* TOP NAVBAR (Takes required space above map only) */}
              <DashboardTopBar onResetMap={() => setActiveTab('map')} />

              {/* ModelWeightMap Instance filling available height & width */}
              <div className="relative flex-1 w-full min-h-0">
                <ModelWeightMap
                  activeRegime={modelWeightRegime}
                  onRegimeChange={(r) => setModelWeightRegime(r)}
                  activeModel={modelFocus}
                  onModelChange={(m) => setModelFocus(m)}
                  selectedRegion={selectedRegion}
                  onSelectRegion={(regId) => setSelectedRegion(regId)}
                  leadTime={leadTime}
                  onLeadTimeChange={(lt) => setLeadTime(lt)}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Dedicated Model Weight Analysis Panel (~40% space) */}
            <div className="w-full lg:w-[420px] xl:w-[450px] 2xl:w-[480px] shrink-0 h-full flex flex-col min-h-0">
              <ModelWeightAnalysisPanel
                selectedRegion={selectedRegion}
                onSelectRegion={(regId) => setSelectedRegion(regId)}
                activeRegime={modelWeightRegime}
                onRegimeChange={(r) => setModelWeightRegime(r)}
                leadTime={leadTime}
                onLeadTimeChange={(lt) => setLeadTime(lt)}
                activeModel={modelFocus}
                onModelChange={(m) => setModelFocus(m)}
              />
            </div>
          </>
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
