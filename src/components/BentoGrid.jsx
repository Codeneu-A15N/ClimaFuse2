import React from 'react';

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
      {/* Card 1: Blended Forecast (Span 7) */}
      <div className="md:col-span-6 lg:col-span-7 p-6 rounded-2xl bg-[#111111] border border-[#262626] hover:border-[#8e9192]/60 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-white">grain</span>
            <span className="font-mono text-[0.6875rem] text-[#4edea3] font-semibold tracking-wider uppercase">
              PRIMARY PRODUCT
            </span>
          </div>
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-semibold text-white mb-2 tracking-tight">
            Blended Probabilistic Forecast
          </h3>
          <p className="font-sans text-[0.9375rem] text-[#a3a3a3] leading-relaxed mb-6">
            High-resolution surface temperature, total accumulated precipitation, 10m wind gust vectors, and planetary boundary layer height. Delivers calibrated P10, P50, and P90 confidence intervals for risk mitigation.
          </p>
        </div>

        {/* Synthetic Telemetry Bar Graphic */}
        <div className="bg-[#181818] p-4 rounded-xl border border-[#262626]">
          <div className="flex justify-between items-center font-mono text-[0.6875rem] mb-2">
            <span className="text-[#e5e2e1]">SYNTHESIS DISTRIBUTION // MUMBAI AWS</span>
            <span className="text-white font-mono font-medium">CONFIDENCE 96.1%</span>
          </div>
          <div className="w-full bg-[#222222] h-2 rounded-full overflow-hidden flex">
            <div className="bg-white h-full transition-all duration-500" style={{ width: '58%' }} title="IFS Weight: 58%" />
            <div className="bg-[#8e9192] h-full transition-all duration-500" style={{ width: '42%' }} title="AIFS Weight: 42%" />
          </div>
          <div className="flex justify-between items-center font-mono text-[0.6875rem] text-[#8e9192] mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white inline-block" /> IFS (Physics): 58%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8e9192] inline-block" /> AIFS (AI): 42%
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Spatiotemporal Weight Maps (Span 5) */}
      <div className="md:col-span-6 lg:col-span-5 p-6 rounded-2xl bg-[#111111] border border-[#262626] hover:border-[#8e9192]/60 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-white">pie_chart</span>
            <span className="font-mono text-[0.6875rem] text-[#8e9192] uppercase tracking-wider">
              TRANSPARENCY
            </span>
          </div>
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-semibold text-white mb-2 tracking-tight">
            Spatiotemporal Weight Maps
          </h3>
          <p className="font-sans text-[0.9375rem] text-[#a3a3a3] leading-relaxed">
            Transparent, cell-by-cell inspection of model attribution. Understand whether physics or neural logic is dictating the meteorological forecast in any given district.
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between font-mono text-[0.6875rem]">
          <span className="text-[#8e9192]">Attribution Diagnostics</span>
          <span className="text-white">Cartesian &amp; Zonal</span>
        </div>
      </div>

      {/* Card 3: IMD Severity Alerts (Span 4) */}
      <div className="md:col-span-6 lg:col-span-4 p-6 rounded-2xl bg-[#111111] border border-[#262626] hover:border-[#8e9192]/60 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-white">emergency</span>
            <span className="font-mono text-[0.6875rem] text-[#8e9192] uppercase tracking-wider">
              STANDARDS COMPLIANT
            </span>
          </div>
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-semibold text-white mb-2">
            IMD Severity Alerts
          </h3>
          <p className="font-sans text-[0.8125rem] text-[#a3a3a3] leading-relaxed mb-4">
            Direct mapping of probabilistic threshold exceedances into official IMD 4-tier risk categories with zero ambiguity.
          </p>
        </div>
        {/* Color Tiers Minimalist Badges */}
        <div className="grid grid-cols-2 gap-2 font-mono text-[0.6875rem]">
          <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-[#e5e2e1]">Green (Clear)</span>
          </div>
          <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <span className="text-[#e5e2e1]">Yellow (Watch)</span>
          </div>
          <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span className="text-[#e5e2e1]">Orange (Alert)</span>
          </div>
          <div className="p-2 rounded bg-[#121212] border border-[#262626] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <span className="text-[#e5e2e1]">Red (Warning)</span>
          </div>
        </div>
      </div>

      {/* Card 4: Model Comparison & Hindcast History (Span 4) */}
      <div className="md:col-span-6 lg:col-span-4 p-6 rounded-2xl bg-[#111111] border border-[#262626] hover:border-[#8e9192]/60 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-white">timeline</span>
            <span className="font-mono text-[0.6875rem] text-[#8e9192] uppercase tracking-wider">
              ANALYTICS
            </span>
          </div>
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-semibold text-white mb-2">
            Model Comparison &amp; Hindcast
          </h3>
          <p className="font-sans text-[0.8125rem] text-[#a3a3a3] leading-relaxed">
            Interactive verification curves benchmarking AI vs Physics against Ground Truth. Evaluate RMSE, Brier Skill Scores, and Anomaly Correlation Coefficients (ACC) over 10-year reanalyses.
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between font-mono text-[0.6875rem]">
          <span className="text-[#8e9192]">Historical Archive</span>
          <span className="text-white">ERA5 Co-calibrated</span>
        </div>
      </div>

      {/* Card 5: Downloadable Data (Span 4) */}
      <div className="md:col-span-6 lg:col-span-4 p-6 rounded-2xl bg-[#111111] border border-[#262626] hover:border-[#8e9192]/60 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-white">database</span>
            <span className="font-mono text-[0.6875rem] text-[#8e9192] uppercase tracking-wider">
              API &amp; SCHEMAS
            </span>
          </div>
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-semibold text-white mb-2">
            Downloadable Data Feeds
          </h3>
          <p className="font-sans text-[0.8125rem] text-[#a3a3a3] leading-relaxed">
            Access programmatic GRIB2, NetCDF4, GeoTIFF, and streamlined REST CSV endpoints for researchers, logistics routing, infrastructure operators, and civic disaster management teams.
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between font-mono text-[0.6875rem]">
          <span className="text-[#8e9192]">Formats</span>
          <span className="text-white font-mono">NetCDF / CSV / GeoJSON</span>
        </div>
      </div>
    </div>
  );
}
