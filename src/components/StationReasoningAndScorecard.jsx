import React from 'react';

export default function StationReasoningAndScorecard({ station }) {
  if (!station) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ────────────────────────────────────────────────────────── */}
      {/* COLUMN 1: MODEL AGREEMENT / SYNOPTIC REASONING             */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden flex flex-col justify-between shadow-lg">
        <div>
          {/* Header */}
          <div className="bg-[#181818] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#262626]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-400 text-lg">psychology</span>
              <span className="text-amber-300 font-semibold tracking-wide uppercase text-xs font-mono">
                Model Weight Allocation &amp; Synoptic Reasoning
              </span>
            </div>
            <span className="text-xs font-mono text-[#8e9192]">
              EM Iterations: {station.blend.emIterations}
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Proportion Bar */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-blue-400 font-medium">
                  ECMWF IFS (Physics): {station.blend.ifs}%
                </span>
                <span className="text-emerald-400 font-medium">
                  AI-GNN (AIFS Data-driven): {station.blend.aifs}%
                </span>
              </div>
              <div className="w-full h-3.5 bg-[#201f1f] rounded-full overflow-hidden flex p-0.5 border border-[#2e2e2e]">
                <div
                  className="bg-blue-500 h-full rounded-l-full transition-all duration-700"
                  style={{ width: `${station.blend.ifs}%` }}
                  title={`ECMWF IFS: ${station.blend.ifs}%`}
                />
                <div
                  className="bg-emerald-400 h-full rounded-r-full transition-all duration-700"
                  style={{ width: `${station.blend.aifs}%` }}
                  title={`AI-GNN AIFS: ${station.blend.aifs}%`}
                />
              </div>
            </div>

            {/* Plain-Language Synoptic Commentary */}
            <div className="p-4 rounded-xl bg-[#181818] border border-[#262626] space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#8e9192]">
                Meteorologist Diagnostic Note
              </div>
              <p className="text-sm text-[#e5e2e1] leading-relaxed font-sans">
                {station.diagnosticNote}
              </p>
            </div>

            {/* Convergence Metrics */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-lg bg-[#181818] border border-[#262626]">
                <div className="text-[11px] font-mono text-[#8e9192]">BMA Spread Parameter (σ)</div>
                <div className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white mt-1">
                  {station.blend.spread}{' '}
                  <span className="text-xs font-normal text-emerald-400 font-mono">(Calibrated)</span>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#181818] border border-[#262626]">
                <div className="text-[11px] font-mono text-[#8e9192]">Continuous Ranked Probability (CRPS)</div>
                <div className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white mt-1">
                  {station.blend.crps}{' '}
                  <span className="text-xs font-normal text-[#8e9192] font-mono">(Optimal)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3 bg-[#181818] border-t border-[#262626] text-[11px] font-mono text-[#8e9192] flex items-center justify-between">
          <span>Objective verification via Expectation-Maximization mixture</span>
          <span className="text-white font-medium">BMA Solver v3.1</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* COLUMN 2: ALERTS & ACCURACY SCORECARD                      */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        {/* ALERTS CARD */}
        <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#181818] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#262626]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-400 text-lg">campaign</span>
              <span className="text-amber-300 font-semibold tracking-wide uppercase text-xs font-mono">
                IMD Operational Advisory &amp; Alert Tier
              </span>
            </div>
            <span className="text-xs font-mono font-semibold" style={{ color: station.alertColor }}>
              {station.alertDuration}
            </span>
          </div>

          <div className="p-5">
            <div
              className="flex items-start gap-4 p-4 rounded-xl border transition-colors"
              style={{
                backgroundColor: `${station.alertColor}12`,
                borderColor: `${station.alertColor}40`,
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${station.alertColor}25`,
                  borderColor: `${station.alertColor}60`,
                  color: station.alertColor,
                }}
              >
                <span className="material-symbols-outlined text-xl">warning</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-bold tracking-wide uppercase"
                    style={{ color: station.alertColor }}
                  >
                    {station.alertTier} Alert
                  </span>
                  <span className="text-[#8e9192] text-xs">·</span>
                  <span className="text-xs text-white font-medium">
                    {station.alertTitle}
                  </span>
                </div>
                <p className="text-xs text-[#c4c7c8] leading-relaxed font-sans">
                  {station.alertDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ACCURACY SCORECARD MATRIX */}
        <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#181818] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#262626]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-400 text-lg">fact_check</span>
              <span className="text-amber-300 font-semibold tracking-wide uppercase text-xs font-mono">
                Accuracy Scorecard (Ground Truth Verification)
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium">
              {station.awsId} Validated
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#181818] text-[#8e9192] border-b border-[#262626]">
                <tr>
                  <th className="py-2.5 px-4 font-medium uppercase tracking-wider">Parameter</th>
                  <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-white">IMD Observed</th>
                  <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-amber-400">ClimaFuse BMA</th>
                  <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-blue-400">NWP IFS</th>
                  <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-emerald-400">AI AIFS</th>
                  <th className="py-2.5 px-4 font-medium uppercase tracking-wider text-right">Best Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626] text-xs">
                {station.scorecard.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#181818] transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{row.param}</td>
                    <td className="py-3 px-3 text-white font-semibold">{row.obs}</td>
                    <td className="py-3 px-3 text-amber-400 font-semibold">
                      {row.bma} <span className="text-[10px] text-emerald-400">{row.bmaDelta}</span>
                    </td>
                    <td className="py-3 px-3 text-[#a3a3a3]">
                      {row.ifs} <span className="text-[10px] text-red-400">{row.ifsDelta}</span>
                    </td>
                    <td className="py-3 px-3 text-[#a3a3a3]">
                      {row.aifs} <span className="text-[10px] text-amber-400">{row.aifsDelta}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        {row.bestFit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
