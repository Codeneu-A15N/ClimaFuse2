/**
 * ClimaFuse Model Weight Distribution Dataset
 *
 * Provides empirical Bayesian Model Averaging (BMA) weight allocations
 * across India's microclimates for the 3 primary meteorological regimes:
 * 1. Thermal (Temperature) Weights
 * 2. Precipitation (Rainfall) Weights
 * 3. Heat Index (Biometeorological) Weights
 *
 * Models in the ensemble:
 * - ECMWF IFS HRES: Deterministic Physics NWP (Sky Blue #38bdf8)
 * - ECMWF AIFS: Graph Neural Network Deep Learning NWP (Mint #4edea3)
 * - NCMRWF Unified: Regional Indian High-Resolution NWP (Amber #fbbf24)
 */

export const LEAD_TIMES = [
  { id: '24h', label: '24 Hours', stepIndex: 1, stepKey: '6-24h' },
  { id: '3d', label: '3 Days', stepIndex: 2, stepKey: '1-3d' },
  { id: '7d', label: '7 Days', stepIndex: 3, stepKey: '3-7d' },
  { id: '14d', label: '14 Days', stepIndex: 4, stepKey: '7-14d' },
];

export const REGIONS_CATALOG = [
  {
    id: 'maharashtra',
    name: 'Maharashtra (Konkan & Western Ghats)',
    shortName: 'Maharashtra',
    state: 'Maharashtra',
    center: [73.5, 18.5],
    dominantModel: 'ECMWF IFS (Physics)',
    dominantColor: '#38bdf8',
    weights: {
      thermal: { ec: 44, ai: 40, ncmrwf: 16, crpsGain: '+18.6%' },
      precipitation: { ec: 68, ai: 16, ncmrwf: 16, crpsGain: '+27.4%' },
      heatIndex: { ec: 52, ai: 32, ncmrwf: 16, crpsGain: '+20.2%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.52, ai: 0.32, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.44, ai: 0.40, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.38, ai: 0.46, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.34, ai: 0.50, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.74, ai: 0.12, ncmrwf: 0.14 },
        { step: '6-24h', label: '6-24h', ec: 0.68, ai: 0.16, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.56, ai: 0.26, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.46, ai: 0.36, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.40, ai: 0.40, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.56, ai: 0.28, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.52, ai: 0.32, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.44, ai: 0.40, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.38, ai: 0.45, ncmrwf: 0.17 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.45, ncmrwf: 0.19 },
      ],
    },
    synopticNote: 'Steep orographic lifting along Western Ghats escarpment requires hydrostatic mass conservation; IFS physics heavily prioritized (up to 74% in 0-6h) to prevent AI oversmoothing.',
  },
  {
    id: 'gangetic',
    name: 'Delhi NCR (Indo-Gangetic Basin)',
    shortName: 'Delhi NCR',
    state: 'Delhi / Punjab / Haryana',
    center: [76.5, 29.5],
    dominantModel: 'ECMWF AIFS (Deep Learning)',
    dominantColor: '#4edea3',
    weights: {
      thermal: { ec: 34, ai: 50, ncmrwf: 16, crpsGain: '+20.5%' },
      precipitation: { ec: 45, ai: 37, ncmrwf: 18, crpsGain: '+17.6%' },
      heatIndex: { ec: 36, ai: 46, ncmrwf: 18, crpsGain: '+18.8%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.40, ai: 0.44, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.34, ai: 0.50, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.28, ai: 0.56, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.26, ai: 0.58, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.30, ai: 0.52, ncmrwf: 0.18 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.50, ai: 0.32, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.45, ai: 0.37, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.40, ai: 0.42, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.35, ai: 0.45, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.32, ai: 0.52, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.28, ai: 0.56, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.32, ai: 0.50, ncmrwf: 0.18 },
      ],
    },
    synopticNote: 'Low surface roughness plain with prominent winter inversions; AIFS graph neural network demonstrates lowest 2m thermal RMSE at 3-7 day lead times.',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan (Thar Desert Core)',
    shortName: 'Rajasthan',
    state: 'Rajasthan',
    center: [73.0, 27.0],
    dominantModel: 'ECMWF AIFS (Deep Learning)',
    dominantColor: '#4edea3',
    weights: {
      thermal: { ec: 32, ai: 54, ncmrwf: 14, crpsGain: '+22.4%' },
      precipitation: { ec: 40, ai: 44, ncmrwf: 16, crpsGain: '+16.5%' },
      heatIndex: { ec: 34, ai: 52, ncmrwf: 14, crpsGain: '+21.0%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.38, ai: 0.48, ncmrwf: 0.14 },
        { step: '6-24h', label: '6-24h', ec: 0.32, ai: 0.54, ncmrwf: 0.14 },
        { step: '1-3d', label: '1-3d', ec: 0.26, ai: 0.60, ncmrwf: 0.14 },
        { step: '3-7d', label: '3-7d', ec: 0.24, ai: 0.62, ncmrwf: 0.14 },
        { step: '7-14d', label: '7-14d', ec: 0.28, ai: 0.56, ncmrwf: 0.16 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.44, ai: 0.40, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.40, ai: 0.44, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.36, ai: 0.48, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.32, ai: 0.52, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.34, ai: 0.48, ncmrwf: 0.18 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.38, ai: 0.48, ncmrwf: 0.14 },
        { step: '6-24h', label: '6-24h', ec: 0.34, ai: 0.52, ncmrwf: 0.14 },
        { step: '1-3d', label: '1-3d', ec: 0.28, ai: 0.58, ncmrwf: 0.14 },
        { step: '3-7d', label: '3-7d', ec: 0.25, ai: 0.61, ncmrwf: 0.14 },
        { step: '7-14d', label: '7-14d', ec: 0.29, ai: 0.55, ncmrwf: 0.16 },
      ],
    },
    synopticNote: 'High net solar radiation, low soil moisture memory, and clear sky anticyclones; neural models excel in surface sensible heat flux calculation with +22% skill gain.',
  },
  {
    id: 'himalayas',
    name: 'Ladakh & Kashmir (Himalayan Arc)',
    shortName: 'Himalayas',
    state: 'Ladakh / J&K / Himachal',
    center: [76.5, 33.5],
    dominantModel: 'ECMWF IFS (Physics)',
    dominantColor: '#38bdf8',
    weights: {
      thermal: { ec: 56, ai: 28, ncmrwf: 16, crpsGain: '+19.0%' },
      precipitation: { ec: 65, ai: 19, ncmrwf: 16, crpsGain: '+22.5%' },
      heatIndex: { ec: 56, ai: 29, ncmrwf: 15, crpsGain: '+17.4%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.62, ai: 0.22, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.56, ai: 0.28, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.50, ai: 0.34, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.44, ai: 0.40, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.70, ai: 0.14, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.65, ai: 0.19, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.58, ai: 0.26, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.50, ai: 0.34, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.46, ai: 0.36, ncmrwf: 0.18 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.60, ai: 0.25, ncmrwf: 0.15 },
        { step: '6-24h', label: '6-24h', ec: 0.56, ai: 0.29, ncmrwf: 0.15 },
        { step: '1-3d', label: '1-3d', ec: 0.48, ai: 0.37, ncmrwf: 0.15 },
        { step: '3-7d', label: '3-7d', ec: 0.42, ai: 0.42, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.40, ai: 0.42, ncmrwf: 0.18 },
      ],
    },
    synopticNote: 'Complex mountain terrain, valley wind tunnels, and snow-albedo boundaries; hydrostatic thermodynamic equations in IFS are indispensable for Western Disturbances.',
  },
  {
    id: 'northeast',
    name: 'Assam & Meghalaya (Northeast Funnel)',
    shortName: 'Northeast',
    state: 'Assam / Meghalaya',
    center: [91.7, 25.8],
    dominantModel: 'ECMWF IFS (Physics)',
    dominantColor: '#38bdf8',
    weights: {
      thermal: { ec: 48, ai: 34, ncmrwf: 18, crpsGain: '+18.0%' },
      precipitation: { ec: 70, ai: 16, ncmrwf: 14, crpsGain: '+30.0%' },
      heatIndex: { ec: 52, ai: 31, ncmrwf: 17, crpsGain: '+19.2%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.54, ai: 0.28, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.48, ai: 0.34, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.38, ai: 0.44, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.38, ai: 0.42, ncmrwf: 0.20 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.76, ai: 0.10, ncmrwf: 0.14 },
        { step: '6-24h', label: '6-24h', ec: 0.70, ai: 0.16, ncmrwf: 0.14 },
        { step: '1-3d', label: '1-3d', ec: 0.60, ai: 0.24, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.50, ai: 0.34, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.44, ai: 0.38, ncmrwf: 0.18 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.58, ai: 0.25, ncmrwf: 0.17 },
        { step: '6-24h', label: '6-24h', ec: 0.52, ai: 0.31, ncmrwf: 0.17 },
        { step: '1-3d', label: '1-3d', ec: 0.45, ai: 0.38, ncmrwf: 0.17 },
        { step: '3-7d', label: '3-7d', ec: 0.40, ai: 0.43, ncmrwf: 0.17 },
        { step: '7-14d', label: '7-14d', ec: 0.38, ai: 0.43, ncmrwf: 0.19 },
      ],
    },
    synopticNote: 'World record orographic rainfall trap in Khasi Hills; IFS thermodynamic conservation is assigned 70%–76% weight during extreme monsoon precipitation bursts (>150mm/day).',
  },
  {
    id: 'deccan',
    name: 'Karnataka & Telangana (Deccan Plateau)',
    shortName: 'Deccan Plateau',
    state: 'Karnataka / Telangana',
    center: [78.0, 15.0],
    dominantModel: 'ECMWF AIFS (Deep Learning)',
    dominantColor: '#4edea3',
    weights: {
      thermal: { ec: 39, ai: 44, ncmrwf: 17, crpsGain: '+19.1%' },
      precipitation: { ec: 51, ai: 31, ncmrwf: 18, crpsGain: '+20.0%' },
      heatIndex: { ec: 40, ai: 42, ncmrwf: 18, crpsGain: '+18.2%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.44, ai: 0.39, ncmrwf: 0.17 },
        { step: '6-24h', label: '6-24h', ec: 0.39, ai: 0.44, ncmrwf: 0.17 },
        { step: '1-3d', label: '1-3d', ec: 0.34, ai: 0.49, ncmrwf: 0.17 },
        { step: '3-7d', label: '3-7d', ec: 0.30, ai: 0.53, ncmrwf: 0.17 },
        { step: '7-14d', label: '7-14d', ec: 0.33, ai: 0.48, ncmrwf: 0.19 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.58, ai: 0.24, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.51, ai: 0.31, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.44, ai: 0.38, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.38, ai: 0.44, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.44, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.45, ai: 0.37, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.40, ai: 0.42, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.34, ai: 0.48, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.30, ai: 0.52, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.33, ai: 0.48, ncmrwf: 0.19 },
      ],
    },
    synopticNote: 'Stable 800m–950m altitude continental plateau; high multi-model consensus where AIFS leads temperature prediction and IFS leads convective rainshadow precipitation.',
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu (Coromandel Coast)',
    shortName: 'Tamil Nadu',
    state: 'Tamil Nadu',
    center: [79.0, 11.5],
    dominantModel: 'ECMWF IFS (Physics)',
    dominantColor: '#38bdf8',
    weights: {
      thermal: { ec: 42, ai: 40, ncmrwf: 18, crpsGain: '+18.5%' },
      precipitation: { ec: 60, ai: 22, ncmrwf: 18, crpsGain: '+23.5%' },
      heatIndex: { ec: 47, ai: 36, ncmrwf: 17, crpsGain: '+18.6%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.48, ai: 0.34, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.32, ai: 0.50, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.35, ai: 0.46, ncmrwf: 0.19 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.68, ai: 0.15, ncmrwf: 0.17 },
        { step: '6-24h', label: '6-24h', ec: 0.60, ai: 0.22, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.50, ai: 0.32, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.38, ai: 0.42, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.52, ai: 0.31, ncmrwf: 0.17 },
        { step: '6-24h', label: '6-24h', ec: 0.47, ai: 0.36, ncmrwf: 0.17 },
        { step: '1-3d', label: '1-3d', ec: 0.40, ai: 0.43, ncmrwf: 0.17 },
        { step: '3-7d', label: '3-7d', ec: 0.35, ai: 0.47, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.44, ncmrwf: 0.20 },
      ],
    },
    synopticNote: 'Northeast monsoon coastal convergence zone; easterly squalls and Bay of Bengal cyclonic moisture surges accurately resolved by IFS physics mass conservation.',
  },
  {
    id: 'kerala_goa',
    name: 'Kerala & Goa (Malabar Coast)',
    shortName: 'Kerala & Goa',
    state: 'Kerala / Goa',
    center: [75.5, 12.0],
    dominantModel: 'ECMWF IFS (Physics)',
    dominantColor: '#38bdf8',
    weights: {
      thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+18.1%' },
      precipitation: { ec: 66, ai: 18, ncmrwf: 16, crpsGain: '+26.2%' },
      heatIndex: { ec: 50, ai: 33, ncmrwf: 17, crpsGain: '+18.8%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.50, ai: 0.32, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.44, ai: 0.38, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.38, ai: 0.44, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.34, ai: 0.48, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.45, ncmrwf: 0.19 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.72, ai: 0.12, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.66, ai: 0.18, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.54, ai: 0.28, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.44, ai: 0.38, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.40, ai: 0.40, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.55, ai: 0.28, ncmrwf: 0.17 },
        { step: '6-24h', label: '6-24h', ec: 0.50, ai: 0.33, ncmrwf: 0.17 },
        { step: '1-3d', label: '1-3d', ec: 0.42, ai: 0.41, ncmrwf: 0.17 },
        { step: '3-7d', label: '3-7d', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.44, ncmrwf: 0.20 },
      ],
    },
    synopticNote: 'Monsoon onset gateway; Arabian Sea cross-equatorial low-level jet encounters coastal mountains; IFS physics leads with 66% weight.',
  },
  {
    id: 'gujarat',
    name: 'Gujarat (Kutch & Sabarmati)',
    shortName: 'Gujarat',
    state: 'Gujarat',
    center: [71.5, 23.0],
    dominantModel: 'ECMWF AIFS (Deep Learning)',
    dominantColor: '#4edea3',
    weights: {
      thermal: { ec: 37, ai: 48, ncmrwf: 15, crpsGain: '+19.5%' },
      precipitation: { ec: 49, ai: 35, ncmrwf: 16, crpsGain: '+19.1%' },
      heatIndex: { ec: 41, ai: 44, ncmrwf: 15, crpsGain: '+18.6%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.42, ai: 0.43, ncmrwf: 0.15 },
        { step: '6-24h', label: '6-24h', ec: 0.37, ai: 0.48, ncmrwf: 0.15 },
        { step: '1-3d', label: '1-3d', ec: 0.31, ai: 0.54, ncmrwf: 0.15 },
        { step: '3-7d', label: '3-7d', ec: 0.27, ai: 0.58, ncmrwf: 0.15 },
        { step: '7-14d', label: '7-14d', ec: 0.31, ai: 0.52, ncmrwf: 0.17 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.56, ai: 0.28, ncmrwf: 0.16 },
        { step: '6-24h', label: '6-24h', ec: 0.49, ai: 0.35, ncmrwf: 0.16 },
        { step: '1-3d', label: '1-3d', ec: 0.42, ai: 0.42, ncmrwf: 0.16 },
        { step: '3-7d', label: '3-7d', ec: 0.36, ai: 0.47, ncmrwf: 0.17 },
        { step: '7-14d', label: '7-14d', ec: 0.35, ai: 0.46, ncmrwf: 0.19 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.46, ai: 0.39, ncmrwf: 0.15 },
        { step: '6-24h', label: '6-24h', ec: 0.41, ai: 0.44, ncmrwf: 0.15 },
        { step: '1-3d', label: '1-3d', ec: 0.34, ai: 0.51, ncmrwf: 0.15 },
        { step: '3-7d', label: '3-7d', ec: 0.29, ai: 0.55, ncmrwf: 0.16 },
        { step: '7-14d', label: '7-14d', ec: 0.33, ai: 0.49, ncmrwf: 0.18 },
      ],
    },
    synopticNote: 'Arid hinterland colliding with warm Arabian Sea moisture; neural networks predict dry maximum temperatures with exceptional reliability.',
  },
  {
    id: 'bengal_odisha',
    name: 'West Bengal & Odisha (Delta & Coast)',
    shortName: 'Bengal & Odisha',
    state: 'West Bengal / Odisha',
    center: [86.5, 21.5],
    dominantModel: 'ECMWF IFS (Physics)',
    dominantColor: '#38bdf8',
    weights: {
      thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+17.4%' },
      precipitation: { ec: 59, ai: 23, ncmrwf: 18, crpsGain: '+23.0%' },
      heatIndex: { ec: 48, ai: 34, ncmrwf: 18, crpsGain: '+18.0%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.50, ai: 0.32, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.44, ai: 0.38, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.38, ai: 0.44, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.34, ai: 0.48, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.45, ncmrwf: 0.19 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.66, ai: 0.17, ncmrwf: 0.17 },
        { step: '6-24h', label: '6-24h', ec: 0.59, ai: 0.23, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.50, ai: 0.32, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.38, ai: 0.42, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.53, ai: 0.29, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.48, ai: 0.34, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.41, ai: 0.41, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.44, ncmrwf: 0.20 },
      ],
    },
    synopticNote: 'Bay of Bengal tropical cyclone landfall and Kalbaisakhi squall lines; hydrostatic mass conservation in IFS prevents cyclonic eye-wall track dispersion.',
  },
  {
    id: 'central_india',
    name: 'Madhya Pradesh & Chhattisgarh (Central Plateau)',
    shortName: 'Central India',
    state: 'Madhya Pradesh / Chhattisgarh',
    center: [79.5, 22.0],
    dominantModel: 'Consensus Hybrid (IFS / AIFS)',
    dominantColor: '#4edea3',
    weights: {
      thermal: { ec: 39, ai: 43, ncmrwf: 18, crpsGain: '+17.7%' },
      precipitation: { ec: 54, ai: 28, ncmrwf: 18, crpsGain: '+21.0%' },
      heatIndex: { ec: 42, ai: 40, ncmrwf: 18, crpsGain: '+17.1%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.45, ai: 0.37, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.39, ai: 0.43, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.34, ai: 0.48, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.30, ai: 0.52, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.34, ai: 0.47, ncmrwf: 0.19 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.62, ai: 0.20, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.54, ai: 0.28, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.46, ai: 0.36, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.39, ai: 0.43, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.36, ai: 0.44, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.47, ai: 0.35, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.32, ai: 0.50, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.34, ai: 0.47, ncmrwf: 0.19 },
      ],
    },
    synopticNote: 'Monsoon depression inland tracking corridor; balanced BMA weighting stabilizes forecast variance between IFS thermodynamic lifting and AIFS neural surface heat.',
  },
  {
    id: 'up_bihar',
    name: 'Uttar Pradesh & Bihar (Middle Gangetic Basin)',
    shortName: 'UP & Bihar',
    state: 'Uttar Pradesh / Bihar',
    center: [83.0, 26.0],
    dominantModel: 'ECMWF AIFS (Deep Learning)',
    dominantColor: '#4edea3',
    weights: {
      thermal: { ec: 39, ai: 43, ncmrwf: 18, crpsGain: '+17.4%' },
      precipitation: { ec: 50, ai: 32, ncmrwf: 18, crpsGain: '+19.8%' },
      heatIndex: { ec: 42, ai: 40, ncmrwf: 18, crpsGain: '+16.8%' },
    },
    leadTimeSeries: {
      thermal: [
        { step: '0-6h', label: '0-6h', ec: 0.44, ai: 0.38, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.39, ai: 0.43, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.33, ai: 0.49, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.29, ai: 0.53, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.33, ai: 0.48, ncmrwf: 0.19 },
      ],
      precipitation: [
        { step: '0-6h', label: '0-6h', ec: 0.56, ai: 0.26, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.50, ai: 0.32, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.36, ai: 0.46, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.35, ai: 0.45, ncmrwf: 0.20 },
      ],
      heatIndex: [
        { step: '0-6h', label: '0-6h', ec: 0.47, ai: 0.35, ncmrwf: 0.18 },
        { step: '6-24h', label: '6-24h', ec: 0.42, ai: 0.40, ncmrwf: 0.18 },
        { step: '1-3d', label: '1-3d', ec: 0.35, ai: 0.47, ncmrwf: 0.18 },
        { step: '3-7d', label: '3-7d', ec: 0.31, ai: 0.51, ncmrwf: 0.18 },
        { step: '7-14d', label: '7-14d', ec: 0.34, ai: 0.47, ncmrwf: 0.19 },
      ],
    },
    synopticNote: 'High humid air, alluvial soil, and seasonal monsoon depression axis; AIFS provides superior seasonal thermal metrics while IFS resolves heavy precipitation surges.',
  },
];

