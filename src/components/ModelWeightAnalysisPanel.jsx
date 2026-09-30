import React, { useState } from 'react';
import {
  REGIONS_CATALOG,
  LEAD_TIMES,
  WEIGHT_REGIMES,
} from '../api/modelWeightsData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/**
 * Custom Dark Glassmorphism Tooltip for Recharts
 */
function CustomChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-[#121212]/95 backdrop-blur-xl border border-[#262626] p-2.5 shadow-2xl text-xs font-mono">
        <div className="text-[#8e9192] text-[10px] pb-1 border-b border-[#262626] mb-1.5 flex justify-between gap-3">
          <span>LEAD TIME</span>
          <span className="text-white font-semibold">{label}</span>
        </div>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[11px]" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-white">{(entry.value * 100).toFixed(0)}% ({entry.value.toFixed(2)})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

/**
 * High-Precision SVG Donut Chart for Model Weight Composition
 */
function ModelWeightDonut({ ec, ai, ncmrwf, dominantName }) {
  // Normalize
  const total = ec + ai + ncmrwf;
  const pEC = ec / total;
  const pAI = ai / total;
  const pNC = ncmrwf / total;

  const size = 150;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeEC = circumference * pEC;
  const strokeAI = circumference * pAI;
  const strokeNC = circumference * pNC;

  const offsetEC = 0;
  const offsetAI = -strokeEC;
  const offsetNC = -(strokeEC + strokeAI);

  return (
    <div className="relative flex items-center justify-center w-[150px] h-[150px] shrink-0 select-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e1e1e"
          strokeWidth={strokeWidth}
        />
        {/* IFS Physics Arc (Sky Blue) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#38bdf8"
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeEC} ${circumference}`}
          strokeDashoffset={offsetEC}
          strokeLinecap="butt"
          className="transition-all duration-500"
        />
        {/* AIFS Deep Learning Arc (Mint Emerald) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4edea3"
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeAI} ${circumference}`}
          strokeDashoffset={offsetAI}
          strokeLinecap="butt"
          className="transition-all duration-500"
        />
        {/* NCMRWF Regional Arc (Amber) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeNC} ${circumference}`}
          strokeDashoffset={offsetNC}
          strokeLinecap="butt"
          className="transition-all duration-500"
        />
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
        <span className="text-[10px] font-mono text-[#8e9192] uppercase tracking-wider">
          Weights
        </span>
        <span className="text-xs font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] leading-tight mt-0.5 truncate max-w-[100px]">
          {dominantName || 'BMA'}
        </span>
      </div>
    </div>
  );
}

/**
 * ModelWeightAnalysisPanel
 *
 * Dedicated right workstation panel for deep Bayesian Model Averaging (BMA) analysis.
 * Implements 60-40 split with the map, replicating the analytical capabilities of Image 1
 * in ClimaFuse's austere dark SaaS design system.
 */
export default function ModelWeightAnalysisPanel({
  selectedRegion = 'maharashtra',
  onSelectRegion,
  activeRegime = 'thermal',
  onRegimeChange,
  leadTime = '24h',
  onLeadTimeChange,
  activeModel = 'blend',
  onModelChange,
}) {
  const [showMatrixModal, setShowMatrixModal] = useState(false);

  // Active region data
  const region = REGIONS_CATALOG.find((r) => r.id === selectedRegion) || REGIONS_CATALOG[0];
  const regimeMeta = WEIGHT_REGIMES[activeRegime] || WEIGHT_REGIMES.thermal;
  const currentWeights = region.weights[activeRegime] || region.weights.thermal;
  const leadTimeSeries = region.leadTimeSeries[activeRegime] || region.leadTimeSeries.thermal;

  // Active lead step multiplier
  const activeLeadObj = LEAD_TIMES.find((l) => l.id === leadTime) || LEAD_TIMES[0];

  return (
    <aside
      className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-[#262626] p-4 lg:p-5 shadow-2xl overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#262626]"
      aria-label="Model Weights and Convergence Analytics"
    >
      {/* 1. Header & Lead Time Selector */}
      <div className="pb-3 border-b border-[#262626]/60 space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-white tracking-tight">
                Model Weights by Region
              </h2>
            </div>
            <p className="font-sans text-[11px] text-[#8e9192] mt-0.5">
              Bayesian Model Averaging (BMA) ensemble attribution
            </p>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#1b2a22] border border-[#4edea3]/30 text-[#4edea3] font-semibold">
            {regimeMeta.label.split(' ')[0]}
          </span>
        </div>

        {/* Lead Time Pills (Replicating Image 1: 24 Hours, 3 Days, 7 Days, 14 Days) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-[#8e9192] uppercase font-semibold">
              Select Lead Time
            </span>
            <span className="font-mono text-[10px] text-[#4edea3]">
              Active: {activeLeadObj.label}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#181818] border border-[#262626]">
            {LEAD_TIMES.map((lt) => (
              <button
                key={lt.id}
                onClick={() => onLeadTimeChange && onLeadTimeChange(lt.id)}
                className={`py-1 px-1.5 rounded-lg text-[11px] font-sans transition-all cursor-pointer text-center ${
                  leadTime === lt.id
                    ? 'bg-[#252525] border border-white/20 text-white font-bold shadow-sm'
                    : 'text-[#8e9192] hover:text-white hover:bg-[#202020]'
                }`}
              >
                {lt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Model Weight Composition (Selected Region) */}
      <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#8e9192] uppercase font-semibold">
            Model Weight Composition
          </span>
          <span className="text-[10px] font-mono text-[#4edea3] font-semibold">
            CRPS {currentWeights.crpsGain}
          </span>
        </div>

        {/* Region Selector Dropdown (Sleek dark theme) */}
        <div className="relative">
          <select
            value={region.id}
            onChange={(e) => onSelectRegion && onSelectRegion(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#2e2e2e] hover:border-[#4edea3]/50 text-white text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-xl px-3 py-2 appearance-none cursor-pointer focus:outline-none focus:border-[#4edea3] transition-colors"
          >
            {REGIONS_CATALOG.map((r) => (
              <option key={r.id} value={r.id} className="bg-[#121212] text-white">
                {r.name}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-[#8e9192] pointer-events-none">
            unfold_more
          </span>
        </div>

        {/* Donut Chart & Breakdown Legend (Side-by-side as in Image 1) */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <ModelWeightDonut
            ec={currentWeights.ec}
            ai={currentWeights.ai}
            ncmrwf={currentWeights.ncmrwf}
            dominantName={region.shortName}
          />

          <div className="flex-1 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626]">
              <span className="flex items-center text-[#38bdf8] text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] mr-1.5" />
                IFS (Physics)
              </span>
              <span className="text-white font-bold">{(currentWeights.ec / 100).toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626]">
              <span className="flex items-center text-[#4edea3] text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] mr-1.5" />
                AIFS (Neural)
              </span>
              <span className="text-white font-bold">{(currentWeights.ai / 100).toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626]">
              <span className="flex items-center text-[#fbbf24] text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#fbbf24] mr-1.5" />
                NCMRWF (Reg.)
              </span>
              <span className="text-white font-bold">{(currentWeights.ncmrwf / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Model Weights by Lead Time (Line Chart) */}
      <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#8e9192] uppercase font-semibold truncate">
            Weights by Lead Time ({region.shortName})
          </span>
          <div className="flex items-center space-x-2 text-[9px] font-mono">
            <span className="text-[#38bdf8]">● IFS</span>
            <span className="text-[#4edea3]">● AIFS</span>
            <span className="text-[#fbbf24]">● NCMRWF</span>
          </div>
        </div>

        {/* Recharts Time-Series Curve */}
        <div className="w-full h-[155px] pt-1" style={{ width: '100%', height: '155px', minHeight: '155px' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={155}>
            <LineChart
              data={leadTimeSeries}
              margin={{ top: 8, right: 10, left: -22, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="2 2" stroke="#232323" vertical={false} />
              <XAxis
                dataKey="step"
                stroke="#666"
                tick={{ fontSize: 9, fill: '#8e9192', fontFamily: 'JetBrains Mono' }}
                axisLine={{ stroke: '#2e2e2e' }}
              />
              <YAxis
                domain={[0, 1]}
                ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                stroke="#666"
                tick={{ fontSize: 9, fill: '#8e9192', fontFamily: 'JetBrains Mono' }}
                axisLine={{ stroke: '#2e2e2e' }}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Line
                type="monotone"
                dataKey="ec"
                name="IFS Physics"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#38bdf8' }}
                activeDot={{ r: 4.5 }}
              />
              <Line
                type="monotone"
                dataKey="ai"
                name="AIFS Neural"
                stroke="#4edea3"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#4edea3' }}
                activeDot={{ r: 4.5 }}
              />
              <Line
                type="monotone"
                dataKey="ncmrwf"
                name="NCMRWF Unified"
                stroke="#fbbf24"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={{ r: 2.5, fill: '#fbbf24' }}
                activeDot={{ r: 4.5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Dominant Attribution & Terrain Physics Rationale */}
      <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#8e9192] uppercase font-semibold">
            Dominant Attribution
          </span>
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${region.dominantColor}15`,
              color: region.dominantColor,
              border: `1px solid ${region.dominantColor}35`,
            }}
          >
            {region.dominantModel}
          </span>
        </div>

        {/* Gradient Range Bar */}
        <div>
          <div className="flex justify-between text-[9px] font-mono text-[#8e9192] mb-1">
            <span>0.0 Min Weight</span>
            <span className="text-white font-semibold">Highest: {(Math.max(currentWeights.ec, currentWeights.ai, currentWeights.ncmrwf) / 100).toFixed(2)}</span>
            <span>1.0 Peak</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#202020] overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-orange-500"
              style={{
                width: `${Math.max(currentWeights.ec, currentWeights.ai, currentWeights.ncmrwf)}%`,
              }}
            />
          </div>
        </div>

        {/* Synoptic Terrain Note */}
        <p className="font-sans text-[11px] text-[#a3a3a3] leading-relaxed pt-1 border-t border-[#262626]/50">
          {region.synopticNote}
        </p>
      </div>

      {/* 5. Bottom Actions: Inspect Full Regional Matrix Modal Button */}
      <div className="pt-2">
        <button
          onClick={() => setShowMatrixModal(true)}
          className="w-full py-2.5 px-3 rounded-xl bg-[#181818] hover:bg-[#222222] border border-[#262626] hover:border-[#4edea3]/40 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
        >
          <span className="material-symbols-outlined text-[16px] text-[#4edea3]">table_chart</span>
          <span>Inspect All-India Attribution Matrix &amp; CRPS Scores</span>
        </button>
      </div>

      {/* Full Verification Matrix Modal */}
      {showMatrixModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[85vh] bg-[#121212] border border-[#2e2e2e] rounded-2xl p-6 shadow-2xl flex flex-col space-y-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <div>
                <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  Subcontinental Model Attribution Matrix &amp; Verification
                </h3>
                <p className="text-xs text-[#8e9192] mt-0.5">
                  Continuous Ranked Probability Score (CRPS) across India's microclimatic zones
                </p>
              </div>
              <button
                onClick={() => setShowMatrixModal(false)}
                className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#2e2e2e] text-[#a3a3a3] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-[#262626]">
              {/* Regional Matrix Table */}
              <div className="rounded-xl border border-[#262626] overflow-hidden">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#181818] text-[#8e9192] text-[10px] uppercase border-b border-[#262626]">
                    <tr>
                      <th className="p-2.5 font-semibold">Terrain Zone</th>
                      <th className="p-2.5 font-semibold text-[#38bdf8]">IFS Physics</th>
                      <th className="p-2.5 font-semibold text-[#4edea3]">AIFS Neural</th>
                      <th className="p-2.5 font-semibold text-[#fbbf24]">NCMRWF Reg.</th>
                      <th className="p-2.5 font-semibold text-white">Dominant Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]/50 text-[#d4d4d4]">
                    {REGIONS_CATALOG.map((r) => {
                      const w = r.weights[activeRegime] || r.weights.thermal;
                      return (
                        <tr key={r.id} className="hover:bg-[#1a1a1a]/60 transition-colors">
                          <td className="p-2.5 font-bold text-white">{r.name}</td>
                          <td className="p-2.5 text-[#38bdf8] font-bold">{w.ec}%</td>
                          <td className="p-2.5 text-[#4edea3] font-bold">{w.ai}%</td>
                          <td className="p-2.5 text-[#fbbf24] font-bold">{w.ncmrwf}%</td>
                          <td className="p-2.5 text-[11px] font-sans text-[#a3a3a3] leading-snug">
                            {r.synopticNote}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* CRPS Lead-Time Benchmark Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-2">
                  <span className="text-[10px] font-mono text-[#4edea3] uppercase font-bold">
                    Continuous CRPS Skill Score vs. Lead Time
                  </span>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between p-2 rounded bg-[#1c1c1c]">
                      <span>T+24h Lead</span>
                      <span className="text-[#8e9192]">IFS: 1.12 · AIFS: 1.08</span>
                      <span className="text-[#4edea3] font-bold">BMA: 0.94 (+16.1%)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-[#1c1c1c]">
                      <span>T+72h Lead</span>
                      <span className="text-[#8e9192]">IFS: 1.84 · AIFS: 1.62</span>
                      <span className="text-[#4edea3] font-bold">BMA: 1.41 (+19.4%)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-[#1c1c1c]">
                      <span>T+120h Lead</span>
                      <span className="text-[#8e9192]">IFS: 2.92 · AIFS: 2.45</span>
                      <span className="text-[#4edea3] font-bold">BMA: 2.12 (+21.8%)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-[#1c1c1c]">
                      <span>T+240h Lead</span>
                      <span className="text-[#8e9192]">IFS: 4.80 · AIFS: 4.30</span>
                      <span className="text-[#4edea3] font-bold">BMA: 3.78 (+18.2%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-2">
                  <span className="text-[10px] font-mono text-[#38bdf8] uppercase font-bold">
                    Bayesian Mixture Formulation
                  </span>
                  <div className="p-2.5 rounded bg-[#1c1c1c] font-mono text-xs text-[#4edea3]">
                    p(y | f₁, f₂, f₃) = ∑ wₖ(x, s, t) · gₖ(y | fₖ)
                  </div>
                  <p className="text-[11px] text-[#a3a3a3] leading-relaxed">
                    Weights vary as a continuous function of geographic coordinate <strong className="text-white">x</strong>, synoptic season <strong className="text-white">s</strong>, and lead time <strong className="text-white">t</strong>, verified against 842 IMD Automatic Weather Stations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
