import React, { useState } from 'react';

/**
 * NationalOverviewPanel
 *
 * Subcontinental Meteorological Telemetry & All-India IMD Warning Command Center.
 * Displayed on the right workstation dock when no individual city station is selected.
 *
 * Features:
 * 1. Subcontinental synoptic mesh status & EPS blend reliability.
 * 2. Multi-layer atmospheric telemetry breakdown (Thermal, Precipitation, Heat Index)
 *    with interactive layer activation on the MapLibre map.
 * 3. All-India IMD Warning Bulletins & Alert Tier breakdown across the reference stations.
 * 4. Interactive station cards that seamlessly switch to detailed station telemetry on click.
 */

// Synoptic summary metrics for the three atmospheric map layers
const LAYER_METRICS = {
  temperature: {
    id: 'temperature',
    title: 'Subcontinental Thermal',
    label: 'Thermal',
    icon: 'thermostat',
    unit: '°C',
    mean: '28.4°C',
    peak: { val: '36.8°C', location: 'Jaisalmer (Thar)' },
    min: { val: '11.2°C', location: 'Leh (Ladakh)' },
    gradient: 'Strong diurnal flux (+18.4°C swing) in NW arid zone; maritime stability along peninsular coastline.',
    highlights: [
      { label: 'Thar & Kutch Basin', val: '34°–37°C', status: 'Elevated' },
      { label: 'Indo-Gangetic Plain', val: '27°–31°C', status: 'Seasonal' },
      { label: 'Himalayan Arc', val: '11°–18°C', status: 'Cold Sink' },
    ],
    gradientCss: 'from-blue-500 via-emerald-400 via-yellow-400 via-orange-500 to-red-500',
    scaleMin: '10°C',
    scaleMax: '40°C+',
  },
  rainfall: {
    id: 'rainfall',
    title: '24-Hour Precipitation Inflow',
    label: 'Precipitation',
    icon: 'rainy',
    unit: 'mm',
    mean: '34.2 mm',
    peak: { val: '165.0 mm', location: 'Cherrapunji (Khasi Hills)' },
    min: { val: '0.0 mm', location: 'Thar Core Basin' },
    gradient: 'Intense orographic lifting along Western Ghats escarpment & Bay of Bengal moisture corridor in Northeast.',
    highlights: [
      { label: 'Konkan Escarpment', val: '88–115 mm', status: 'Squall / Red' },
      { label: 'Meghalaya Plateau', val: '110–165 mm', status: 'Heavy Inflow' },
      { label: 'Deccan Rainshadow', val: '<2.0 mm', status: 'Dry Deficit' },
    ],
    gradientCss: 'from-sky-400 via-blue-600 to-indigo-700',
    scaleMin: '0 mm',
    scaleMax: '120+ mm',
  },
  heatmap: {
    id: 'heatmap',
    title: 'Biometeorological Heat Index',
    label: 'Heat Index',
    icon: 'whatshot',
    unit: '°C HI',
    mean: '33.1°C',
    peak: { val: '41.2°C', location: 'Mumbai Coastal Strip' },
    min: { val: '11.0°C', location: 'Leh High Altitude' },
    gradient: 'Extreme caution threshold exceeded in humid littoral zones due to high dew points (>25°C) trapping heat.',
    highlights: [
      { label: 'Mumbai & Konkan', val: '41.2°C HI', status: 'Ext. Caution' },
      { label: 'Chennai Coast', val: '39.8°C HI', status: 'Caution' },
      { label: 'Deccan Uplands', val: '23°–28°C HI', status: 'Comfortable' },
    ],
    gradientCss: 'from-emerald-500 via-yellow-400 via-orange-500 via-red-500 to-purple-600',
    scaleMin: '20°C Normal',
    scaleMax: '48°C Danger',
  },
};