export const MODEL_WEIGHT_NODES = [
  // --- NORTHERN MOUNTAINS & HIMALAYAS ---
  {
    id: 'leh',
    name: 'Leh',
    regionId: 'himalayas',
    region: 'Ladakh High Altitude',
    lon: 77.5771,
    lat: 34.1526,
    thermal: { ec: 58, ai: 26, ncmrwf: 16, crpsGain: '+19.4%' },
    precipitation: { ec: 66, ai: 18, ncmrwf: 16, crpsGain: '+22.1%' },
    heatIndex: { ec: 60, ai: 25, ncmrwf: 15, crpsGain: '+18.0%' },
    synopticNote: 'Steep adiabatic lapse rate requires physical hydrostatic constraint; IFS dominant.',
  },
  {
    id: 'srinagar',
    name: 'Srinagar',
    regionId: 'himalayas',
    region: 'Kashmir Valley Basin',
    lon: 74.7973,
    lat: 34.0837,
    thermal: { ec: 52, ai: 32, ncmrwf: 16, crpsGain: '+17.8%' },
    precipitation: { ec: 62, ai: 22, ncmrwf: 16, crpsGain: '+21.4%' },
    heatIndex: { ec: 54, ai: 30, ncmrwf: 16, crpsGain: '+16.5%' },
    synopticNote: 'Western Disturbance frontal boundary; IFS physics leads cyclonic precipitation.',
  },
  {
    id: 'shimla',
    name: 'Shimla',
    regionId: 'himalayas',
    region: 'Himachal Ridge Foothills',
    lon: 77.1734,
    lat: 31.1048,
    thermal: { ec: 54, ai: 30, ncmrwf: 16, crpsGain: '+18.5%' },
    precipitation: { ec: 64, ai: 20, ncmrwf: 16, crpsGain: '+23.0%' },
    heatIndex: { ec: 52, ai: 32, ncmrwf: 16, crpsGain: '+17.2%' },
    synopticNote: 'Orographic valley winds; IFS retains superior wind shear convergence.',
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    regionId: 'himalayas',
    region: 'Shivalik Valley',
    lon: 78.0322,
    lat: 30.3165,
    thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+16.2%' },
    precipitation: { ec: 60, ai: 24, ncmrwf: 16, crpsGain: '+22.8%' },
    heatIndex: { ec: 46, ai: 36, ncmrwf: 18, crpsGain: '+15.9%' },
    synopticNote: 'Transition zone between plains and hills; hybrid BMA weighting.',
  },

  // --- INDO-GANGETIC PLAINS ---
  {
    id: 'amritsar',
    name: 'Amritsar',
    regionId: 'gangetic',
    region: 'Punjab Agricultural Plains',
    lon: 74.8723,
    lat: 31.6340,
    thermal: { ec: 34, ai: 50, ncmrwf: 16, crpsGain: '+20.5%' },
    precipitation: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+18.0%' },
    heatIndex: { ec: 36, ai: 46, ncmrwf: 18, crpsGain: '+19.2%' },
    synopticNote: 'Low surface roughness plain; AIFS neural model excels in thermal diurnal cycle.',
  },
  {
    id: 'delhi',
    name: 'New Delhi',
    regionId: 'gangetic',
    region: 'NCR Gangetic Basin',
    lon: 77.2090,
    lat: 28.6139,
    thermal: { ec: 35, ai: 48, ncmrwf: 17, crpsGain: '+19.1%' },
    precipitation: { ec: 46, ai: 36, ncmrwf: 18, crpsGain: '+17.6%' },
    heatIndex: { ec: 38, ai: 44, ncmrwf: 18, crpsGain: '+18.4%' },
    synopticNote: 'Winter boundary layer inversion & haze; AIFS delivers lowest RMSE for T+72h.',
  },
  {
    id: 'agra',
    name: 'Agra',
    regionId: 'gangetic',
    region: 'Yamuna River Basin',
    lon: 78.0081,
    lat: 27.1767,
    thermal: { ec: 36, ai: 48, ncmrwf: 16, crpsGain: '+18.7%' },
    precipitation: { ec: 45, ai: 37, ncmrwf: 18, crpsGain: '+16.9%' },
    heatIndex: { ec: 38, ai: 44, ncmrwf: 18, crpsGain: '+17.5%' },
    synopticNote: 'Subtropical dry continental air; AIFS neural weights favored.',
  },

  // --- UP & BIHAR ---
  {
    id: 'lucknow',
    name: 'Lucknow',
    regionId: 'up_bihar',
    region: 'Central Awadh Plains',
    lon: 80.9462,
    lat: 26.8467,
    thermal: { ec: 38, ai: 44, ncmrwf: 18, crpsGain: '+17.9%' },
    precipitation: { ec: 48, ai: 34, ncmrwf: 18, crpsGain: '+19.0%' },
    heatIndex: { ec: 40, ai: 42, ncmrwf: 18, crpsGain: '+17.1%' },
    synopticNote: 'Monsoon trough axis; balanced blend between IFS physics and AIFS.',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    regionId: 'up_bihar',
    region: 'Eastern UP Gangetic Plain',
    lon: 82.9739,
    lat: 25.3176,
    thermal: { ec: 38, ai: 44, ncmrwf: 18, crpsGain: '+17.3%' },
    precipitation: { ec: 50, ai: 32, ncmrwf: 18, crpsGain: '+19.8%' },
    heatIndex: { ec: 42, ai: 40, ncmrwf: 18, crpsGain: '+16.9%' },
    synopticNote: 'High absolute humidity; IFS retains better moisture flux convergence.',
  },
  {
    id: 'patna',
    name: 'Patna',
    regionId: 'up_bihar',
    region: 'Middle Gangetic Basin',
    lon: 85.1376,
    lat: 25.5941,
    thermal: { ec: 40, ai: 42, ncmrwf: 18, crpsGain: '+17.0%' },
    precipitation: { ec: 52, ai: 30, ncmrwf: 18, crpsGain: '+20.4%' },
    heatIndex: { ec: 43, ai: 38, ncmrwf: 19, crpsGain: '+16.5%' },
    synopticNote: 'Depression landfall corridor; physics weighting increases during heavy events.',
  },

  // --- ARID WEST & THAR DESERT ---
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    regionId: 'rajasthan',
    region: 'Thar Arid Core',
    lon: 70.9083,
    lat: 26.9157,
    thermal: { ec: 32, ai: 54, ncmrwf: 14, crpsGain: '+22.4%' },
    precipitation: { ec: 38, ai: 46, ncmrwf: 16, crpsGain: '+15.2%' },
    heatIndex: { ec: 34, ai: 52, ncmrwf: 14, crpsGain: '+21.0%' },
    synopticNote: 'Extreme solar radiation & low soil moisture; AIFS exhibits superior 2m temp skill.',
  },
  {
    id: 'bikaner',
    name: 'Bikaner',
    regionId: 'rajasthan',
    region: 'North Thar Basin',
    lon: 73.3119,
    lat: 28.0229,
    thermal: { ec: 33, ai: 53, ncmrwf: 14, crpsGain: '+21.8%' },
    precipitation: { ec: 40, ai: 44, ncmrwf: 16, crpsGain: '+16.0%' },
    heatIndex: { ec: 35, ai: 50, ncmrwf: 15, crpsGain: '+20.2%' },
    synopticNote: 'Clear sky anticyclonic regime; deep neural model dominates.',
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    regionId: 'rajasthan',
    region: 'Marwar Desert Margin',
    lon: 73.0243,
    lat: 26.2389,
    thermal: { ec: 34, ai: 52, ncmrwf: 14, crpsGain: '+21.5%' },
    precipitation: { ec: 42, ai: 42, ncmrwf: 16, crpsGain: '+17.0%' },
    heatIndex: { ec: 36, ai: 49, ncmrwf: 15, crpsGain: '+19.8%' },
    synopticNote: 'Semi-arid thermal lows; AIFS neural weighting produces lower RMSE.',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    regionId: 'rajasthan',
    region: 'Aravalli Semi-Arid Basin',
    lon: 75.7873,
    lat: 26.9124,
    thermal: { ec: 36, ai: 48, ncmrwf: 16, crpsGain: '+19.5%' },
    precipitation: { ec: 46, ai: 38, ncmrwf: 16, crpsGain: '+18.2%' },
    heatIndex: { ec: 38, ai: 46, ncmrwf: 16, crpsGain: '+18.9%' },
    synopticNote: 'Diurnal squall front tracking; AIFS leads thermal, IFS leads wind gusts.',
  },

  // --- GUJARAT & KUTCH ---
  {
    id: 'bhuj',
    name: 'Bhuj',
    regionId: 'gujarat',
    region: 'Kutch Peninsula',
    lon: 69.6693,
    lat: 23.2420,
    thermal: { ec: 38, ai: 46, ncmrwf: 16, crpsGain: '+18.9%' },
    precipitation: { ec: 50, ai: 34, ncmrwf: 16, crpsGain: '+19.5%' },
    heatIndex: { ec: 42, ai: 42, ncmrwf: 16, crpsGain: '+18.0%' },
    synopticNote: 'Maritime boundary layer coupled with arid hinterland; balanced BMA.',
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    regionId: 'gujarat',
    region: 'Sabarmati Basin',
    lon: 72.5714,
    lat: 23.0225,
    thermal: { ec: 36, ai: 49, ncmrwf: 15, crpsGain: '+20.1%' },
    precipitation: { ec: 48, ai: 36, ncmrwf: 16, crpsGain: '+18.8%' },
    heatIndex: { ec: 40, ai: 45, ncmrwf: 15, crpsGain: '+19.2%' },
    synopticNote: 'Dry summer thermal maximums; AIFS neural forecasting verified with +20% skill.',
  },

  // --- CENTRAL HIGHLANDS ---
  {
    id: 'bhopal',
    name: 'Bhopal',
    regionId: 'central_india',
    region: 'Malwa Plateau',
    lon: 77.4126,
    lat: 23.2599,
    thermal: { ec: 40, ai: 42, ncmrwf: 18, crpsGain: '+17.4%' },
    precipitation: { ec: 54, ai: 28, ncmrwf: 18, crpsGain: '+20.8%' },
    heatIndex: { ec: 42, ai: 40, ncmrwf: 18, crpsGain: '+16.9%' },
    synopticNote: 'Monsoon depression path; IFS physics controls precipitation spikes.',
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    regionId: 'central_india',
    region: 'Vidarbha Basin',
    lon: 79.0882,
    lat: 21.1458,
    thermal: { ec: 38, ai: 44, ncmrwf: 18, crpsGain: '+18.1%' },
    precipitation: { ec: 52, ai: 30, ncmrwf: 18, crpsGain: '+20.1%' },
    heatIndex: { ec: 41, ai: 41, ncmrwf: 18, crpsGain: '+17.4%' },
    synopticNote: 'Equidistant central continental climate; high ensemble consensus.',
  },
  {
    id: 'raipur',
    name: 'Raipur',
    regionId: 'central_india',
    region: 'Chhattisgarh Plain',
    lon: 81.6296,
    lat: 21.2514,
    thermal: { ec: 40, ai: 42, ncmrwf: 18, crpsGain: '+17.2%' },
    precipitation: { ec: 56, ai: 26, ncmrwf: 18, crpsGain: '+21.5%' },
    heatIndex: { ec: 43, ai: 38, ncmrwf: 19, crpsGain: '+16.8%' },
    synopticNote: 'Bay of Bengal low pressure track; IFS provides superior moisture transport.',
  },

  // --- BENGAL & ODISHA ---
  {
    id: 'kolkata',
    name: 'Kolkata',
    regionId: 'bengal_odisha',
    region: 'Gangetic Delta Coast',
    lon: 88.3639,
    lat: 22.5726,
    thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+17.5%' },
    precipitation: { ec: 58, ai: 24, ncmrwf: 18, crpsGain: '+22.4%' },
    heatIndex: { ec: 48, ai: 34, ncmrwf: 18, crpsGain: '+18.1%' },
    synopticNote: 'High humid air & coastal squall lines; IFS physics essential for rainfall spikes.',
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    regionId: 'bengal_odisha',
    region: 'Odisha Coastal Belt',
    lon: 85.8245,
    lat: 20.2961,
    thermal: { ec: 45, ai: 37, ncmrwf: 18, crpsGain: '+17.1%' },
    precipitation: { ec: 60, ai: 22, ncmrwf: 18, crpsGain: '+23.5%' },
    heatIndex: { ec: 48, ai: 34, ncmrwf: 18, crpsGain: '+17.9%' },
    synopticNote: 'Cyclonic storm surges; IFS conservation dynamics heavily prioritized.',
  },
  {
    id: 'ranchi',
    name: 'Ranchi',
    regionId: 'bengal_odisha',
    region: 'Chota Nagpur Plateau',
    lon: 85.3096,
    lat: 23.3441,
    thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+16.8%' },
    precipitation: { ec: 58, ai: 24, ncmrwf: 18, crpsGain: '+22.0%' },
    heatIndex: { ec: 45, ai: 37, ncmrwf: 18, crpsGain: '+16.2%' },
    synopticNote: 'Moderate altitude plateau; thermodynamic convective triggers favored by IFS.',
  },

  // --- MAHARASHTRA & WESTERN GHATS ---
  {
    id: 'mumbai',
    name: 'Mumbai',
    regionId: 'maharashtra',
    region: 'Konkan Escarpment Coast',
    lon: 72.8777,
    lat: 19.0760,
    thermal: { ec: 46, ai: 36, ncmrwf: 18, crpsGain: '+18.6%' },
    precipitation: { ec: 68, ai: 16, ncmrwf: 16, crpsGain: '+27.4%' },
    heatIndex: { ec: 52, ai: 32, ncmrwf: 16, crpsGain: '+20.2%' },
    synopticNote: 'Extreme coastal convection & squall; IFS physics given 68% weight to eliminate AI oversmoothing.',
  },
  {
    id: 'ratnagiri',
    name: 'Ratnagiri',
    regionId: 'maharashtra',
    region: 'South Konkan Escarpment',
    lon: 73.3120,
    lat: 16.9902,
    thermal: { ec: 48, ai: 34, ncmrwf: 18, crpsGain: '+18.0%' },
    precipitation: { ec: 70, ai: 15, ncmrwf: 15, crpsGain: '+28.5%' },
    heatIndex: { ec: 54, ai: 30, ncmrwf: 16, crpsGain: '+19.8%' },
    synopticNote: 'Steepest orographic lifting in India; IFS deterministic physics dominant.',
  },
  {
    id: 'pune',
    name: 'Pune',
    regionId: 'maharashtra',
    region: 'Western Deccan Lee',
    lon: 73.8567,
    lat: 18.5204,
    thermal: { ec: 42, ai: 40, ncmrwf: 18, crpsGain: '+17.9%' },
    precipitation: { ec: 58, ai: 25, ncmrwf: 17, crpsGain: '+22.1%' },
    heatIndex: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+17.2%' },
    synopticNote: 'Rainshadow lee side of Ghats; sharp precipitation boundary resolved by IFS.',
  },

  // --- KERALA & GOA ---
  {
    id: 'panaji',
    name: 'Panaji',
    regionId: 'kerala_goa',
    region: 'Goa Coastal Plain',
    lon: 73.8278,
    lat: 15.4909,
    thermal: { ec: 46, ai: 36, ncmrwf: 18, crpsGain: '+18.2%' },
    precipitation: { ec: 67, ai: 17, ncmrwf: 16, crpsGain: '+26.8%' },
    heatIndex: { ec: 50, ai: 33, ncmrwf: 17, crpsGain: '+19.0%' },
    synopticNote: 'Heavy monsoonal inflow; IFS physics captures acute rain rates.',
  },
  {
    id: 'kochi',
    name: 'Kochi',
    regionId: 'kerala_goa',
    region: 'Malabar Coastline',
    lon: 76.2673,
    lat: 9.9312,
    thermal: { ec: 45, ai: 37, ncmrwf: 18, crpsGain: '+18.0%' },
    precipitation: { ec: 65, ai: 18, ncmrwf: 17, crpsGain: '+25.9%' },
    heatIndex: { ec: 50, ai: 33, ncmrwf: 17, crpsGain: '+18.8%' },
    synopticNote: 'Monsoon onset gateway; IFS physics resolves early burst dynamics.',
  },
  {
    id: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    regionId: 'kerala_goa',
    region: 'Southern Malabar Tip',
    lon: 76.9366,
    lat: 8.5241,
    thermal: { ec: 42, ai: 40, ncmrwf: 18, crpsGain: '+18.2%' },
    precipitation: { ec: 64, ai: 19, ncmrwf: 17, crpsGain: '+24.5%' },
    heatIndex: { ec: 48, ai: 35, ncmrwf: 17, crpsGain: '+18.4%' },
    synopticNote: 'South peninsular maritime boundary; strong Arabian Sea monsoon surge.',
  },

  // --- DECCAN PLATEAU ---
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    regionId: 'deccan',
    region: 'Telangana Plateau',
    lon: 78.4867,
    lat: 17.3850,
    thermal: { ec: 40, ai: 43, ncmrwf: 17, crpsGain: '+18.4%' },
    precipitation: { ec: 50, ai: 32, ncmrwf: 18, crpsGain: '+19.6%' },
    heatIndex: { ec: 41, ai: 41, ncmrwf: 18, crpsGain: '+17.8%' },
    synopticNote: 'Elevated tableland; stable diurnal temperatures smoothly captured by AIFS.',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    regionId: 'deccan',
    region: 'Mysore Plateau',
    lon: 77.5946,
    lat: 12.9716,
    thermal: { ec: 38, ai: 45, ncmrwf: 17, crpsGain: '+19.8%' },
    precipitation: { ec: 52, ai: 30, ncmrwf: 18, crpsGain: '+20.5%' },
    heatIndex: { ec: 39, ai: 43, ncmrwf: 18, crpsGain: '+18.7%' },
    synopticNote: 'Stable 920m altitude plateau; AIFS shows remarkable seasonal temperature skill.',
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    regionId: 'deccan',
    region: 'Northern Circars Coast',
    lon: 83.2185,
    lat: 17.6868,
    thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+17.8%' },
    precipitation: { ec: 58, ai: 24, ncmrwf: 18, crpsGain: '+22.5%' },
    heatIndex: { ec: 47, ai: 35, ncmrwf: 18, crpsGain: '+18.0%' },
    synopticNote: 'Eastern Ghats maritime transition; balanced ensemble weighting.',
  },

  // --- TAMIL NADU ---
  {
    id: 'chennai',
    name: 'Chennai',
    regionId: 'tamilnadu',
    region: 'Coromandel Coastal Plain',
    lon: 80.2707,
    lat: 13.0827,
    thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+18.1%' },
    precipitation: { ec: 60, ai: 22, ncmrwf: 18, crpsGain: '+23.2%' },
    heatIndex: { ec: 48, ai: 34, ncmrwf: 18, crpsGain: '+18.9%' },
    synopticNote: 'Northeast monsoon coastal convergence; IFS physics favored for easterly squalls.',
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    regionId: 'tamilnadu',
    region: 'Indian Ocean Convergence Cape',
    lon: 77.5385,
    lat: 8.0883,
    thermal: { ec: 40, ai: 42, ncmrwf: 18, crpsGain: '+17.9%' },
    precipitation: { ec: 62, ai: 20, ncmrwf: 18, crpsGain: '+23.8%' },
    heatIndex: { ec: 46, ai: 37, ncmrwf: 17, crpsGain: '+18.1%' },
    synopticNote: 'Tri-sea maritime junction; balanced BMA weighting for sea breeze moderation.',
  },
  {
    id: 'madurai',
    name: 'Madurai',
    regionId: 'tamilnadu',
    region: 'South Interior Tamil Nadu',
    lon: 78.1198,
    lat: 9.9252,
    thermal: { ec: 38, ai: 45, ncmrwf: 17, crpsGain: '+19.3%' },
    precipitation: { ec: 56, ai: 26, ncmrwf: 18, crpsGain: '+20.8%' },
    heatIndex: { ec: 42, ai: 42, ncmrwf: 16, crpsGain: '+18.7%' },
    synopticNote: 'Rain-shadow basin; AIFS neural weights favored for dry thermal cycle.',
  },

  // --- NORTHEAST ---
  {
    id: 'guwahati',
    name: 'Guwahati',
    regionId: 'northeast',
    region: 'Brahmaputra Valley',
    lon: 91.7362,
    lat: 26.1445,
    thermal: { ec: 44, ai: 38, ncmrwf: 18, crpsGain: '+17.5%' },
    precipitation: { ec: 60, ai: 22, ncmrwf: 18, crpsGain: '+23.1%' },
    heatIndex: { ec: 45, ai: 37, ncmrwf: 18, crpsGain: '+17.2%' },
    synopticNote: 'Narrow valley moisture trapping; IFS leads precipitation.',
  },
  {
    id: 'cherrapunji',
    name: 'Cherrapunji',
    regionId: 'northeast',
    region: 'Meghalaya Orographic Trap',
    lon: 91.7323,
    lat: 25.2986,
    thermal: { ec: 52, ai: 30, ncmrwf: 18, crpsGain: '+18.5%' },
    precipitation: { ec: 72, ai: 14, ncmrwf: 14, crpsGain: '+31.2%' },
    heatIndex: { ec: 55, ai: 28, ncmrwf: 17, crpsGain: '+20.5%' },
    synopticNote: 'World highest precipitation funnel; IFS physics assigned 72% weight to resolve extreme accumulation.',
  },
];

