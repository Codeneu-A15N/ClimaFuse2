# AGENTS.md — ClimaFuse Engineering & Design Guidelines

This document outlines architecture patterns, design system guidelines, and operational procedures for autonomous coding agents contributing to ClimaFuse.

---

## 1. Design System & Aesthetics (Stitch Project Reference)
All UI interfaces in ClimaFuse adhere to the design system established in Stitch Project `projects/17717170675868708570`.

### Key Aesthetic Principles:
1. **Austere Technical SaaS Aesthetic**:
   - Near-absolute dark mode background (`#0A0A0A`).
   - Cards/Surfaces: `#111111`, `#121212`, `#181818`, `#222222`.
   - Structural hairlines: `#262626` (subtle) and `#383838` / `#444748` (active/borders).
2. **The Zero-Chrome Color Rule**:
   - Structural chrome (navbars, cards, sidebars, panel backgrounds) must remain strictly monochromatic (`#0A0A0A` through `#FFFFFF`).
   - Color is reserved exclusively for semantic operational telemetry:
     - **IMD Alert Tiers**:
       - Green (`#10B981`): Level 1 — No Warning / Normal
       - Yellow (`#FBBF24`): Level 2 — Watch / Be Updated
       - Orange (`#F97316`): Level 3 — Alert / Be Prepared
       - Red (`#EF4444`): Level 4 — Warning / Take Action
     - **System Status / Live indicator**: Emerald / Mint (`#4EDEA3`).
3. **Typography**:
   - **Headlines & Display**: `Plus Jakarta Sans` with tight negative letter spacing (`-0.025em` to `-0.04em`).
   - **Body & Editorial**: `Inter` for spatial metrics and telemetry readouts.
   - **Data, Coordinates & Timestamps**: `JetBrains Mono` with tabular numerals (`font-mono`).
   - **Icons**: `Material Symbols Outlined` (stroke width 300, opsz 20).

---

## 2. Directory Structure & Conventions
```
Climafuse/
├── public/
│   └── india.geojson       # Local GeoJSON boundary for India landmass
├── src/
│   ├── api/                # Mock APIs & data models (e.g. cities.js)
│   ├── Pages/              # Full page views (e.g. LandingPage.jsx, DashboardPage.jsx)
│   ├── components/         # Reusable modular subcomponents (MapComponent, SideNavDock, etc.)
│   ├── assets/             # Static SVGs, images, and brand assets
│   ├── App.jsx             # Top-level application routing (createBrowserRouter / RouterProvider)
│   ├── index.css           # Tailwind v4 imports, @theme color tokens, keyframe animations
│   └── main.jsx            # Application entrypoint
├── index.html              # HTML shell loading Google Fonts & Material Symbols
├── vite.config.js          # Vite config with @tailwindcss/vite plugin
├── PLAN.md                 # Project roadmap and milestone tracker
└── AGENTS.md               # Agent guidelines and design system specifications
```

---

## 3. Component Architecture Rules
- **Routing**: Always use React Router v6.4+ Data APIs (`createBrowserRouter` & `<RouterProvider router={router} />`) in [`src/App.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/App.jsx). This architecture supports data loaders, defer, and Suspense for future weather API streaming.
- **Pages**: Store main page components in `src/Pages/` (e.g. [`src/Pages/LandingPage.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/Pages/LandingPage.jsx), [`src/Pages/DashboardPage.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/Pages/DashboardPage.jsx)).
- **Subcomponents**: Extract modular sections into `src/components/` (e.g., [`SideNavDock.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/SideNavDock.jsx), [`TopUtilityPill.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/TopUtilityPill.jsx), [`MapComponent.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/MapComponent.jsx), [`BentoGrid.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/BentoGrid.jsx)).
- **Geospatial Map Architecture**:
  - `MapComponent.jsx` handles MapLibre GL rendering with multi-basemap capabilities.
  - **Zero-Key Physical Relief Default**: Always defaults to open ESRI World Physical Map tiles (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}`) for hypsometric terrain, mountain relief, and hydrological networks with ZERO required API keys.
  - **Optional Custom Tiles**: Supports `VITE_MAPTILER_KEY` if provided in `.env`.
  - **Landing Page Sizing Constraint**: When rendered on `LandingPage.jsx` (`variant="landing"`), the container must strictly preserve `w-full aspect-[4/5] max-w-md mx-auto rounded-2xl` with zero dimension shift.
- **Dashboard Right Workstation Architecture**:
  - The right column (`w-full lg:w-[420px] shrink-0 h-full`) operates with a dual-mode pattern:
    1. **Default Mode (`selectedCity === null`)**: Renders [`NationalOverviewPanel.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/NationalOverviewPanel.jsx) showing the All-India subcontinental mesh overview, multi-layer atmospheric telemetry (Thermal, Precipitation, Heat Index) with bidirectional layer switching, and All-India IMD Warning Bulletins categorized across the 10 reference stations.
    2. **Station Telemetry Mode (`selectedCity !== null`)**: Renders [`StationTelemetryPanel.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/StationTelemetryPanel.jsx) with high-density AWS station readouts, barometric pressure, UV index, 24h diurnal meteogram strip, and AI consensus blend.
  - **Bidirectional Layer Synchronization**: `activeOverlay` is managed in [`DashboardPage.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/Pages/DashboardPage.jsx) and synchronized between [`MapComponent.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/MapComponent.jsx) (bottom HUD buttons) and [`NationalOverviewPanel.jsx`](file:///c:/Users/neera/OneDrive/Desktop/ClimaFuse/Climafuse/src/components/NationalOverviewPanel.jsx) (synoptic layer cards).
  - **Seamless Navigation**: Users can click any city card in the warning bulletins list or any marker on the map to inspect station telemetry, and click `← All-India Overview` or `onResetMap` in the top bar to return to the national overview.
- **Theme Support**: Ensure components support dark/light modes cleanly using CSS variables or Tailwind dark mode utilities (`document.documentElement.classList.toggle('dark')`).
- **Smooth Anchors**: Maintain anchor navigation IDs: `#product`, `#how-it-works`, `#why-climafuse`, `#outputs`, `#coverage`.

---

## 4. Verification & Testing
- To test production build:
  ```bash
  cmd /c npm run build
  ```
- To run development server:
  ```bash
  cmd /c npx vite --port 5173
  ```
- Ensure any added libraries match dependencies installed in `package.json` (`lucide-react`, `recharts`, `maplibre-gl`, `react-router-dom`, `date-fns`).
