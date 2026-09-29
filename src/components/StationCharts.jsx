import React, { useState } from 'react';

export default function StationCharts({ station }) {
  const [activeTempIndex, setActiveTempIndex] = useState(null);
  const [activeHeatIndex, setActiveHeatIndex] = useState(null);
  const [activeRainIndex, setActiveRainIndex] = useState(null);

  if (!station || !station.timeseries) return null;

  const data = station.timeseries;
  const numPoints = data.length;

  // Coordinate scales for Temperature Chart (viewBox: 0 0 1000 240)
  // X range: 50 to 980 (width: 930)
  // Y range: 25 (36°C) to 215 (20°C) (height: 190) -> tempMin: 18, tempMax: 38
  const tempMin = 18;
  const tempMax = 38;
  const getX = (i) => 55 + (i / (numPoints - 1)) * 920;
  const getYTemp = (val) => {
    const clamped = Math.max(tempMin, Math.min(tempMax, val));
    return 215 - ((clamped - tempMin) / (tempMax - tempMin)) * 185;
  };

  // SVG Path builders
  const buildPath = (key) => {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)},${getYTemp(d[key]).toFixed(1)}`).join(' ');
  };

  // Build confidence band polygon points
  const topPoints = data.map((d, i) => `${getX(i).toFixed(1)},${getYTemp(d.bmaHigh).toFixed(1)}`).join(' ');
  const bottomPoints = [...data].reverse().map((d, i) => {
    const origIdx = numPoints - 1 - i;
    return `${getX(origIdx).toFixed(1)},${getYTemp(d.bmaLow).toFixed(1)}`;
  }).join(' ');
  const confidencePolygon = `${topPoints} ${bottomPoints}`;

  // Peak temperature point for annotation
  const peakPoint = [...data].reduce((max, d, idx) => d.bma > max.val ? { val: d.bma, time: d.time, idx } : max, { val: -99, time: '', idx: 0 });

  // Heat Index Y scale (tempMin: 18, tempMax: 42)
  const hiMin = 18;
  const hiMax = 42;
  const getYHi = (val) => {
    const clamped = Math.max(hiMin, Math.min(hiMax, val));
    return 205 - ((clamped - hiMin) / (hiMax - hiMin)) * 180;
  };
  const buildHiPath = (key) => {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)},${getYHi(d[key]).toFixed(1)}`).join(' ');
  };
  const yThreshold35 = getYHi(35);

  // Precipitation Max
  const maxRain = Math.max(...data.map(d => Math.max(d.rainBma || 0, d.rainObs || 0, 1.5)));

  return (
    <div className="space-y-6">
      {/* ────────────────────────────────────────────────────────── */}
      {/* GRAPH SECTION 1 — TEMPERATURE                             */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-lg">
        {/* Graph Header */}
        <div className="bg-[#181818] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#262626]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-400 text-lg">show_chart</span>
            <span className="text-amber-300 font-semibold tracking-wide uppercase text-xs font-mono">
              Temperature — ClimaFuse vs Models vs Observed
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#8e9192] hidden sm:inline">
            Unit: Degrees Celsius (°C) · Level: 2m AGL
          </span>
        </div>

        {/* Interactive Timeseries Plot */}
        <div className="p-4 sm:p-6 space-y-4">
          <div
            className="relative w-full h-72 sm:h-80 select-none cursor-crosshair"
            onMouseLeave={() => setActiveTempIndex(null)}
          >
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 240"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, (mouseX - 55 * (rect.width / 1000)) / (920 * (rect.width / 1000))));
                const idx = Math.round(ratio * (numPoints - 1));
                setActiveTempIndex(idx);
              }}
            >
              <defs>
                <linearGradient id="bmaConfidenceGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.04" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[36, 32, 28, 24, 20].map((t) => (
                <g key={t}>
                  <line
                    stroke="#262626"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                    x1="55"
                    x2="975"
                    y1={getYTemp(t)}
                    y2={getYTemp(t)}
                  />
                  <text
                    fill="#8e9192"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="end"
                    x="45"
                    y={getYTemp(t) + 3}
                  >
                    {t}°C
                  </text>
                </g>
              ))}
              <line stroke="#383838" strokeWidth="1" x1="55" x2="975" y1="215" y2="215" />

              {/* 90% BMA Confidence Interval Band */}
              <polygon fill="url(#bmaConfidenceGrad)" points={confidencePolygon} />

              {/* NWP Physics Model (ECMWF IFS) - Blue Dashed */}
              <path
                d={buildPath('ifs')}
                fill="none"
                stroke="#3b82f6"
                strokeDasharray="6,4"
                strokeWidth="1.8"
              />

              {/* AI/ML Model (ECMWF AIFS) - Green Dotted */}
              <path
                d={buildPath('aifs')}
                fill="none"
                stroke="#10b981"
                strokeDasharray="2,3"
                strokeWidth="1.8"
              />

              {/* ClimaFuse BMA Mixture Line - Solid Amber */}
              <path
                d={buildPath('bma')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />

              {/* IMD Observed Ground Truth Line - Solid Dark Neutral with Nodes */}
              <path
                d={buildPath('obs')}
                fill="none"
                stroke="#fbfbfb"
                strokeWidth="2"
              />

              {/* Ground Truth Node Markers */}
              {data.map((d, i) => (
                <circle
                  key={i}
                  cx={getX(i)}
                  cy={getYTemp(d.obs)}
                  r="3.5"
                  fill="#121212"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}

              {/* Key Diurnal Peak Annotation */}
              <g>
                <line
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  x1={getX(peakPoint.idx)}
                  x2={getX(peakPoint.idx)}
                  y1={getYTemp(peakPoint.val)}
                  y2={22}
                />
                <circle cx={getX(peakPoint.idx)} cy={getYTemp(peakPoint.val)} r="4.5" fill="#f59e0b" />
                <rect
                  x={Math.max(60, Math.min(840, getX(peakPoint.idx) - 65))}
                  y="8"
                  width="130"
                  height="20"
                  rx="5"
                  fill="#1c1b1b"
                  stroke="#f59e0b"
                  strokeWidth="1"
                />
                <text
                  fill="#fbbf24"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9.5"
                  fontWeight="600"
                  textAnchor="middle"
                  x={Math.max(125, Math.min(905, getX(peakPoint.idx)))}
                  y="22"
                >
                  {peakPoint.time} · {peakPoint.val}°C Peak
                </text>
              </g>

              {/* Interactive Crosshair Indicator */}
              {activeTempIndex !== null && (
                <g>
                  <line
                    stroke="#4edea3"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    x1={getX(activeTempIndex)}
                    x2={getX(activeTempIndex)}
                    y1="25"
                    y2="215"
                  />
                  <circle cx={getX(activeTempIndex)} cy={getYTemp(data[activeTempIndex].bma)} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={getX(activeTempIndex)} cy={getYTemp(data[activeTempIndex].obs)} r="4.5" fill="#ffffff" stroke="#121212" strokeWidth="1.5" />
                </g>
              )}

              {/* X-Axis Labels */}
              {data.filter((_, i) => i % 2 === 0 || i === data.length - 1).map((d, i) => (
                <text
                  key={i}
                  fill={d.time === peakPoint.time ? '#fbbf24' : '#8e9192'}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9.5"
                  fontWeight={d.time === peakPoint.time ? '700' : '500'}
                  textAnchor="middle"
                  x={getX(data.indexOf(d))}
                  y="232"
                >
                  {d.time}
                </text>
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {activeTempIndex !== null && (
              <div
                className="absolute top-2 pointer-events-none z-30 p-2.5 rounded-xl bg-[#1c1b1b]/95 border border-[#383838] shadow-2xl backdrop-blur-md font-mono text-[11px] space-y-1"
                style={{
                  left: `${Math.max(10, Math.min(80, (activeTempIndex / (numPoints - 1)) * 100))}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="text-white font-bold pb-1 border-b border-[#333] flex justify-between gap-3">
                  <span>Time: {data[activeTempIndex].time} IST</span>
                  <span className="text-[#8e9192]">2m AGL</span>
                </div>
                <div className="flex justify-between gap-4 text-white">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white"></span> IMD Observed:</span>
                  <span className="font-bold">{data[activeTempIndex].obs}°C</span>
                </div>
                <div className="flex justify-between gap-4 text-amber-400">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> ClimaFuse BMA:</span>
                  <span className="font-bold">{data[activeTempIndex].bma}°C</span>
                </div>
                <div className="flex justify-between gap-4 text-[#8e9192] text-[10px]">
                  <span>90% BMA Interval:</span>
                  <span>{data[activeTempIndex].bmaLow}°C – {data[activeTempIndex].bmaHigh}°C</span>
                </div>
                <div className="flex justify-between gap-4 text-blue-400">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-blue-400"></span> ECMWF IFS:</span>
                  <span>{data[activeTempIndex].ifs}°C</span>
                </div>
                <div className="flex justify-between gap-4 text-emerald-400">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-emerald-400"></span> ECMWF AIFS:</span>
                  <span>{data[activeTempIndex].aifs}°C</span>
                </div>
              </div>
            )}
          </div>

          {/* Legend and Analytical Telemetry Annotation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-[#262626] text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Observed */}
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 bg-white rounded-full inline-block"></span>
                <span className="text-white font-medium">IMD Observed (Ground Truth)</span>
              </div>
              {/* ClimaFuse BMA */}
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1.5 bg-amber-500 rounded-full inline-block"></span>
                <span className="text-amber-400 font-semibold">ClimaFuse BMA Mixture</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-[10px] text-amber-300 font-semibold">
                  90% Band
                </span>
              </div>
              {/* ECMWF IFS */}
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 border-t-2 border-dashed border-blue-500 inline-block"></span>
                <span className="text-[#a3a3a3]">ECMWF IFS (Physics)</span>
              </div>
              {/* ECMWF AIFS */}
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 border-t-2 border-dotted border-emerald-500 inline-block"></span>
                <span className="text-[#a3a3a3]">ECMWF AIFS (AI/ML)</span>
              </div>
            </div>

            {/* Key Diagnostic Annotation */}
            <div className="text-xs text-[#c4c7c8] bg-[#181818] px-3 py-1.5 rounded-lg border border-[#262626]">
              <span className="text-amber-400 font-bold">Bias Reduction: </span>
              {station.biasReductionNote.replace(/^Bias Reduction:\s*/, '')}
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* GRAPH SECTION 2 — HEAT INDEX                              */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-lg">
        <div className="bg-[#181818] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#262626]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-400 text-lg">local_fire_department</span>
            <span className="text-amber-300 font-semibold tracking-wide uppercase text-xs font-mono">
              Heat Index &amp; Biometeorological Stress
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-mono text-amber-300 font-medium">
              {station.heatIndexNote}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div
            className="relative w-full h-64 select-none cursor-crosshair"
            onMouseLeave={() => setActiveHeatIndex(null)}
          >
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 220"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, (mouseX - 55 * (rect.width / 1000)) / (920 * (rect.width / 1000))));
                const idx = Math.round(ratio * (numPoints - 1));
                setActiveHeatIndex(idx);
              }}
            >
              {/* Danger Zone Shaded Background (Above 35°C threshold) */}
              <rect
                x="55"
                y="15"
                width="920"
                height={Math.max(10, yThreshold35 - 15)}
                fill="#ef4444"
                fillOpacity="0.08"
              />

              {/* 35°C Threshold Line */}
              <line
                stroke="#dc2626"
                strokeDasharray="5,4"
                strokeWidth="1.5"
                x1="55"
                x2="975"
                y1={yThreshold35}
                y2={yThreshold35}
              />
              <text
                fill="#f87171"
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                fontWeight="600"
                textAnchor="end"
                x="970"
                y={yThreshold35 - 6}
              >
                Moderate Heat Stress Threshold: 35.0°C
              </text>

              {/* Standard Gridlines */}
              {[40, 35, 30, 25, 20].map((t) => (
                <g key={t}>
                  <line
                    stroke="#262626"
                    strokeDasharray="3,3"
                    strokeWidth="1"
                    x1="55"
                    x2="975"
                    y1={getYHi(t)}
                    y2={getYHi(t)}
                  />
                  <text
                    fill={t >= 35 ? '#f87171' : '#8e9192'}
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="end"
                    x="45"
                    y={getYHi(t) + 3}
                  >
                    {t}°C
                  </text>
                </g>
              ))}
              <line stroke="#383838" strokeWidth="1" x1="55" x2="975" y1="205" y2="205" />

              {/* Curves */}
              <path d={buildHiPath('hiIfs')} fill="none" stroke="#3b82f6" strokeDasharray="6,4" strokeWidth="1.8" />
              <path d={buildHiPath('hiAifs')} fill="none" stroke="#10b981" strokeDasharray="2,3" strokeWidth="1.8" />
              <path d={buildHiPath('hiBma')} fill="none" stroke="#f59e0b" strokeWidth="2.2" />
              <path d={buildHiPath('hiObs')} fill="none" stroke="#ffffff" strokeWidth="2" />

              {/* Interactive Crosshair Indicator */}
              {activeHeatIndex !== null && (
                <g>
                  <line
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    x1={getX(activeHeatIndex)}
                    x2={getX(activeHeatIndex)}
                    y1="15"
                    y2="205"
                  />
                  <circle cx={getX(activeHeatIndex)} cy={getYHi(data[activeHeatIndex].hiBma)} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}

              {/* X Axis */}
              {data.filter((_, i) => i % 2 === 0 || i === data.length - 1).map((d, i) => (
                <text
                  key={i}
                  fill="#8e9192"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9.5"
                  fontWeight="500"
                  textAnchor="middle"
                  x={getX(data.indexOf(d))}
                  y="218"
                >
                  {d.time}
                </text>
              ))}
            </svg>

            {/* Hover Tooltip Overlay for Heat Index */}
            {activeHeatIndex !== null && (
              <div
                className="absolute top-2 pointer-events-none z-30 p-2.5 rounded-xl bg-[#1c1b1b]/95 border border-[#383838] shadow-2xl backdrop-blur-md font-mono text-[11px] space-y-1"
                style={{
                  left: `${Math.max(10, Math.min(80, (activeHeatIndex / (numPoints - 1)) * 100))}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="text-white font-bold pb-1 border-b border-[#333] flex justify-between gap-3">
                  <span>Heat Index @ {data[activeHeatIndex].time}</span>
                  <span className={data[activeHeatIndex].hiBma >= 35 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {data[activeHeatIndex].hiBma >= 35 ? 'Caution Zone' : 'Safe Zone'}
                  </span>
                </div>
                <div className="flex justify-between gap-4 text-white">
                  <span>Observed Heat Index:</span>
                  <span className="font-bold">{data[activeHeatIndex].hiObs}°C</span>
                </div>
                <div className="flex justify-between gap-4 text-amber-400">
                  <span>ClimaFuse BMA:</span>
                  <span className="font-bold">{data[activeHeatIndex].hiBma}°C</span>
                </div>
                <div className="flex justify-between gap-4 text-blue-400">
                  <span>ECMWF IFS:</span>
                  <span>{data[activeHeatIndex].hiIfs}°C</span>
                </div>
                <div className="flex justify-between gap-4 text-emerald-400">
                  <span>ECMWF AIFS:</span>
                  <span>{data[activeHeatIndex].hiAifs}°C</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#8e9192] pt-2 border-t border-[#262626] gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-red-400 font-medium">
                <span className="w-3 h-3 bg-red-500/20 border border-red-500 inline-block rounded-sm"></span>
                Caution Range (&gt;35°C)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <span className="w-3 h-0.5 bg-amber-500 inline-block"></span>
                ClimaFuse Prediction
              </span>
              <span className="flex items-center gap-1.5 text-white font-medium">
                <span className="w-3 h-0.5 bg-white inline-block"></span>
                IMD Observed
              </span>
            </div>
            <span className="text-[#8e9192]">Calculated via Rothfusz Regression Formula from 2m T and 2m RH</span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* GRAPH SECTION 3 — PRECIPITATION (HYETOGRAPH)              */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-lg">
        <div className="bg-[#181818] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#262626]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-400 text-lg">bar_chart</span>
            <span className="text-amber-300 font-semibold tracking-wide uppercase text-xs font-mono">
              Hourly Precipitation &amp; Hyetograph
            </span>
          </div>
          <div className="font-mono text-xs text-[#c4c7c8]">
            {station.rainNote}
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div
            className="relative w-full h-44 sm:h-48 select-none"
            onMouseLeave={() => setActiveRainIndex(null)}
          >
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 160"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, (mouseX - 55 * (rect.width / 1000)) / (920 * (rect.width / 1000))));
                const idx = Math.round(ratio * (numPoints - 1));
                setActiveRainIndex(idx);
              }}
            >
              {/* Gridlines */}
              {[120, 80, 40, 0].map((scaledY, idx) => {
                const yPos = 20 + idx * 40;
                const mmVal = ((maxRain * (3 - idx)) / 3).toFixed(1);
                return (
                  <g key={idx}>
                    <line stroke="#262626" strokeDasharray="3,3" strokeWidth="1" x1="55" x2="975" y1={yPos} y2={yPos} />
                    <text fill="#8e9192" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="500" textAnchor="end" x="48" y={yPos + 3}>
                      {mmVal} mm
                    </text>
                  </g>
                );
              })}
              <line stroke="#383838" strokeWidth="1" x1="55" x2="975" y1="140" y2="140" />

              {/* Hourly Paired Bars */}
              {data.map((d, i) => {
                const cx = getX(i);
                const bmaHeight = Math.min(120, (d.rainBma / (maxRain || 1)) * 115);
                const obsHeight = Math.min(120, (d.rainObs / (maxRain || 1)) * 115);

                return (
                  <g key={i}>
                    {/* ClimaFuse BMA Bar */}
                    <rect
                      x={cx - 11}
                      y={140 - bmaHeight}
                      width="10"
                      height={Math.max(bmaHeight, d.rainBma > 0 ? 2 : 0)}
                      rx="1.5"
                      fill="#f59e0b"
                    />
                    {/* IMD Observed Bar */}
                    <rect
                      x={cx + 1}
                      y={140 - obsHeight}
                      width="10"
                      height={Math.max(obsHeight, d.rainObs > 0 ? 2 : 0)}
                      rx="1.5"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    {/* Nil hour baseline tick */}
                    {d.rainBma === 0 && d.rainObs === 0 && (
                      <line x1={cx} x2={cx} y1="138" y2="140" stroke="#383838" strokeWidth="1.5" />
                    )}
                  </g>
                );
              })}

              {/* X Axis Time Labels */}
              {data.filter((_, i) => i % 2 === 0 || i === data.length - 1).map((d, i) => (
                <text
                  key={i}
                  fill="#8e9192"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9.5"
                  fontWeight="500"
                  textAnchor="middle"
                  x={getX(data.indexOf(d))}
                  y="154"
                >
                  {d.time}
                </text>
              ))}
            </svg>

            {/* Hover Tooltip for Precipitation */}
            {activeRainIndex !== null && (
              <div
                className="absolute top-2 pointer-events-none z-30 p-2.5 rounded-xl bg-[#1c1b1b]/95 border border-[#383838] shadow-2xl backdrop-blur-md font-mono text-[11px] space-y-1"
                style={{
                  left: `${Math.max(10, Math.min(80, (activeRainIndex / (numPoints - 1)) * 100))}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="text-white font-bold pb-1 border-b border-[#333]">
                  Rainfall @ {data[activeRainIndex].time} IST
                </div>
                <div className="flex justify-between gap-4 text-amber-400">
                  <span>ClimaFuse BMA:</span>
                  <span className="font-bold">{data[activeRainIndex].rainBma} mm</span>
                </div>
                <div className="flex justify-between gap-4 text-white">
                  <span>IMD Observed:</span>
                  <span className="font-bold">{data[activeRainIndex].rainObs} mm</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#8e9192] pt-2 border-t border-[#262626] gap-2">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-amber-400 font-medium">
                <span className="w-3 h-3 bg-amber-500 rounded-sm inline-block"></span>
                ClimaFuse Hyetograph
              </span>
              <span className="flex items-center gap-2 text-white font-medium">
                <span className="w-3 h-3 border border-white rounded-sm inline-block"></span>
                IMD Tipping Bucket Gauge (Observed)
              </span>
            </div>
            <span className="text-[#a3a3a3]">{station.rainSubNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