/**
 * Metadata for the 3 Model Weight Regimes
 */
export const WEIGHT_REGIMES = {
  thermal: {
    id: 'thermal',
    label: 'Thermal Weights',
    icon: 'thermostat',
    title: 'Thermal BMA Weight Distribution',
    description: 'Bayesian weighting for surface temperature & diurnal flux',
    dominantModel: 'ECMWF AIFS (Deep Learning) in Plains / IFS in Mountains',
    avgWeights: { ec: 41, ai: 42, ncmrwf: 17 },
    keyInsight: 'AIFS neural model exhibits higher skill (+19% CRPS) across flat basins; IFS physics leads in orographic ridges.',
    legendMin: '20% Min Weight',
    legendMax: '65% Peak Weight',
    gradientCss: 'from-blue-500 via-emerald-400 via-yellow-400 to-orange-500',
  },
  precipitation: {
    id: 'precipitation',
    label: 'Precipitation Weights',
    icon: 'rainy',
    title: 'Precipitation BMA Weight Distribution',
    description: 'Bayesian weighting for 24h rainfall & squall convective triggers',
    dominantModel: 'ECMWF IFS (Physics NWP) in Ghats & Northeast',
    avgWeights: { ec: 58, ai: 25, ncmrwf: 17 },
    keyInsight: 'ECMWF IFS physics assigned up to 72% weight in Western Ghats & Meghalaya to eliminate AI oversmoothing of extreme peaks.',
    legendMin: '15% Min Weight',
    legendMax: '75% Peak Weight',
    gradientCss: 'from-sky-400 via-blue-600 to-indigo-700',
  },
  heatIndex: {
    id: 'heatIndex',
    label: 'Heat Index Weights',
    icon: 'whatshot',
    title: 'Heat Index BMA Weight Distribution',
    description: 'Bayesian weighting for coupled humidity & wet-bulb stress',
    dominantModel: 'Balanced Hybrid (IFS Coastal / AIFS Continental)',
    avgWeights: { ec: 46, ai: 37, ncmrwf: 17 },
    keyInsight: 'IFS physics leads moisture advection in humid coastal corridors (48%–54%), while AIFS captures inland desert heat flux.',
    legendMin: '15% Min Weight',
    legendMax: '65% Peak Weight',
    gradientCss: 'from-emerald-500 via-yellow-400 via-orange-500 to-red-600',
  },
};

