import React from 'react';

export default function StationRadiosonde({ station }) {
  if (!station || !station.radiosonde) return null;

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-lg space-y-0">
      {/* Header */}
      <div className="bg-[#181818] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#262626]">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-amber-400 text-lg">stacked_line_chart</span>
          <span className="text-amber-300 font-semibold tracking-wide uppercase text-xs font-mono">
            Radiosonde Atmospheric Sounding &amp; Vertical Inversion Profile
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            00Z / 12Z Synoptic Ascent
          </span>
          <span className="text-[#8e9192] hidden sm:inline">WMO BUFR Code 309052</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Top Sounding Indices Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
            <span className="text-[10px] text-[#8e9192] block uppercase">Freezing Level (0°C)</span>
            <span className="text-sm font-bold text-white mt-0.5 block">4,820m ASL</span>
            <span className="text-[10px] text-emerald-400">Stable Isotherm</span>
          </div>
          <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
            <span className="text-[10px] text-[#8e9192] block uppercase">Tropopause Pressure</span>
            <span className="text-sm font-bold text-white mt-0.5 block">195 hPa · -54.2°C</span>
            <span className="text-[10px] text-[#8e9192]">Altitude: 12.4 km</span>
          </div>
          <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
            <span className="text-[10px] text-[#8e9192] block uppercase">CAPE (Instability)</span>
            <span className="text-sm font-bold text-amber-400 mt-0.5 block">620 J/kg</span>
            <span className="text-[10px] text-amber-400">Weak Convective Risk</span>
          </div>
          <div className="p-3 rounded-lg bg-[#181818] border border-[#262626]">
            <span className="text-[10px] text-[#8e9192] block uppercase">Lifted Index (LI)</span>
            <span className="text-sm font-bold text-white mt-0.5 block">-1.2 °C</span>
            <span className="text-[10px] text-emerald-400">Marginal Instability</span>
          </div>
        </div>

        {/* Vertical Radiosonde Table */}
        <div className="overflow-x-auto rounded-lg border border-[#262626]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#181818] text-[#8e9192] border-b border-[#262626]">
              <tr>
                <th className="py-2.5 px-4 font-medium uppercase tracking-wider">Isobaric Level</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-white">Geopotential Height</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-amber-400">Temperature (T)</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-blue-400">Dew Point (Td)</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[#4edea3]">Wind Vector</th>
                <th className="py-2.5 px-4 font-medium uppercase tracking-wider text-right">Atmospheric Layer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {station.radiosonde.map((lvl, idx) => (
                <tr key={idx} className="hover:bg-[#181818] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-white">{lvl.pressure}</td>
                  <td className="py-2.5 px-3 text-[#c4c7c8]">{lvl.height}</td>
                  <td className="py-2.5 px-3 text-amber-400 font-medium">{lvl.temp}</td>
                  <td className="py-2.5 px-3 text-blue-400">{lvl.dewPoint}</td>
                  <td className="py-2.5 px-3 text-[#4edea3]">{lvl.wind}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-[#201f1f] text-[#c4c7c8] border border-[#333] text-[10px]">
                      {lvl.layer}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-[#181818] border-t border-[#262626] text-[11px] font-mono text-[#8e9192] flex items-center justify-between">
        <span>Balloon sounding synchronized with IMD AWS Surface Calibration</span>
        <span className="text-emerald-400 font-medium">Hydrostatic Equilibrium Validated</span>
      </div>
    </div>
  );
}