export default function NationalOverviewPanel({
  cities = [],
  onSelectCity,
  activeOverlay = 'temperature',
  onOverlayChange,
}) {
  const [selectedLayerTab, setSelectedLayerTab] = useState(
    activeOverlay === 'default' ? 'temperature' : activeOverlay
  );
  const [alertFilter, setAlertFilter] = useState('all'); // 'all', 'severe', 'watch', 'nominal'

  // Sync tab with external overlay changes
  const currentMetric = LAYER_METRICS[selectedLayerTab] || LAYER_METRICS.temperature;

  const handleLayerSelect = (layerId) => {
    setSelectedLayerTab(layerId);
    if (onOverlayChange) {
      onOverlayChange(layerId);
    }
  };

  // IMD Alert distribution counts
  const alertCounts = {
    red: cities.filter((c) => c.alertTier === 'Red').length,
    orange: cities.filter((c) => c.alertTier === 'Orange').length,
    yellow: cities.filter((c) => c.alertTier === 'Yellow').length,
    green: cities.filter((c) => c.alertTier === 'Green').length,
  };

  // Filter cities by alert severity
  const filteredCities = cities.filter((city) => {
    if (alertFilter === 'severe') return city.alertTier === 'Red' || city.alertTier === 'Orange';
    if (alertFilter === 'watch') return city.alertTier === 'Yellow';
    if (alertFilter === 'nominal') return city.alertTier === 'Green';
    return true; // 'all'
  });

  return (
    <aside
      className="w-full lg:w-[420px] h-full flex flex-col justify-between rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-[#262626] p-4 lg:p-5 shadow-2xl overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#262626]"
      aria-label="All-India Meteorological Overview & Warnings"
    >
      {/* 1. Subcontinental Mesh Header */}
      <div className="pb-3 border-b border-[#262626]/60">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-white tracking-tight">
                All-India Synoptic Mesh
              </h2>
            </div>
            <p className="font-sans text-[11px] text-[#8e9192] mt-1 flex items-center gap-1.5">
              <span>842 IMD AWS Stations</span>
              <span className="text-[#444748] font-mono">·</span>
              <span className="font-mono text-[#4edea3]">0.05° EPS VERONA</span>
            </p>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#1b2a22] border border-[#4edea3]/30 text-[#4edea3] font-semibold">
            LIVE MESH
          </span>
        </div>

        {/* Synoptic Model Blend Status */}
        <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-[#181818] border border-[#262626] flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#8e9192]">AI-NWP Consensus Blend</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <span className="text-[#4edea3]">96.4%</span>
            <span className="text-[#8e9192] text-[10px]">Reliability</span>
          </span>
        </div>
      </div>

      {/* 2. Atmospheric Map Layers & Subcontinental Telemetry */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-wider font-semibold">
            Atmospheric Map Layers
          </span>
          <span className="font-mono text-[10px] text-[#4edea3]">
            {activeOverlay === selectedLayerTab ? '● Synced to Map' : 'Click to Plot'}
          </span>
        </div>

        {/* 3 Layer Switcher Buttons (Thermal, Precipitation, Heat Index) */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#181818] border border-[#262626]">
          {[
            { id: 'temperature', label: 'Thermal', icon: 'thermostat' },
            { id: 'rainfall', label: 'Precipitation', icon: 'rainy' },
            { id: 'heatmap', label: 'Heat Index', icon: 'whatshot' },
          ].map((tab) => {
            const isSelected = selectedLayerTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleLayerSelect(tab.id)}
                className={`flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-[#a3a3a3] hover:text-white hover:bg-[#222]'
                }`}
                title={`Display ${tab.label} Map & Telemetry`}
              >
                <span className="material-symbols-outlined text-[14px]">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Telemetry Card */}
        <div className="p-3.5 rounded-xl bg-[#181818] border border-[#262626] space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#262626]/50 pb-2">
            <div>
              <span className="font-mono text-[10px] text-[#8e9192] uppercase">
                {currentMetric.title}
              </span>
              <div className="flex items-baseline space-x-2 mt-0.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-white">
                  {currentMetric.mean}
                </span>
                <span className="text-xs text-[#a3a3a3] font-mono">National Mean</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[10px] text-[#8e9192] block">National Peak</span>
              <span className="font-mono text-xs font-bold text-[#f97316]">
                {currentMetric.peak.val}
              </span>
              <span className="font-mono text-[9px] text-[#8e9192] block truncate max-w-[120px]">
                {currentMetric.peak.location}
              </span>
            </div>
          </div>

          {/* Regional Microclimate Highlights */}
          <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
            {currentMetric.highlights.map((h, i) => (
              <div key={i} className="p-1.5 rounded-lg bg-[#201f1f] border border-[#262626]">
                <span className="text-[9px] text-[#8e9192] block truncate">{h.label}</span>
                <span className="text-xs font-bold text-white block mt-0.5">{h.val}</span>
                <span className="text-[9px] text-[#4edea3] block">{h.status}</span>
              </div>
            ))}
          </div>

          {/* Layer Gradient Scale Bar */}
          <div className="pt-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#8e9192] mb-1">
              <span>{currentMetric.scaleMin}</span>
              <span className="text-[#a3a3a3]">{currentMetric.label} Gradient</span>
              <span>{currentMetric.scaleMax}</span>
            </div>
            <div
              className={`w-full h-2 rounded-full bg-gradient-to-r ${currentMetric.gradientCss} border border-white/20`}
            />
          </div>

          {/* Synoptic Meteorological Dynamics */}
          <p className="font-sans text-[11px] text-[#a3a3a3] leading-relaxed pt-1 border-t border-[#262626]/40">
            {currentMetric.gradient}
          </p>
        </div>
      </div>

      {/* 3. All-India IMD Warning Bulletins & City Alert Tiers */}
      <div className="space-y-2.5 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#f97316]">warning</span>
            <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-wider font-semibold">
              IMD Warning Bulletins ({cities.length} Reference Stations)
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#ef4444] font-semibold">
            {alertCounts.red + alertCounts.orange} SEVERE
          </span>
        </div>

        {/* Severity Distribution Pills */}
        <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
          <div
            onClick={() => setAlertFilter(alertFilter === 'severe' ? 'all' : 'severe')}
            className={`p-1.5 rounded-lg border cursor-pointer transition-all ${
              alertFilter === 'severe'
                ? 'bg-[#ef4444]/25 border-[#ef4444] text-white shadow-sm'
                : 'bg-[#181818] border-[#ef4444]/40 text-[#ef4444] hover:bg-[#201515]'
            }`}
          >
            <span className="font-bold block">{alertCounts.red} RED</span>
            <span className="text-[9px] text-[#8e9192]">Warning</span>
          </div>

          <div
            onClick={() => setAlertFilter(alertFilter === 'severe' ? 'all' : 'severe')}
            className={`p-1.5 rounded-lg border cursor-pointer transition-all ${
              alertFilter === 'severe'
                ? 'bg-[#f97316]/25 border-[#f97316] text-white shadow-sm'
                : 'bg-[#181818] border-[#f97316]/40 text-[#f97316] hover:bg-[#221810]'
            }`}
          >
            <span className="font-bold block">{alertCounts.orange} ORANGE</span>
            <span className="text-[9px] text-[#8e9192]">Alert</span>
          </div>

          <div
            onClick={() => setAlertFilter(alertFilter === 'watch' ? 'all' : 'watch')}
            className={`p-1.5 rounded-lg border cursor-pointer transition-all ${
              alertFilter === 'watch'
                ? 'bg-[#fbbf24]/25 border-[#fbbf24] text-white shadow-sm'
                : 'bg-[#181818] border-[#fbbf24]/40 text-[#fbbf24] hover:bg-[#201d12]'
            }`}
          >
            <span className="font-bold block">{alertCounts.yellow} YELLOW</span>
            <span className="text-[9px] text-[#8e9192]">Watch</span>
          </div>

          <div
            onClick={() => setAlertFilter(alertFilter === 'nominal' ? 'all' : 'nominal')}
            className={`p-1.5 rounded-lg border cursor-pointer transition-all ${
              alertFilter === 'nominal'
                ? 'bg-[#10b981]/25 border-[#10b981] text-white shadow-sm'
                : 'bg-[#181818] border-[#10b981]/40 text-[#10b981] hover:bg-[#122018]'
            }`}
          >
            <span className="font-bold block">{alertCounts.green} GREEN</span>
            <span className="text-[9px] text-[#8e9192]">Normal</span>
          </div>
        </div>

        {/* Filter Reset / Count Row */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8e9192] px-1">
          <span>
            Showing <strong className="text-white">{filteredCities.length}</strong> stations
          </span>
          {alertFilter !== 'all' && (
            <button
              onClick={() => setAlertFilter('all')}
              className="text-[#4edea3] hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Interactive Clickable City Warning Cards List */}
        <div className="space-y-2 overflow-y-auto max-h-[300px] lg:max-h-[360px] pr-1 scrollbar-thin scrollbar-thumb-[#262626]">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => onSelectCity && onSelectCity(city)}
              className="group p-3 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#262626] hover:border-white/40 transition-all cursor-pointer shadow-sm relative overflow-hidden"
              title={`Click to open full station telemetry for ${city.name}`}
            >
              {/* Left Color Severity Pip Strip */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: city.alertColor }}
              />

              {/* Station Card Header */}
              <div className="flex items-start justify-between pl-1">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: city.alertColor,
                        animation:
                          city.alertTier === 'Red' || city.alertTier === 'Orange'
                            ? 'pulse 1.8s infinite'
                            : 'none',
                      }}
                    />
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-white group-hover:text-[#4edea3] transition-colors">
                      {city.name}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#252525] text-[#8e9192]">
                      {city.awsId}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#8e9192] pl-4 mt-0.5 truncate max-w-[210px]">
                    {city.state}
                  </p>
                </div>

                {/* Temp & Icon */}
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <span className="material-symbols-outlined text-[16px] text-white">
                      {city.icon}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {city.temp}°C
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8e9192] block">
                    Δ {city.delta.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* IMD Bulletin Description */}
              <div className="mt-2 pl-1 pt-1.5 border-t border-[#262626]/40 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-wider px-1 rounded"
                      style={{
                        backgroundColor: `${city.alertColor}20`,
                        color: city.alertColor,
                      }}
                    >
                      {city.alertTier}
                    </span>
                    <span className="font-sans text-[11px] text-[#d4d4d4] truncate block">
                      {city.alertDesc}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center text-[#8e9192] group-hover:text-white group-hover:translate-x-0.5 transition-all font-mono text-[10px]">
                  <span>Telemetry</span>
                  <span className="material-symbols-outlined text-[13px] ml-0.5">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Information & Action Bar */}
      <div className="pt-2 border-t border-[#262626]/60">
        <div className="p-2.5 rounded-xl bg-[#181818]/60 border border-[#262626]/40 flex items-center justify-between text-[11px] font-mono text-[#8e9192]">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#4edea3]">touch_app</span>
            <span>Click any station or map node for radiosonde</span>
          </span>
          <span className="text-[#a3a3a3]">10 Cities Active</span>
        </div>
      </div>
    </aside>
  );
}
