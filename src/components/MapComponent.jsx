import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { Link } from 'react-router-dom';
import { getCities } from '../api/cities';

/**
 * Available MapLibre basemap sources.
 *
 * Defaults to high-resolution ESRI World Physical Map:
 * - Hypsometric elevation tints (Himalayas, Deccan Plateau, Western & Eastern Ghats, Indo-Gangetic Plain)
 * - Shaded relief showing mountain ridges, river basins, and continental shelf bathymetry
 * - Requires ZERO API keys / zero accounts.
 *
 * If VITE_MAPTILER_KEY is defined in .env, custom vector styles are also accessible.
 */
export const BASEMAPS = {
  physical: {
    id: 'physical',
    label: 'Physical Relief',
    icon: 'terrain',
    description: 'Hypsometric elevation & shaded relief of Indian subcontinent',
    getStyle: () => ({
      version: 8,
      sources: {
        'esri-physical': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          maxzoom: 8,
          attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
        },
      },
      layers: [
        {
          id: 'esri-physical-layer',
          type: 'raster',
          source: 'esri-physical',
          minzoom: 0,
          maxzoom: 18,
          paint: {
            'raster-contrast': 0.15,
            'raster-saturation': 0.1,
          },
        },
      ],
    }),
  },
  topo: {
    id: 'topo',
    label: 'Topographic',
    icon: 'landscape',
    description: 'Topographic contours, rivers, and elevation details',
    getStyle: () => ({
      version: 8,
      sources: {
        'esri-topo': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          maxzoom: 18,
          attribution: 'Tiles &copy; Esri, DeLorme, NAVTEQ',
        },
      },
      layers: [
        {
          id: 'esri-topo-layer',
          type: 'raster',
          source: 'esri-topo',
          minzoom: 0,
          maxzoom: 18,
        },
      ],
    }),
  },
  satellite: {
    id: 'satellite',
    label: 'Satellite',
    icon: 'satellite_alt',
    description: 'High-resolution true color orbital observation',
    getStyle: () => ({
      version: 8,
      sources: {
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          maxzoom: 18,
          attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics',
        },
      },
      layers: [
        {
          id: 'esri-satellite-layer',
          type: 'raster',
          source: 'esri-satellite',
          minzoom: 0,
          maxzoom: 18,
        },
      ],
    }),
  },
  dark: {
    id: 'dark',
    label: 'Dark Telemetry',
    icon: 'dark_mode',
    description: 'Monochrome tactical night mode mesh',
    getStyle: () => ({
      version: 8,
      sources: {
        'carto-dark': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
          ],
          tileSize: 256,
          maxzoom: 18,
          attribution: '&copy; CartoDB, &copy; OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'carto-dark-layer',
          type: 'raster',
          source: 'carto-dark',
          minzoom: 0,
          maxzoom: 18,
        },
      ],
    }),
  },
};

// Check for optional MapTiler API Key in environment
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;
if (MAPTILER_KEY) {
  BASEMAPS.maptilerTopo = {
    id: 'maptilerTopo',
    label: 'MapTiler Topo',
    icon: 'map',
    description: 'Vector-rendered 3D topographic relief with custom contours',
    getStyle: () => `https://api.maptiler.com/maps/topo-v2/style.json?key=${MAPTILER_KEY}`,
  };
}

/**
 * MapComponent
 *
 * Supports two display variants:
 * - variant="dashboard": Full-featured meteorological workstation map with layer switcher & HUD
 * - variant="landing": Exact aspect-[4/5] card with radar scanline & compact telemetry beacons
 */
