# ClimaFuse — Hybrid AI-NWP Meteorological Intelligence Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-v6.11-3969EC?logo=maplibre&logoColor=white)](https://maplibre.org/)
[![Recharts](https://img.shields.io/badge/Recharts-v3.10-22B5BF)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-emerald)](LICENSE)

> **High-precision meteorological intelligence fusing ECMWF numerical weather prediction (IFS) with deep learning neural models (AIFS) via Adaptive Bayesian Model Averaging (BMA), calibrated against 800+ India Meteorological Department (IMD) Automatic Weather Stations.**

---

## 1. Executive Summary & Problem Space

Modern meteorology faces a fundamental trade-off:
- **Physics-Based NWP (e.g., ECMWF IFS, NCMRWF Unified)**: Solves primitive hydro-thermodynamic Navier-Stokes atmospheric equations. Excels at tracking synoptic-scale waves and conservation laws, but suffers from steep computational cost, grid-scale friction biases, and elevation smearing over complex orography (e.g., Himalayas, Western Ghats).
- **Neural/AI Weather Prediction (e.g., ECMWF AIFS, GraphCast)**: Deep learning autoregressive transformers and Graph Neural Networks (GNNs). Delivers 1000× faster inference with ultra-low diurnal bias, but can struggle with unprecedented out-of-distribution extremes and lacks explicit mass/moisture conservation.
- **Traditional Consensus Blends**: Rely on static, regionally invariant arithmetic averaging that fails during localized convective episodes, monsoon surges, or nocturnal temperature inversions.

### The ClimaFuse Solution
**ClimaFuse** introduces **Adaptive Bayesian Model Averaging (BMA)**. Instead of fixed weights, attribution probabilities dynamically shift across:
1. **12 Subcontinental Microclimatic Zones** (Indo-Gangetic Plain, Konkan Coast, Deccan Plateau, Northeast Hills, Thar Desert, etc.).
2. **Seasonal & Synoptic Regimes** (Thermal, Precipitation, Heat Index).
3. **Forecast Lead Times** (`0–6h`, `6–24h`, `1–3d`, `3–7d`, `7–14d`).
4. **Ground-Truth Calibration**: Continuous validation against 800+ India Meteorological Department (IMD) Automatic Weather Stations (AWS) via an Expectation-Maximization (EM) mixture solver optimizing Continuous Ranked Probability Score (CRPS).

---

## 2. Core Workstations & Capabilities

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                    CLIMAFUSE WORKSPACE                                   │
├────────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│    LANDING PLATFORM (/)    │     LIVE DASHBOARD (/dashboard)      │  FULL STATION (/station/:id)  │
├────────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ • Architectural relief map │ • 60/40 workstation split   │ • 10 IMD Reference Stations   │
│ • Radar scanline sweep     │ • MapLibre GL Heatmaps      │ • 24h Diurnal BMA Curves      │
│ • Adaptive BMA Bento grid  │ • Synoptic UTC Cycle Picker │ • 90% Confidence Polygons     │
│ • Zero-key open ESRI tiles │ • Dual-mode Right Column    │ • Rothfusz Heat Index Stress  │
│ • Austere dark mode        │ • All-India IMD Bulletins   │ • Hourly Hyetograph Bars      │
│ • Anchor smooth-scroll     │ • Regional Model Allocation │ • Radiosonde Soundings (CAPE) │
│ • Direct portal routing    │ • One-click "Fit India" lock│ • One-click CSV Telemetry     │
└────────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

### 1. Architectural Landing Page (`/`)
- **Interactive Geospatial Preview**: Centered physical relief map of India with continuous radar wavefront scanline, pulsing station nodes, and live coordinate HUD badges.
- **BMA Capability Bento Grid**: 5 operational cards detailing Bayesian Weight Allocation, IMD 4-tier warning integration (Green, Yellow, Orange, Red), and multi-horizon verification.
- **Strictly Symmetrical Typography**: Balanced viewport layout styled in pure monochromatic dark glassmorphism.

### 2. Live Map Dashboard & Subcontinental Geospatial Telemetry (`/dashboard`)
- **60% Left Workstation — MapLibre GL Engine**:
  - Open ESRI World Physical Map hypsometric relief tiles (mountain relief, river valleys, Deccan plateau) with **ZERO required API keys**.
  - Multi-basemap switcher (Physical Relief, Topographic, Satellite Imagery).
  - Native MapLibre GL heatmaps for **Thermal** (10°C–40°C), **Precipitation** (0–120+ mm), and **Heat Index** (20°C–48°C) with interactive floating scale legends.
  - One-click `Fit India` button locking the single-frame subcontinental extent (`[[67.0, 6.2], [97.8, 37.5]]`).
  - Synoptic cycle date-picker supporting `00:00`, `06:00`, `12:00`, and `18:00` UTC runs.
- **40% Right Workstation — Dual-Mode Intelligence**:
  - **Default Mode (`selectedCity === null`)**: Renders [`NationalOverviewPanel`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/NationalOverviewPanel.jsx) with All-India synoptic layer cards bidirectionally linked to map heatmaps, alongside categorized IMD Warning Bulletins (1 Red, 3 Orange, 3 Yellow, 3 Green).
  - **Station Telemetry Mode (`selectedCity !== null`)**: Renders [`StationTelemetryPanel`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/StationTelemetryPanel.jsx) with high-density AWS readouts, barometric pressure, UV index, 24h diurnal progression strip, AI-NWP consensus breakdown, and a direct CTA link to full station analysis.

### 3. Geospatial Model Consensus & Comparison (`/dashboard?tab=comparison`)
- **Prominent Left Column — Geospatial BMA Weight Map**:
  - Renders empirical BMA attribution weights across 25+ stations and 12 regions.
  - Interactive model filter: Consensus Blend, ECMWF IFS (Physics), ECMWF AIFS (Neural GNN), and NCMRWF Unified (Regional).
  - Multi-regime switcher (Thermal Weights, Precipitation Weights, Heat Index Weights).
- **Dedicated Right Column — Analytical Weight Panel**:
  - Lead time selectors (`24 Hours`, `3 Days`, `7 Days`, `14 Days`) dynamically recalculating model weights.
  - Custom SVG Donut Chart showing 3-model breakdown and CRPS skill gain.
  - Recharts multi-line timeseries curves charting weight evolution across lead times.
  - Terrain physics rationale and inspectable 12-Region Attribution Matrix modal.

### 4. Full Station Analysis & Radiosonde Workstation (`/station/:cityId`)
- **Top Bar & Dynamic City Switcher**: Dropdown selector allowing instantaneous inspection across 10 IMD reference stations:
  1. **New Delhi** (Safdarjung — `Station 42182`)
  2. **Mumbai** (Santacruz — `Station 43003`)
  3. **Bengaluru** (HAL / Kempegowda — `Station 43295`)
  4. **Kolkata** (Alipore — `Station 42807`)
  5. **Chennai** (Meenambakkam — `Station 43279`)
  6. **Ahmedabad** (Hansol — `Station 42647`)
  7. **Hyderabad** (Begumpet — `Station 43128`)
  8. **Pune** (Shivajinagar — `Station 43063`)
  9. **Jaipur** (Sanganer — `Station 42348`)
  10. **Lucknow** (Amausi — `Station 42369`)
- **5-Parameter Telemetry Grid**: Surface Air Temp, Apparent Heat Index, Accumulated Rain, Surface Vector Wind, Relative Humidity.
- **3 High-Fidelity SVG Charts**:
  - **Temperature Timeseries**: 24h diurnal curves with 90% BMA confidence interval polygon, ECMWF IFS (dashed blue), ECMWF AIFS (dotted green), ClimaFuse BMA (solid amber), and IMD Observed ground truth nodes with hover crosshair and tooltips.
  - **Heat Index & Biometeorological Stress**: 35.0°C danger zone shading, Rothfusz regression threshold lines, and multi-model convergence curves.
  - **Hourly Precipitation Hyetograph**: Paired hourly bar charts comparing ClimaFuse vs IMD tipping bucket rain gauges.
- **Radiosonde Atmospheric Sounding**: Vertical isobaric profile across 7 levels (1000 hPa to 200 hPa tropopause), freezing level (0°C isotherm), CAPE, and Lifted Index (LI).
- **Synoptic Reasoning & Ground Truth Scorecard**: Two-tone BMA proportion bar, meteorologist diagnostic commentary, convergence metrics (Spread $\sigma$, CRPS), active IMD advisory banner, and accuracy scorecard table.
- **One-Click CSV Telemetry Export**: Client-side CSV generator and instant download.

---

## 3. Design System & Aesthetics

All UI components strictly adhere to the austere technical SaaS aesthetic defined in Stitch Project `projects/17717170675868708570`:

| Design Token | Specification | Implementation |
|---|---|---|
| **Canvas Base** | `#0A0A0A` | Absolute dark mode foundation |
| **Surface Raised** | `#121212` | Primary cards, panels, and workstations |
| **Surface Elevated** | `#181818` / `#1C1B1B` | Hover states, modals, and tooltips |
| **Hairlines** | `#262626` (Subtle), `#383838` (Active) | 1px surgical structural borders |
| **Left Navigation Docks** | `border-2 border-white shadow-2xl` | High-contrast white boundary popping off black canvas |
| **The Zero-Chrome Rule** | Monochromatic chrome (`#0A0A0A`–`#FFFFFF`) | Color reserved exclusively for operational telemetry |
| **Typography: Headlines** | `Plus Jakarta Sans` | Geometric letterforms with `-0.035em` tracking |
| **Typography: Body** | `Inter` | High-legibility neutral workhorse |
| **Typography: Data** | `JetBrains Mono` | Tabular lining figures (`tnum`) for zero jitter |

---

## 4. Technical Architecture & Directory Structure

```
Climafuse/
├── public/
│   ├── india.geojson             # Precision GeoJSON boundary for India landmass
│   └── favicon.svg               # Vector brand insignia
├── src/
│   ├── api/
│   │   ├── cities.js             # 10 IMD reference stations & telemetry models
│   │   ├── atmosphericData.js    # 40+ subcontinental observation grid points
│   │   ├── modelWeightsData.js   # 12-region BMA weight attribution matrix
│   │   └── stationAnalysisData.js# 24h curves, radiosonde profiles & CSV export
│   ├── components/
│   │   ├── BentoGrid.jsx         # Landing page operational capability cards
│   │   ├── DashboardNavDock.jsx  # Floating left dock with high-contrast white border
│   │   ├── DashboardTopBar.jsx   # Top utility bar with UTC synoptic calendar
│   │   ├── MapComponent.jsx      # MapLibre GL engine with ESRI physical relief
│   │   ├── ModelWeightAnalysisPanel.jsx # 40% lead-time & BMA breakdown panel
│   │   ├── ModelWeightMap.jsx    # 60% geospatial BMA weight heatmaps
│   │   ├── NationalOverviewPanel.jsx # All-India synoptic telemetry & bulletins
│   │   ├── SideNavDock.jsx       # Floating landing page navigation dock
│   │   ├── StationCharts.jsx     # SVG timeseries curves & hyetograph
│   │   ├── StationParameterGrid.jsx # 5-parameter telemetry metric cards
│   │   ├── StationRadiosonde.jsx # Isobaric vertical profile & CAPE indices
│   │   ├── StationReasoningAndScorecard.jsx # BMA proportion bar & verification table
│   │   ├── StationSummaryBanner.jsx # Station coordinates, WMO ID & condition preview
│   │   ├── StationTelemetryPanel.jsx # AWS inspection workstation & full-page CTA
│   │   ├── StationTopBar.jsx     # Breadcrumb city dropdown & CSV export button
│   │   └── TopUtilityPill.jsx    # Floating status badge with pulsing live indicator
│   ├── Pages/
│   │   ├── DashboardPage.jsx     # Dual-tab analytical workstation (Map & Comparison)
│   │   ├── LandingPage.jsx       # Editorial hero, radar relief map & Bento showcase
│   │   └── StationAnalysisPage.jsx # Full-page station inspection & sounding console
│   ├── App.jsx                   # React Router v7 createBrowserRouter routing
│   ├── index.css                 # Tailwind v4 configuration, theme tokens & animations
│   └── main.jsx                  # Application entry point
├── AGENTS.md                     # Agent engineering & design system specifications
├── PLAN.md                       # Comprehensive milestone tracker & roadmap
├── package.json                  # Dependencies & scripts
└── vite.config.js                # Vite build configuration with @tailwindcss/vite
```

---

## 5. Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) Data APIs (`createBrowserRouter`, `RouterProvider`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` with custom `@theme` tokens
- **Geospatial Mapping**: [MapLibre GL JS](https://maplibre.org/) with ESRI World Physical Map tiles (zero API keys required)
- **Data Visualization**: [Recharts 3.x](https://recharts.org/) and high-precision interactive SVG timeseries plots
- **Date Handling & Utilities**: `date-fns`, `react-day-picker`
- **Iconography**: Google Material Symbols Outlined (stroke width 300, opsz 20) & Lucide React

---

## 6. Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ClimaFuse.git
cd ClimaFuse/Climafuse

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the Vite development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Production Build
```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 7. Operational Routing Map

| Route | View | Description |
|---|---|---|
| `/` | `LandingPage` | Editorial overview, radar scanline relief map, capability Bento grid |
| `/dashboard` | `DashboardPage` (Tab: Map) | Subcontinental MapLibre GL physical map + National Overview / Station Telemetry |
| `/dashboard?tab=comparison` | `DashboardPage` (Tab: Comparison) | 60% BMA Weight Map + 40% Lead-Time Attribution Analysis Panel |
| `/dashboard?tab=alerts` | `DashboardPage` (Tab: Alerts) | Full-screen active IMD Bulletins and severe weather alerts |
| `/station/:cityId` | `StationAnalysisPage` | Deep-dive telemetry, 24h diurnal curves, radiosonde soundings, and CSV export |
| `/station` | Redirect | Automatically redirects to `/station/delhi` |

---

## 8. Development Roadmap

- [x] **Phase 1**: Project scaffold, Tailwind v4, MapLibre GL, and Landing Page.
- [x] **Phase 2**: Subcontinental Map Dashboard, ESRI physical relief basemap, Heatmap layers, and National Overview panel.
- [x] **Phase 3**: 60/40 Model Comparison Workstation, BMA Geospatial Weight Map, Lead-Time curves, and attribution matrix.
- [x] **Phase 4**: Full Station Analysis & Radiosonde Workstation, 10-city dataset, interactive SVG diurnal charts, and CSV telemetry export.
- [ ] **Phase 5**: Real-time IMD alert threshold websocket triggers (Level 1–4 color codes).
- [ ] **Phase 6**: Direct NetCDF4 / GeoTIFF spatial raster download endpoints.

---

## 9. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
