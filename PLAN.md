# ClimaFuse — Development Plan & Roadmap

## 1. Project Overview
ClimaFuse is a high-precision, technical meteorological intelligence platform that fuses ECMWF physics-based numerical weather prediction (IFS) with deep learning neural models (AIFS) via adaptive Bayesian Model Averaging (BMA) — weights vary by region, season, and lead time instead of being fixed. Ground truth calibration is driven by 800+ India Meteorological Department (IMD) Automatic Weather Stations (AWS).

---

## 2. Stack
- **Framework**: React (Vite)
- **Routing**: React Router v6.4+ — Data APIs (`createBrowserRouter`, `RouterProvider`, supporting loaders, defer(not required in v7 so not here), Await, Suspense)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin, `@import "tailwindcss"` in `src/index.css`)
- **Geospatial / Map**: MapLibre GL JS — static India GeoJSON boundary, no tile provider/API key required
- **Data Visualization**: Recharts — all timeseries and model comparison charts
- **Utilities**: date-fns (date handling), react-day-picker (calendar UI), lucide-react & Material Symbols (icons), axios (configured for API endpoints)
- **Design Source**: Stitch (Project `projects/17717170675868708570`)

---

## 3. Implementation Status

### Phase 1: Foundation, Styling & Landing Page [COMPLETED]
- [x] Project scaffolded (Vite + React)
- [x] Tailwind v4 configured (`vite.config.js` plugin + `@import` in `index.css`)
- [x] MapLibre installed + CSS imported
- [x] react-day-picker installed + CSS imported
- [x] Landing page design generated & extracted from Stitch (`d7d14eb7a1e84dc6a999c091d9bf58ae`)
- [x] Landing page implemented in [`src/Pages/LandingPage.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/Pages/LandingPage.jsx)
- [x] Subcomponents extracted to `src/components/`:
  - [`SideNavDock.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/SideNavDock.jsx): Floating navigation dock with section anchors and Dark/Light theme toggle
  - [`TopUtilityPill.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/TopUtilityPill.jsx): Floating status badge with pulsing live indicator and dashboard quick-link
  - [`IndiaTelemetryMap.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/IndiaTelemetryMap.jsx): Architectural vector map of India with radar sweep and IMD AWS station nodes
  - [`BentoGrid.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/BentoGrid.jsx): 5 operational capability cards with dynamic attribution bar and IMD alert tiers
- [x] React Router v6.4+ Data APIs configured in [`src/App.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/App.jsx) (`createBrowserRouter`, `RouterProvider`)

### Phase 2: Live Map Dashboard & Subcontinental Geospatial Telemetry [COMPLETED]
- [x] Extract Dashboard design from Stitch (`0f29241ba77a493f8e6a04fd78de92e9`)
- [x] India GeoJSON boundary placed at [`/public/india.geojson`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/public/india.geojson)
- [x] Mock station API created at [`/src/api/cities.js`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/api/cities.js) with 10 fixed reference stations
- [x] MapLibre GL JS physical map component implemented in [`src/components/MapComponent.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/MapComponent.jsx):
  - Physical Relief Map (Image 2 style) using ESRI World Physical Map raster tiles (hypsometric elevation tints, Himalayas, Deccan Plateau, Western/Eastern Ghats, rivers) — ZERO API key required
  - Multi-basemap switcher (Physical Relief, Topographic, Satellite Imagery, Dark Telemetry)
  - Optional MapTiler vector topo integration (`VITE_MAPTILER_KEY` via `.env.example`)
  - Crisp India boundary vector overlay (`/india.geojson`)
  - Constrained bounds (`[[58.0, 4.0], [102.0, 39.0]]`) centered on India
  - 10 clickable custom city markers showing weather glyphs, temperature, and IMD severity pips (Green/Yellow/Orange/Red)
  - Data-driven atmospheric layer toggle support (Thermal / Precipitation / Heat Index / Relief Only)
  - HUD telemetry badge with real-time cursor coordinates
- [x] Replaced landing page map with dynamic `MapComponent variant="landing"`:
  - Preserved exact container sizing (`w-full aspect-[4/5] max-w-md mx-auto rounded-2xl`)
  - Retained radar wavefront scanline, live station beacons, and header/footer telemetry badges
- [x] Resolved Vite Web Worker bundler issue via `optimizeDeps: { exclude: ['maplibre-gl'] }`
- [x] Integrated MapComponent into [`src/Pages/DashboardPage.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/Pages/DashboardPage.jsx)
- [x] Subcomponents: [`DashboardNavDock.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/DashboardNavDock.jsx), [`DashboardTopBar.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/DashboardTopBar.jsx), [`StationTelemetryPanel.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/StationTelemetryPanel.jsx)
- [x] Multi-tab views for Model Comparison, Active IMD Bulletins, and Synoptic Insights

### Phase 3: Model Comparison & Verification Analytics [UPCOMING]
- [ ] Recharts time-series comparison curves: IFS (Physics) vs AIFS (AI) vs Ground Truth AWS
- [ ] Verification metrics table (Continuous Ranked Probability Score, RMSE, Brier score)

### Phase 4: IMD Alerts & Data Feeds [UPCOMING]
- [ ] IMD 4-tier alert threshold trigger system (Green, Yellow, Orange, Red)
- [ ] Data feed download endpoints (NetCDF4, GeoTIFF, CSV)