export default function MapComponent({
  variant = 'dashboard',
  selectedCity,
  onCityClick,
  basemapId = 'physical',
  onBasemapChange,
  layerType = 'default',
  choroplethData = null,
  cities = getCities(),
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [currentBasemap, setCurrentBasemap] = useState(basemapId);
  const [currentOverlay, setCurrentOverlay] = useState(layerType);
  const [cursorCoords, setCursorCoords] = useState({ lat: '22.80', lng: '79.20' });

  const isLanding = variant === 'landing';

  // Keep local basemap in sync if prop changes
  useEffect(() => {
    if (basemapId && BASEMAPS[basemapId]) {
      setCurrentBasemap(basemapId);
    }
  }, [basemapId]);

  // Keep local overlay in sync if prop changes
  useEffect(() => {
    setCurrentOverlay(layerType);
  }, [layerType]);

  // Helper to attach India boundary and vector overlays to current style
  const attachOverlays = (map, activeBasemapKey) => {
    if (!map.isStyleLoaded()) return;

    // Load India GeoJSON boundary from /public/india.geojson
    if (!map.getSource('india-boundary')) {
      map.addSource('india-boundary', {
        type: 'geojson',
        data: '/india.geojson',
      });
    }

    // Semi-transparent base fill (or thermal/rainfall choropleth)
    if (!map.getLayer('india-land-fill')) {
      map.addLayer({
        id: 'india-land-fill',
        type: 'fill',
        source: 'india-boundary',
        paint: {
          'fill-color': activeBasemapKey === 'dark' ? '#1f3d32' : '#38bdf8',
          'fill-opacity': activeBasemapKey === 'dark' ? 0.35 : 0.04,
          'fill-antialias': true,
        },
      });
    }

    // Crisp national boundary line
    if (!map.getLayer('india-outline')) {
      map.addLayer({
        id: 'india-outline',
        type: 'line',
        source: 'india-boundary',
        paint: {
          'line-color':
            activeBasemapKey === 'dark'
              ? '#4edea3'
              : activeBasemapKey === 'satellite'
              ? '#38bdf8'
              : '#0284c7',
          'line-width': isLanding ? 1.5 : 2,
          'line-opacity': 0.85,
        },
      });
    }

    // Apply data-driven meteorological layer styling if active
    applyMeteorologicalLayer(map, layerType, choroplethData);
  };

  // Initialize MapLibre GL map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Subcontinental bounding box [SW, NE]
    const indiaBounds = [
      [58.0, 4.0], // Southwest [lng, lat]
      [102.0, 39.0], // Northeast [lng, lat]
    ];

    const selectedBasemap = BASEMAPS[currentBasemap] || BASEMAPS.physical;
    const initialStyle = selectedBasemap.getStyle();

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: isLanding ? [78.96, 22.2] : [79.2, 22.8],
      zoom: isLanding ? 3.7 : 4.4,
      minZoom: isLanding ? 3.2 : 3.5,
      maxZoom: isLanding ? 6.5 : 8.5,
      maxBounds: indiaBounds,
      attributionControl: false,
      scrollZoom: !isLanding,
    });

    mapRef.current = map;

    // Style load event: attach India boundary and re-draw markers
    map.on('style.load', () => {
      attachOverlays(map, currentBasemap);
    });

    // Cursor position HUD tracking
    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: e.lngLat.lat.toFixed(2),
        lng: e.lngLat.lng.toFixed(2),
      });
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
    };
  }, []);

  // Switch basemap style when currentBasemap changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const basemap = BASEMAPS[currentBasemap] || BASEMAPS.physical;
    const newStyle = basemap.getStyle();

    map.setStyle(newStyle);

    // Re-attach vector overlays once the new style finishes loading
    map.once('style.load', () => {
      attachOverlays(map, currentBasemap);
      renderMarkers(map, cities, selectedCity, onCityClick, isLanding);
    });
  }, [currentBasemap]);

  // Update meteorological layer expression when layerType or choroplethData changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    applyMeteorologicalLayer(map, layerType, choroplethData);
  }, [layerType, choroplethData]);

  // Sync DOM Markers for cities
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    renderMarkers(map, cities, selectedCity, onCityClick, isLanding);
  }, [cities, selectedCity, onCityClick, isLanding]);

  // Handler for basemap change button
  const handleBasemapSelect = (key) => {
    setCurrentBasemap(key);
    if (onBasemapChange) {
      onBasemapChange(key);
    }
  };

  // Helper to render MapLibre DOM markers
  const renderMarkers = (map, cityList, currentSelected, clickHandler, landingMode) => {
    // Clear previous markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    cityList.forEach((city) => {
      const isSelected = currentSelected?.id === city.id;
      const el = document.createElement('div');

      if (landingMode) {
        // Compact elegant radar beacon for landing page card
        el.className = 'group cursor-pointer transition-transform duration-200 hover:scale-125 z-20';
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-4 h-4 rounded-full opacity-60 animate-ping" style="background-color: ${city.alertColor}"></span>
            <span class="relative w-2 h-2 rounded-full border border-black shadow-md" style="background-color: ${city.alertColor}"></span>
            <span class="absolute left-3 top-[-6px] hidden group-hover:flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white whitespace-nowrap border border-white/20 z-30">
              ${city.name} ${city.temp}°
            </span>
          </div>
        `;
      } else {
        // Full interactive telemetry pill for dashboard workstation
        el.className = `group cursor-pointer transition-all duration-200 ${
          isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-105'
        }`;

        el.innerHTML = `
          <div class="relative flex items-center space-x-1.5 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xl transition-all ${
            isSelected
              ? 'bg-[#181818] border-2 border-white'
              : 'bg-[#111111]/90 border border-[#353534] hover:border-white'
          }">
            <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${city.alertColor}; ${
              city.alertTier === 'Red'
                ? 'animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;'
                : ''
            }"></span>
            <span class="font-mono text-xs font-semibold text-white">${city.name}</span>
            <span class="font-mono text-[11px] text-[#a3a3a3]">${city.temp}°</span>
            <span class="material-symbols-outlined text-[13px] ${
              isSelected ? 'text-white' : 'text-[#8e9192]'
            }">${city.icon}</span>
          </div>
          <div class="w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${
            isSelected ? 'bg-white ring-2 ring-white/50' : 'bg-[#8e9192]'
          }"></div>
        `;
      }

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (clickHandler) {
          clickHandler(city);
        }
      });

      const marker = new maplibregl.Marker({ element: el, anchor: landingMode ? 'center' : 'bottom' })
        .setLngLat([city.lon, city.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  // --- RENDER VARIANT: LANDING PAGE ---
  if (isLanding) {
    return (
      <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-2xl bg-[#111111] border border-[#262626] flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Subtle Diagonal Radar Scanline Effect */}
        <div className="absolute inset-0 radar-sweep pointer-events-none opacity-20 z-10" />

        {/* Card Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-[#262626]/60 bg-[#111111]/85 backdrop-blur-md px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">radar</span>
            <span className="font-mono text-[0.6875rem] text-white uppercase tracking-wider font-semibold">
              Subcontinental Mesh [IN-NWP]
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            <span className="font-mono text-[0.6875rem] text-[#8e9192]">EPS VERONA v4.2</span>
          </div>
        </div>

        {/* MapLibre Canvas Container */}
        <div className="relative flex-1 w-full min-h-0 bg-[#0c141d]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Graticule Legend Badge */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none px-2.5 py-1 rounded-lg bg-[#0e0e0e]/85 backdrop-blur-md border border-[#262626] font-mono text-[10px] text-[#a3a3a3]">
            <span className="text-white font-medium">Physical Relief</span>
            <span className="mx-1 text-[#444748]">|</span>
            <span className="text-[#4edea3]">MapLibre GL</span>
          </div>
        </div>

        {/* Card Footer Status Bar */}
        <div className="relative z-20 border-t border-[#262626]/60 bg-[#111111]/85 backdrop-blur-md px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[0.6875rem] text-[#8e9192]">
            <span className="text-white font-medium">842 AWS NODES</span>
            <span>•</span>
            <span className="text-[#a3a3a3]">08°N–37°N</span>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-[#4edea3] hover:text-white transition-colors group"
          >
            <span>OPEN WORKSTATION</span>
            <span className="material-symbols-outlined text-[13px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // --- RENDER VARIANT: DASHBOARD WORKSTATION ---
  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden rounded-2xl bg-[#0e0e0e] border border-[#262626]/70 shadow-2xl flex flex-col">
      {/* MapLibre GL DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-1" />

      {/* Top Left: Geospatial HUD Telemetry Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0e0e0e]/90 backdrop-blur-md border border-[#262626] font-mono text-[11px] text-[#a3a3a3] shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
        <span className="text-white font-medium">MapLibre GL</span>
        <span className="text-[#444748]">|</span>
        <span className="text-[#4edea3]">{BASEMAPS[currentBasemap]?.label || 'Physical Relief'}</span>
        <span className="text-[#444748]">|</span>
        <span className="text-[#e5e2e1]">{cursorCoords.lat}°N, {cursorCoords.lng}°E</span>
      </div>

      {/* Top Right: Basemap Selector Pills */}
      <div className="absolute top-4 right-4 z-20 flex items-center p-1 rounded-full bg-[#0e0e0e]/90 backdrop-blur-md border border-[#262626] shadow-xl space-x-1">
        {Object.values(BASEMAPS).map((b) => (
          <button
            key={b.id}
            onClick={() => handleBasemapSelect(b.id)}
            title={b.description}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full font-sans text-[11px] transition-all cursor-pointer ${
              currentBasemap === b.id
                ? 'bg-white text-[#0a0a0a] font-semibold shadow-sm'
                : 'text-[#a3a3a3] hover:text-white hover:bg-[#201f1f] font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">{b.icon}</span>
            <span>{b.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom Left: Meteorological Overlay Selector */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center p-1 rounded-full bg-[#0e0e0e]/90 backdrop-blur-md border border-[#262626] shadow-xl space-x-1">
        <span className="font-mono text-[10px] text-[#8e9192] px-2 uppercase tracking-wider">Atmospheric:</span>
        {[
          { id: 'default', label: 'Relief Only', icon: 'layers_clear' },
          { id: 'temperature', label: 'Thermal', icon: 'thermostat' },
          { id: 'rainfall', label: 'Precipitation', icon: 'rainy' },
          { id: 'heatmap', label: 'Heat Index', icon: 'whatshot' },
        ].map((ov) => (
          <button
            key={ov.id}
            onClick={() => {
              setCurrentOverlay(ov.id);
              const map = mapRef.current;
              if (map && map.isStyleLoaded()) {
                applyMeteorologicalLayer(map, ov.id, choroplethData);
              }
            }}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-sans text-[11px] transition-all cursor-pointer ${
              currentOverlay === ov.id
                ? 'bg-white text-[#0a0a0a] font-semibold shadow-sm'
                : 'text-[#a3a3a3] hover:text-white hover:bg-[#201f1f] font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">{ov.icon}</span>
            <span>{ov.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Updates data-driven paint properties for meteorological overlays
 */
function applyMeteorologicalLayer(map, layerType, choroplethData) {
  if (!map.getLayer('india-land-fill')) return;

  if (layerType === 'temperature') {
    map.setPaintProperty('india-land-fill', 'fill-color', [
      'interpolate',
      ['linear'],
      ['zoom'],
      3, '#f97316',
      6, '#ef4444',
    ]);
    map.setPaintProperty('india-land-fill', 'fill-opacity', 0.28);
  } else if (layerType === 'rainfall') {
    map.setPaintProperty('india-land-fill', 'fill-color', '#0284c7');
    map.setPaintProperty('india-land-fill', 'fill-opacity', 0.32);
  } else if (layerType === 'heatmap') {
    map.setPaintProperty('india-land-fill', 'fill-color', '#9333ea');
    map.setPaintProperty('india-land-fill', 'fill-opacity', 0.3);
  } else {
    // Default transparent fill so physical topography shines through
    map.setPaintProperty('india-land-fill', 'fill-opacity', 0.04);
  }
}
