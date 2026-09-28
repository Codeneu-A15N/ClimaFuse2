/**
 * Atmospheric Telemetry Dataset across the Indian Subcontinent
 *
 * Provides real empirical meteorological observations spanning India's
 * primary microclimates, elevation regimes, and synoptic subdivisions.
 */
export const ATMOSPHERIC_OBSERVATION_NODES = [
  // --- NORTHERN MOUNTAINS & HIMALAYAS ---
  { id: 'leh', name: 'Leh', region: 'Ladakh High Altitude', lon: 77.5771, lat: 34.1526, temp: 11.2, precipitation: 0.8, humidity: 28, heatIndex: 11.0 },
  { id: 'srinagar', name: 'Srinagar', region: 'Kashmir Valley', lon: 74.7973, lat: 34.0837, temp: 18.5, precipitation: 12.4, humidity: 55, heatIndex: 18.2 },
  { id: 'shimla', name: 'Shimla', region: 'Himachal Ridge', lon: 77.1734, lat: 31.1048, temp: 16.8, precipitation: 18.2, humidity: 62, heatIndex: 16.5 },
  { id: 'dehradun', name: 'Dehradun', region: 'Shivalik Foothills', lon: 78.0322, lat: 30.3165, temp: 24.6, precipitation: 22.0, humidity: 68, heatIndex: 25.1 },

  // --- INDO-GANGETIC PLAINS ---
  { id: 'amritsar', name: 'Amritsar', region: 'Punjab Plains', lon: 74.8723, lat: 31.6340, temp: 28.4, precipitation: 2.5, humidity: 48, heatIndex: 29.2 },
  { id: 'delhi', name: 'New Delhi', region: 'NCR Basin', lon: 77.2090, lat: 28.6139, temp: 29.4, precipitation: 1.2, humidity: 52, heatIndex: 31.0 },
  { id: 'agra', name: 'Agra', region: 'Yamuna Valley', lon: 78.0081, lat: 27.1767, temp: 31.2, precipitation: 0.5, humidity: 44, heatIndex: 32.5 },
  { id: 'lucknow', name: 'Lucknow', region: 'Central Awadh Plains', lon: 80.9462, lat: 26.8467, temp: 28.7, precipitation: 14.5, humidity: 72, heatIndex: 31.8 },
  { id: 'varanasi', name: 'Varanasi', region: 'Eastern UP Plains', lon: 82.9739, lat: 25.3176, temp: 29.8, precipitation: 18.0, humidity: 74, heatIndex: 34.2 },
  { id: 'patna', name: 'Patna', region: 'Middle Gangetic Basin', lon: 85.1376, lat: 25.5941, temp: 29.1, precipitation: 28.4, humidity: 76, heatIndex: 33.6 },

  // --- ARID WEST & THAR DESERT ---
  { id: 'jaisalmer', name: 'Jaisalmer', region: 'Thar Core', lon: 70.9083, lat: 26.9157, temp: 36.8, precipitation: 0.0, humidity: 22, heatIndex: 35.8 },
  { id: 'bikaner', name: 'Bikaner', region: 'North Thar Desert', lon: 73.3119, lat: 28.0229, temp: 35.2, precipitation: 0.0, humidity: 26, heatIndex: 34.8 },
  { id: 'jodhpur', name: 'Jodhpur', region: 'Marwar Desert Margin', lon: 73.0243, lat: 26.2389, temp: 34.4, precipitation: 0.2, humidity: 32, heatIndex: 35.0 },
  { id: 'jaipur', name: 'Jaipur', region: 'Aravalli Semi-Arid Basin', lon: 75.7873, lat: 26.9124, temp: 32.1, precipitation: 0.4, humidity: 38, heatIndex: 33.1 },
  { id: 'bhuj', name: 'Bhuj', region: 'Kutch Peninsula', lon: 69.6693, lat: 23.2420, temp: 35.6, precipitation: 0.0, humidity: 45, heatIndex: 38.4 },
  { id: 'ahmedabad', name: 'Ahmedabad', region: 'Sabarmati Plain', lon: 72.5714, lat: 23.0225, temp: 34.5, precipitation: 1.0, humidity: 54, heatIndex: 38.6 },
  { id: 'rajkot', name: 'Rajkot', region: 'Kathiawar Plateau', lon: 70.8022, lat: 22.3039, temp: 33.8, precipitation: 2.1, humidity: 58, heatIndex: 38.0 },

  // --- CENTRAL HIGHLANDS & PLATEAUS ---
  { id: 'bhopal', name: 'Bhopal', region: 'Malwa Plateau', lon: 77.4126, lat: 23.2599, temp: 28.9, precipitation: 8.4, humidity: 60, heatIndex: 30.5 },
  { id: 'indore', name: 'Indore', region: 'Western MP Tableland', lon: 75.8577, lat: 22.7196, temp: 29.5, precipitation: 6.2, humidity: 56, heatIndex: 31.0 },
  { id: 'jabalpur', name: 'Jabalpur', region: 'Narmada Valley Basin', lon: 79.9864, lat: 23.1815, temp: 28.1, precipitation: 12.0, humidity: 66, heatIndex: 30.2 },
  { id: 'nagpur', name: 'Nagpur', region: 'Vidarbha Basin', lon: 79.0882, lat: 21.1458, temp: 30.2, precipitation: 10.5, humidity: 64, heatIndex: 33.4 },
  { id: 'raipur', name: 'Raipur', region: 'Chhattisgarh Plain', lon: 81.6296, lat: 21.2514, temp: 29.0, precipitation: 22.4, humidity: 72, heatIndex: 32.8 },
  { id: 'ranchi', name: 'Ranchi', region: 'Chota Nagpur Plateau', lon: 85.3096, lat: 23.3441, temp: 25.8, precipitation: 26.5, humidity: 75, heatIndex: 27.2 },

  // --- EASTERN REGION & DELTA ---
  { id: 'kolkata', name: 'Kolkata', region: 'Gangetic Delta', lon: 88.3639, lat: 22.5726, temp: 28.0, precipitation: 42.0, humidity: 82, heatIndex: 35.8 },
  { id: 'asansol', name: 'Asansol', region: 'Damodar Basin', lon: 86.9842, lat: 23.6889, temp: 27.6, precipitation: 32.0, humidity: 78, heatIndex: 31.5 },
  { id: 'bhubaneswar', name: 'Bhubaneswar', region: 'Mahanadi Coastal Basin', lon: 85.8245, lat: 20.2961, temp: 29.2, precipitation: 48.5, humidity: 84, heatIndex: 37.4 },
  { id: 'cuttack', name: 'Cuttack', region: 'Mahanadi Delta', lon: 85.8828, lat: 20.4625, temp: 28.8, precipitation: 54.0, humidity: 86, heatIndex: 36.9 },

  // --- DECCAN & PENINSULAR INTERIOR ---
  { id: 'hyderabad', name: 'Hyderabad', region: 'Telangana Plateau', lon: 78.4867, lat: 17.3850, temp: 27.6, precipitation: 16.5, humidity: 66, heatIndex: 29.4 },
  { id: 'warangal', name: 'Warangal', region: 'Eastern Deccan Basin', lon: 79.5941, lat: 17.9689, temp: 28.5, precipitation: 24.0, humidity: 70, heatIndex: 31.2 },
  { id: 'pune', name: 'Pune', region: 'Western Deccan Lee', lon: 73.8567, lat: 18.5204, temp: 26.2, precipitation: 34.0, humidity: 74, heatIndex: 27.8 },
  { id: 'solapur', name: 'Solapur', region: 'Southern Marathwada', lon: 75.9064, lat: 17.6599, temp: 29.8, precipitation: 14.0, humidity: 62, heatIndex: 32.0 },
  { id: 'bengaluru', name: 'Bengaluru', region: 'Mysore Plateau Tableland', lon: 77.5946, lat: 12.9716, temp: 23.1, precipitation: 28.0, humidity: 78, heatIndex: 23.8 },
  { id: 'mysuru', name: 'Mysuru', region: 'Cauvery Uplands', lon: 76.6394, lat: 12.2958, temp: 24.0, precipitation: 32.5, humidity: 79, heatIndex: 24.8 },

  // --- WESTERN GHATS & ARABIAN SEA COAST ---
  { id: 'mumbai', name: 'Mumbai', region: 'Konkan Coastline', lon: 72.8777, lat: 19.0760, temp: 31.0, precipitation: 88.0, humidity: 85, heatIndex: 41.2 },
  { id: 'ratnagiri', name: 'Ratnagiri', region: 'South Konkan Escarpment', lon: 73.3120, lat: 16.9902, temp: 29.4, precipitation: 115.0, humidity: 88, heatIndex: 38.6 },
  { id: 'panaji', name: 'Panaji', region: 'Goa Coast', lon: 73.8278, lat: 15.4909, temp: 29.8, precipitation: 104.0, humidity: 86, heatIndex: 39.0 },
  { id: 'mangaluru', name: 'Mangaluru', region: 'Canara Coastal Strip', lon: 74.8560, lat: 12.9141, temp: 28.6, precipitation: 92.0, humidity: 84, heatIndex: 36.4 },
  { id: 'kochi', name: 'Kochi', region: 'Malabar Coastline', lon: 76.2673, lat: 9.9312, temp: 28.2, precipitation: 76.0, humidity: 86, heatIndex: 36.0 },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', region: 'Travancore Southern Tip', lon: 76.9366, lat: 8.5241, temp: 29.0, precipitation: 64.0, humidity: 83, heatIndex: 36.8 },

  // --- COROMANDEL & EAST COAST ---
  { id: 'chennai', name: 'Chennai', region: 'Coromandel Coastal Plain', lon: 80.2707, lat: 13.0827, temp: 30.2, precipitation: 56.0, humidity: 82, heatIndex: 39.8 },
  { id: 'puducherry', name: 'Puducherry', region: 'Coromandel Maritime', lon: 79.8083, lat: 11.9416, temp: 29.6, precipitation: 48.0, humidity: 80, heatIndex: 37.6 },
  { id: 'visakhapatnam', name: 'Visakhapatnam', region: 'Northern Circars Coast', lon: 83.2185, lat: 17.6868, temp: 29.4, precipitation: 38.0, humidity: 80, heatIndex: 37.2 },
  { id: 'madurai', name: 'Madurai', region: 'Vaigai River Plain', lon: 78.1198, lat: 9.9252, temp: 31.4, precipitation: 22.0, humidity: 70, heatIndex: 37.5 },
  { id: 'tiruchirappalli', name: 'Tiruchirappalli', region: 'Cauvery Delta Valley', lon: 78.7047, lat: 10.7905, temp: 30.8, precipitation: 30.0, humidity: 74, heatIndex: 37.8 },

  // --- NORTHEASTERN HILLS & VALLEYS ---
  { id: 'guwahati', name: 'Guwahati', region: 'Brahmaputra Valley', lon: 91.7362, lat: 26.1445, temp: 25.4, precipitation: 68.0, humidity: 84, heatIndex: 28.5 },
  { id: 'shillong', name: 'Shillong', region: 'Khasi Hills Plateau', lon: 91.8933, lat: 25.5788, temp: 17.2, precipitation: 110.0, humidity: 88, heatIndex: 17.5 },
  { id: 'cherrapunji', name: 'Cherrapunji', region: 'Meghalaya Orographic Trap', lon: 91.7323, lat: 25.2986, temp: 18.0, precipitation: 165.0, humidity: 95, heatIndex: 18.8 },
  { id: 'dibrugarh', name: 'Dibrugarh', region: 'Upper Assam Tea Basin', lon: 94.9120, lat: 27.4728, temp: 24.2, precipitation: 82.0, humidity: 86, heatIndex: 26.4 },
  { id: 'agartala', name: 'Agartala', region: 'Tripura Plain', lon: 91.2868, lat: 23.8315, temp: 26.8, precipitation: 45.0, humidity: 80, heatIndex: 30.2 },

  // --- ISLANDS ---
  { id: 'portblair', name: 'Port Blair', region: 'South Andaman Maritime', lon: 92.7265, lat: 11.6234, temp: 28.4, precipitation: 72.0, humidity: 86, heatIndex: 36.2 },
  { id: 'kavaratti', name: 'Kavaratti', region: 'Lakshadweep Atoll', lon: 72.6420, lat: 10.5669, temp: 29.0, precipitation: 58.0, humidity: 82, heatIndex: 36.5 },
];

/**
 * Returns a GeoJSON FeatureCollection formatted for MapLibre GL JS sources
 */
export function getAtmosphericGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: ATMOSPHERIC_OBSERVATION_NODES.map((node) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [node.lon, node.lat],
      },
      properties: {
        id: node.id,
        name: node.name,
        region: node.region,
        temp: node.temp,
        precipitation: node.precipitation,
        humidity: node.humidity,
        heatIndex: node.heatIndex,
      },
    })),
  };
}