/**
 * Returns a GeoJSON FeatureCollection formatted for MapLibre GL JS sources
 * Computes node properties based on the active regime, model focus, and lead time.
 */
export function getModelWeightsGeoJSON(regimeKey = 'thermal', modelFocus = 'blend', leadTimeId = '24h') {
  // Lead time multiplier adjustments
  let leadMultiplier = { ec: 1.0, ai: 1.0, ncmrwf: 1.0 };
  if (leadTimeId === '3d') {
    leadMultiplier = { ec: 0.94, ai: 1.08, ncmrwf: 0.98 };
  } else if (leadTimeId === '7d') {
    leadMultiplier = { ec: 0.88, ai: 1.15, ncmrwf: 0.97 };
  } else if (leadTimeId === '14d') {
    leadMultiplier = { ec: 0.84, ai: 1.18, ncmrwf: 0.98 };
  }

  return {
    type: 'FeatureCollection',
    features: MODEL_WEIGHT_NODES.map((node) => {
      const regimeData = node[regimeKey] || node.thermal;
      
      // Calculate dynamic weights adjusted for lead time
      let ecW = Math.round(regimeData.ec * leadMultiplier.ec);
      let aiW = Math.round(regimeData.ai * leadMultiplier.ai);
      let ncmrwfW = Math.round(regimeData.ncmrwf * leadMultiplier.ncmrwf);
      const total = ecW + aiW + ncmrwfW;
      ecW = Math.round((ecW / total) * 100);
      aiW = Math.round((aiW / total) * 100);
      ncmrwfW = 100 - ecW - aiW;

      let displayWeight = ecW;
      let dominant = 'ECMWF IFS';
      let dominantColor = '#38bdf8'; // Sky Blue

      if (modelFocus === 'ec') {
        displayWeight = ecW;
      } else if (modelFocus === 'ai') {
        displayWeight = aiW;
        dominant = 'ECMWF AIFS';
        dominantColor = '#4edea3';
      } else if (modelFocus === 'ncmrwf') {
        displayWeight = ncmrwfW;
        dominant = 'NCMRWF Unified';
        dominantColor = '#fbbf24';
      } else {
        // blend mode: use highest weight
        if (aiW > ecW && aiW > ncmrwfW) {
          dominant = 'ECMWF AIFS';
          dominantColor = '#4edea3'; // Mint / Emerald
          displayWeight = aiW;
        } else if (ncmrwfW > ecW && ncmrwfW > aiW) {
          dominant = 'NCMRWF Unified';
          dominantColor = '#fbbf24'; // Amber
          displayWeight = ncmrwfW;
        } else {
          dominant = 'ECMWF IFS';
          dominantColor = '#38bdf8'; // Cyan
          displayWeight = ecW;
        }
      }

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [node.lon, node.lat],
        },
        properties: {
          id: node.id,
          name: node.name,
          region: node.region,
          regionId: node.regionId,
          weight: displayWeight,
          ecWeight: ecW,
          aiWeight: aiW,
          ncmrwfWeight: ncmrwfW,
          crpsGain: regimeData.crpsGain,
          dominant,
          dominantColor,
          synopticNote: node.synopticNote,
        },
      };
    }),
  };
}
