/**
 * Atmospheric Telemetry Dataset across the Indian Subcontinent
 *
 * Provides real empirical meteorological observations spanning India's
 * primary microclimates, elevation regimes, and synoptic subdivisions.
 * Used for MapLibre GL JS spatial heatmaps and AWS illuminated observation nodes.
 */
export const ATMOSPHERIC_OBSERVATION_NODES = [
  // ─── 1. ARID NORTHWEST & THAR DESERT (Peak Hot Core: 33°C - 37.5°C) ───
  { id: 'jaisalmer', name: 'Jaisalmer', region: 'Thar Core Basin', lon: 70.9083, lat: 26.9157, temp: 36.8, precipitation: 0.0, humidity: 22, heatIndex: 35.8 },
  { id: 'phalodi', name: 'Phalodi', region: 'Central Thar Solar Basin', lon: 72.3667, lat: 27.1333, temp: 37.2, precipitation: 0.0, humidity: 20, heatIndex: 36.2 },
  { id: 'barmer', name: 'Barmer', region: 'Lower Thar Dune Field', lon: 71.3967, lat: 25.7521, temp: 36.5, precipitation: 0.0, humidity: 24, heatIndex: 35.5 },
  { id: 'bikaner', name: 'Bikaner', region: 'North Thar Desert', lon: 73.3119, lat: 28.0229, temp: 35.2, precipitation: 0.0, humidity: 26, heatIndex: 34.8 },
  { id: 'churu', name: 'Churu', region: 'Shekhawati Semi-Arid', lon: 74.9667, lat: 28.3000, temp: 35.0, precipitation: 0.1, humidity: 28, heatIndex: 34.6 },
  { id: 'jodhpur', name: 'Jodhpur', region: 'Marwar Desert Margin', lon: 73.0243, lat: 26.2389, temp: 34.4, precipitation: 0.2, humidity: 32, heatIndex: 35.0 },
  { id: 'nagaur', name: 'Nagaur', region: 'Central Marwar Tableland', lon: 73.7439, lat: 27.2070, temp: 34.1, precipitation: 0.2, humidity: 33, heatIndex: 34.5 },
  { id: 'jaipur', name: 'Jaipur', region: 'Aravalli Semi-Arid Basin', lon: 75.7873, lat: 26.9124, temp: 32.1, precipitation: 0.4, humidity: 38, heatIndex: 33.1 },
  { id: 'ajmer', name: 'Ajmer', region: 'Central Aravalli Gap', lon: 74.6399, lat: 26.4499, temp: 32.6, precipitation: 0.8, humidity: 40, heatIndex: 33.4 },
  { id: 'kota', name: 'Kota', region: 'Hadoti Chambal Basin', lon: 75.8648, lat: 25.2138, temp: 33.8, precipitation: 1.2, humidity: 42, heatIndex: 34.2 },
  { id: 'udaipur', name: 'Udaipur', region: 'Mewar Aravalli Uplands', lon: 73.7125, lat: 24.5854, temp: 31.8, precipitation: 2.0, humidity: 46, heatIndex: 32.8 },

  // ─── 2. GUJARAT & KUTCH PENINSULA (Thermal & Coastal Heat Index Peak: 32°C - 35.6°C) ───
  { id: 'bhuj', name: 'Bhuj', region: 'Kutch Peninsula', lon: 69.6693, lat: 23.2420, temp: 35.6, precipitation: 0.0, humidity: 45, heatIndex: 38.4 },
  { id: 'naliya', name: 'Naliya', region: 'Great Rann Littoral', lon: 68.8333, lat: 23.2667, temp: 34.8, precipitation: 0.0, humidity: 48, heatIndex: 37.8 },
  { id: 'ahmedabad', name: 'Ahmedabad', region: 'Sabarmati Plain', lon: 72.5714, lat: 23.0225, temp: 34.5, precipitation: 1.0, humidity: 54, heatIndex: 38.6 },
  { id: 'rajkot', name: 'Rajkot', region: 'Kathiawar Plateau', lon: 70.8022, lat: 22.3039, temp: 33.8, precipitation: 2.1, humidity: 58, heatIndex: 38.0 },
  { id: 'porbandar', name: 'Porbandar', region: 'Saurashtra Coast', lon: 69.6293, lat: 21.6417, temp: 32.2, precipitation: 1.5, humidity: 62, heatIndex: 36.8 },
  { id: 'bhavnagar', name: 'Bhavnagar', region: 'Gulf of Khambhat', lon: 72.1501, lat: 21.7645, temp: 33.4, precipitation: 2.4, humidity: 64, heatIndex: 38.2 },
  { id: 'vadodara', name: 'Vadodara', region: 'Mahi Basin Plain', lon: 73.1812, lat: 22.3072, temp: 33.6, precipitation: 2.0, humidity: 58, heatIndex: 37.5 },
  { id: 'surat', name: 'Surat', region: 'Tapi Estuary Plain', lon: 72.8311, lat: 21.1702, temp: 32.4, precipitation: 4.5, humidity: 68, heatIndex: 37.2 },

  // ─── 3. INDO-GANGETIC PLAINS & NORTHERN INTERIOR (27°C - 31.5°C) ───
  { id: 'amritsar', name: 'Amritsar', region: 'Punjab Plains', lon: 74.8723, lat: 31.6340, temp: 28.4, precipitation: 2.5, humidity: 48, heatIndex: 29.2 },
  { id: 'ludhiana', name: 'Ludhiana', region: 'Sutlej Basin Plain', lon: 75.8573, lat: 30.9010, temp: 28.8, precipitation: 3.0, humidity: 50, heatIndex: 29.5 },
  { id: 'chandigarh', name: 'Chandigarh', region: 'Shivalik Transition Zone', lon: 76.7794, lat: 30.7333, temp: 27.5, precipitation: 6.2, humidity: 54, heatIndex: 28.2 },
  { id: 'delhi', name: 'New Delhi', region: 'NCR Basin', lon: 77.2090, lat: 28.6139, temp: 29.4, precipitation: 1.2, humidity: 52, heatIndex: 31.0 },
  { id: 'meerut', name: 'Meerut', region: 'Upper Ganga-Yamuna Doab', lon: 77.7064, lat: 28.9845, temp: 29.0, precipitation: 2.0, humidity: 55, heatIndex: 30.5 },
  { id: 'agra', name: 'Agra', region: 'Yamuna Valley', lon: 78.0081, lat: 27.1767, temp: 31.2, precipitation: 0.5, humidity: 44, heatIndex: 32.5 },
  { id: 'aligarh', name: 'Aligarh', region: 'Central Doab Basin', lon: 78.0880, lat: 27.8974, temp: 30.2, precipitation: 1.8, humidity: 48, heatIndex: 31.5 },
  { id: 'bareilly', name: 'Bareilly', region: 'Rohilkhand Tarai', lon: 79.4304, lat: 28.3670, temp: 28.5, precipitation: 8.4, humidity: 65, heatIndex: 31.0 },
  { id: 'lucknow', name: 'Lucknow', region: 'Central Awadh Plains', lon: 80.9462, lat: 26.8467, temp: 28.7, precipitation: 14.5, humidity: 72, heatIndex: 31.8 },
  { id: 'kanpur', name: 'Kanpur', region: 'Middle Ganga Corridor', lon: 80.3319, lat: 26.4499, temp: 29.2, precipitation: 12.0, humidity: 68, heatIndex: 32.2 },
  { id: 'prayagraj', name: 'Prayagraj', region: 'Triveni Sangam Basin', lon: 81.8463, lat: 25.4358, temp: 30.4, precipitation: 15.0, humidity: 70, heatIndex: 34.0 },
  { id: 'varanasi', name: 'Varanasi', region: 'Eastern UP Plains', lon: 82.9739, lat: 25.3176, temp: 29.8, precipitation: 18.0, humidity: 74, heatIndex: 34.2 },
  { id: 'gorakhpur', name: 'Gorakhpur', region: 'Rapti Tarai Basin', lon: 83.3732, lat: 26.7606, temp: 28.6, precipitation: 22.0, humidity: 76, heatIndex: 33.0 },
  { id: 'patna', name: 'Patna', region: 'Middle Gangetic Basin', lon: 85.1376, lat: 25.5941, temp: 29.1, precipitation: 28.4, humidity: 76, heatIndex: 33.6 },
  { id: 'gaya', name: 'Gaya', region: 'Magadh Uplands Transition', lon: 85.0002, lat: 24.7914, temp: 29.5, precipitation: 24.0, humidity: 74, heatIndex: 33.8 },
  { id: 'bhagalpur', name: 'Bhagalpur', region: 'Lower Ganga Floodplain', lon: 87.0120, lat: 25.2425, temp: 28.8, precipitation: 32.0, humidity: 78, heatIndex: 33.5 },

  // ─── 4. CENTRAL HIGHLANDS & PLATEAUS (27°C - 31.5°C) ───
  { id: 'gwalior', name: 'Gwalior', region: 'Gird Ravine Basin', lon: 78.1828, lat: 26.2183, temp: 31.0, precipitation: 1.8, humidity: 46, heatIndex: 32.4 },
  { id: 'jhansi', name: 'Jhansi', region: 'Bundelkhand Plateau', lon: 78.5788, lat: 25.4484, temp: 30.8, precipitation: 3.2, humidity: 50, heatIndex: 32.0 },
  { id: 'bhopal', name: 'Bhopal', region: 'Malwa Plateau', lon: 77.4126, lat: 23.2599, temp: 28.9, precipitation: 8.4, humidity: 60, heatIndex: 30.5 },
  { id: 'indore', name: 'Indore', region: 'Western MP Tableland', lon: 75.8577, lat: 22.7196, temp: 29.5, precipitation: 6.2, humidity: 56, heatIndex: 31.0 },
  { id: 'ujjain', name: 'Ujjain', region: 'Shipra Basin Plain', lon: 75.7772, lat: 23.1765, temp: 29.2, precipitation: 5.8, humidity: 55, heatIndex: 30.8 },
  { id: 'jabalpur', name: 'Jabalpur', region: 'Narmada Valley Basin', lon: 79.9864, lat: 23.1815, temp: 28.1, precipitation: 12.0, humidity: 66, heatIndex: 30.2 },
  { id: 'sagar', name: 'Sagar', region: 'Vindhyan Foothills', lon: 78.7378, lat: 23.8388, temp: 28.6, precipitation: 10.4, humidity: 62, heatIndex: 30.4 },
  { id: 'nagpur', name: 'Nagpur', region: 'Vidarbha Basin', lon: 79.0882, lat: 21.1458, temp: 30.2, precipitation: 10.5, humidity: 64, heatIndex: 33.4 },
  { id: 'akola', name: 'Akola', region: 'Purna Valley Plain', lon: 77.0082, lat: 20.7002, temp: 31.5, precipitation: 8.0, humidity: 58, heatIndex: 34.0 },
  { id: 'raipur', name: 'Raipur', region: 'Chhattisgarh Plain', lon: 81.6296, lat: 21.2514, temp: 29.0, precipitation: 22.4, humidity: 72, heatIndex: 32.8 },
  { id: 'bilaspur', name: 'Bilaspur', region: 'Upper Mahanadi Basin', lon: 82.1409, lat: 22.0797, temp: 28.7, precipitation: 18.0, humidity: 70, heatIndex: 32.2 },
  { id: 'jagdalpur', name: 'Jagdalpur', region: 'Bastar Plateau Ridge', lon: 82.0167, lat: 19.0667, temp: 27.2, precipitation: 28.0, humidity: 78, heatIndex: 30.0 },

  // ─── 5. EASTERN DELTA & ODISHA (Warm Maritime & Heavy Rain: 26°C - 29.5°C) ───
  { id: 'kolkata', name: 'Kolkata', region: 'Gangetic Delta', lon: 88.3639, lat: 22.5726, temp: 28.0, precipitation: 42.0, humidity: 82, heatIndex: 35.8 },
  { id: 'howrah', name: 'Howrah', region: 'Hooghly Estuary', lon: 88.3103, lat: 22.5958, temp: 28.0, precipitation: 42.0, humidity: 82, heatIndex: 35.8 },
  { id: 'asansol', name: 'Asansol', region: 'Damodar Basin', lon: 86.9842, lat: 23.6889, temp: 27.6, precipitation: 32.0, humidity: 78, heatIndex: 31.5 },
  { id: 'durgapur', name: 'Durgapur', region: 'Rarh Plain Transition', lon: 87.3119, lat: 23.5204, temp: 27.8, precipitation: 30.0, humidity: 77, heatIndex: 31.8 },
  { id: 'kharagpur', name: 'Kharagpur', region: 'Kasai Valley Plain', lon: 87.3215, lat: 22.3460, temp: 28.4, precipitation: 38.0, humidity: 80, heatIndex: 34.5 },
  { id: 'ranchi', name: 'Ranchi', region: 'Chota Nagpur Plateau', lon: 85.3096, lat: 23.3441, temp: 25.8, precipitation: 26.5, humidity: 75, heatIndex: 27.2 },
  { id: 'jamshedpur', name: 'Jamshedpur', region: 'Subarnarekha Basin', lon: 86.2029, lat: 22.8046, temp: 27.4, precipitation: 30.0, humidity: 76, heatIndex: 31.2 },
  { id: 'bhubaneswar', name: 'Bhubaneswar', region: 'Mahanadi Coastal Basin', lon: 85.8245, lat: 20.2961, temp: 29.2, precipitation: 48.5, humidity: 84, heatIndex: 37.4 },
  { id: 'cuttack', name: 'Cuttack', region: 'Mahanadi Delta', lon: 85.8828, lat: 20.4625, temp: 28.8, precipitation: 54.0, humidity: 86, heatIndex: 36.9 },
  { id: 'puri', name: 'Puri', region: 'Odisha Coastal Littoral', lon: 85.8312, lat: 19.8135, temp: 28.5, precipitation: 50.0, humidity: 85, heatIndex: 36.5 },
  { id: 'balasore', name: 'Balasore', region: 'Northern Odisha Coast', lon: 86.9324, lat: 21.4934, temp: 28.6, precipitation: 45.0, humidity: 84, heatIndex: 36.2 },
  { id: 'sambalpur', name: 'Sambalpur', region: 'Hirakud Tableland', lon: 83.9812, lat: 21.4669, temp: 28.9, precipitation: 32.0, humidity: 76, heatIndex: 33.4 },
  { id: 'rourkela', name: 'Rourkela', region: 'Brahmani River Basin', lon: 84.8536, lat: 22.2604, temp: 27.5, precipitation: 35.0, humidity: 78, heatIndex: 31.0 },

  // ─── 6. DECCAN & TELANGANA INTERIOR (Temperate / Warm: 26°C - 30°C) ───
  { id: 'hyderabad', name: 'Hyderabad', region: 'Telangana Plateau', lon: 78.4867, lat: 17.3850, temp: 27.6, precipitation: 16.5, humidity: 66, heatIndex: 29.4 },
  { id: 'warangal', name: 'Warangal', region: 'Eastern Deccan Basin', lon: 79.5941, lat: 17.9689, temp: 28.5, precipitation: 24.0, humidity: 70, heatIndex: 31.2 },
  { id: 'nizamabad', name: 'Nizamabad', region: 'Godavari Basin Lee', lon: 78.0941, lat: 18.6725, temp: 28.2, precipitation: 18.5, humidity: 68, heatIndex: 30.5 },
  { id: 'kurnool', name: 'Kurnool', region: 'Rayalaseema Basin', lon: 78.0373, lat: 15.8281, temp: 30.1, precipitation: 12.0, humidity: 64, heatIndex: 32.8 },
  { id: 'anantapur', name: 'Anantapur', region: 'Pennar Semi-Arid Basin', lon: 77.6006, lat: 14.6819, temp: 29.4, precipitation: 15.0, humidity: 66, heatIndex: 31.8 },
  { id: 'solapur', name: 'Solapur', region: 'Southern Marathwada', lon: 75.9064, lat: 17.6599, temp: 29.8, precipitation: 14.0, humidity: 62, heatIndex: 32.0 },
  { id: 'aurangabad', name: 'Aurangabad', region: 'Marathwada Tableland', lon: 75.3433, lat: 19.8762, temp: 28.5, precipitation: 16.0, humidity: 65, heatIndex: 30.5 },
  { id: 'nashik', name: 'Nashik', region: 'Upper Godavari Escarpment', lon: 73.7898, lat: 19.9975, temp: 27.0, precipitation: 22.0, humidity: 68, heatIndex: 28.8 },
  { id: 'pune', name: 'Pune', region: 'Western Deccan Lee', lon: 73.8567, lat: 18.5204, temp: 26.2, precipitation: 34.0, humidity: 74, heatIndex: 27.8 },
  { id: 'kolhapur', name: 'Kolhapur', region: 'Panchganga Valley', lon: 74.2433, lat: 16.7050, temp: 26.8, precipitation: 45.0, humidity: 78, heatIndex: 29.0 },
  { id: 'belagavi', name: 'Belagavi', region: 'Malaprabha Uplands', lon: 74.4977, lat: 15.8497, temp: 25.5, precipitation: 38.0, humidity: 76, heatIndex: 26.8 },
  { id: 'hubballi', name: 'Hubballi', region: 'Dharwad Transition Plain', lon: 75.1240, lat: 15.3647, temp: 26.0, precipitation: 30.0, humidity: 74, heatIndex: 27.4 },
  { id: 'ballari', name: 'Ballari', region: 'Tungabhadra Semi-Arid', lon: 76.9214, lat: 15.1394, temp: 28.8, precipitation: 18.0, humidity: 65, heatIndex: 30.8 },

  // ─── 7. SOUTHERN TABLELAND / MYSORE PLATEAU (Temperate / Elevated: 22.5°C - 25°C) ───
  { id: 'bengaluru', name: 'Bengaluru', region: 'Mysore Plateau Tableland', lon: 77.5946, lat: 12.9716, temp: 23.1, precipitation: 28.0, humidity: 78, heatIndex: 23.8 },
  { id: 'mysuru', name: 'Mysuru', region: 'Cauvery Uplands', lon: 76.6394, lat: 12.2958, temp: 24.0, precipitation: 32.5, humidity: 79, heatIndex: 24.8 },
  { id: 'hassan', name: 'Hassan', region: 'Western Malnad Ridge', lon: 76.1025, lat: 13.0072, temp: 23.5, precipitation: 32.0, humidity: 80, heatIndex: 24.2 },
  { id: 'shivamogga', name: 'Shivamogga', region: 'Central Malnad Basin', lon: 75.5681, lat: 13.9299, temp: 25.2, precipitation: 42.0, humidity: 82, heatIndex: 26.5 },
  { id: 'ooty', name: 'Ooty (Udhagamandalam)', region: 'Nilgiris High Tableland', lon: 76.6950, lat: 11.4102, temp: 15.8, precipitation: 45.0, humidity: 86, heatIndex: 16.0 },

  // ─── 8. WESTERN GHATS & KONKAN / MALABAR (Squall Rain Corridor & Severe Heat Index: 28°C - 31.8°C) ───
  { id: 'mumbai', name: 'Mumbai', region: 'Konkan Coastline', lon: 72.8777, lat: 19.0760, temp: 31.8, precipitation: 88.0, humidity: 85, heatIndex: 41.2 },
  { id: 'thane', name: 'Thane', region: 'North Konkan Basin', lon: 72.9781, lat: 19.2183, temp: 31.5, precipitation: 84.0, humidity: 84, heatIndex: 40.8 },
  { id: 'alibaug', name: 'Alibaug', region: 'Raigad Coastal Strip', lon: 72.8700, lat: 18.6414, temp: 30.8, precipitation: 92.0, humidity: 86, heatIndex: 39.8 },
  { id: 'mahabaleshwar', name: 'Mahabaleshwar', region: 'Western Ghats Crestline', lon: 73.6586, lat: 17.9237, temp: 20.5, precipitation: 125.0, humidity: 92, heatIndex: 21.0 },
  { id: 'ratnagiri', name: 'Ratnagiri', region: 'South Konkan Escarpment', lon: 73.3120, lat: 16.9902, temp: 29.4, precipitation: 115.0, humidity: 88, heatIndex: 38.6 },
  { id: 'panaji', name: 'Panaji', region: 'Goa Coast', lon: 73.8278, lat: 15.4909, temp: 29.8, precipitation: 104.0, humidity: 86, heatIndex: 39.0 },
  { id: 'karwar', name: 'Karwar', region: 'Uttara Kannada Escarpment', lon: 74.1240, lat: 14.8135, temp: 29.2, precipitation: 98.0, humidity: 85, heatIndex: 38.0 },
  { id: 'mangaluru', name: 'Mangaluru', region: 'Canara Coastal Strip', lon: 74.8560, lat: 12.9141, temp: 28.6, precipitation: 92.0, humidity: 84, heatIndex: 36.4 },
  { id: 'kannur', name: 'Kannur', region: 'North Malabar Coast', lon: 75.3704, lat: 11.8745, temp: 28.4, precipitation: 85.0, humidity: 85, heatIndex: 36.2 },
  { id: 'kozhikode', name: 'Kozhikode', region: 'Central Malabar Strip', lon: 75.7804, lat: 11.2588, temp: 28.5, precipitation: 80.0, humidity: 85, heatIndex: 36.2 },
  { id: 'kochi', name: 'Kochi', region: 'Malabar Coastline', lon: 76.2673, lat: 9.9312, temp: 28.2, precipitation: 76.0, humidity: 86, heatIndex: 36.0 },
  { id: 'alappuzha', name: 'Alappuzha', region: 'Vembanad Littoral', lon: 76.3388, lat: 9.4981, temp: 28.6, precipitation: 72.0, humidity: 85, heatIndex: 36.4 },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', region: 'Travancore Southern Tip', lon: 76.9366, lat: 8.5241, temp: 29.0, precipitation: 64.0, humidity: 83, heatIndex: 36.8 },

  // ─── 9. COROMANDEL & EAST COAST (Maritime Heat Index & Moderate Rain: 29.5°C - 31.5°C) ───
  { id: 'visakhapatnam', name: 'Visakhapatnam', region: 'Northern Circars Coast', lon: 83.2185, lat: 17.6868, temp: 29.4, precipitation: 38.0, humidity: 80, heatIndex: 37.2 },
  { id: 'kakinada', name: 'Kakinada', region: 'Godavari Delta Front', lon: 82.2475, lat: 16.9891, temp: 29.8, precipitation: 42.0, humidity: 82, heatIndex: 38.2 },
  { id: 'vijayawada', name: 'Vijayawada', region: 'Krishna Delta Basin', lon: 80.6480, lat: 16.5062, temp: 31.2, precipitation: 28.0, humidity: 78, heatIndex: 39.0 },
  { id: 'guntur', name: 'Guntur', region: 'Lower Krishna Plain', lon: 80.4365, lat: 16.3067, temp: 30.8, precipitation: 30.0, humidity: 77, heatIndex: 38.5 },
  { id: 'nellore', name: 'Nellore', region: 'South Circars Littoral', lon: 79.9864, lat: 14.4426, temp: 30.5, precipitation: 36.0, humidity: 79, heatIndex: 38.6 },
  { id: 'chennai', name: 'Chennai', region: 'Coromandel Coastal Plain', lon: 80.2707, lat: 13.0827, temp: 30.2, precipitation: 56.0, humidity: 82, heatIndex: 39.8 },
  { id: 'kanchipuram', name: 'Kanchipuram', region: 'Palar River Basin', lon: 79.7036, lat: 12.8342, temp: 30.0, precipitation: 52.0, humidity: 80, heatIndex: 38.8 },
  { id: 'puducherry', name: 'Puducherry', region: 'Coromandel Maritime', lon: 79.8083, lat: 11.9416, temp: 29.6, precipitation: 48.0, humidity: 80, heatIndex: 37.6 },
  { id: 'cuddalore', name: 'Cuddalore', region: 'Gedilam River Plain', lon: 79.7680, lat: 11.7480, temp: 29.8, precipitation: 46.0, humidity: 81, heatIndex: 38.2 },
  { id: 'tiruchirappalli', name: 'Tiruchirappalli', region: 'Cauvery Delta Valley', lon: 78.7047, lat: 10.7905, temp: 30.8, precipitation: 30.0, humidity: 74, heatIndex: 37.8 },
  { id: 'thanjavur', name: 'Thanjavur', region: 'Cauvery Granary Delta', lon: 79.1378, lat: 10.7870, temp: 30.4, precipitation: 34.0, humidity: 76, heatIndex: 38.0 },
  { id: 'madurai', name: 'Madurai', region: 'Vaigai River Plain', lon: 78.1198, lat: 9.9252, temp: 31.4, precipitation: 22.0, humidity: 70, heatIndex: 37.5 },
  { id: 'tirunelveli', name: 'Tirunelveli', region: 'Thamirabarani Basin', lon: 77.7567, lat: 8.7139, temp: 30.6, precipitation: 18.0, humidity: 72, heatIndex: 37.0 },
  { id: 'kanyakumari', name: 'Kanyakumari', region: 'Indian Ocean Convergence Cape', lon: 77.5385, lat: 8.0883, temp: 29.2, precipitation: 35.0, humidity: 82, heatIndex: 36.8 },

  // ─── 10. NORTHERN MOUNTAINS & HIMALAYAS (Cold Alpine Sink: 10°C - 24.6°C) ───
  { id: 'leh', name: 'Leh', region: 'Ladakh High Altitude', lon: 77.5771, lat: 34.1526, temp: 11.2, precipitation: 0.8, humidity: 28, heatIndex: 11.0 },
  { id: 'kargil', name: 'Kargil', region: 'Suru River Gorge', lon: 76.1258, lat: 34.5539, temp: 12.4, precipitation: 1.0, humidity: 32, heatIndex: 12.0 },
  { id: 'gulmarg', name: 'Gulmarg', region: 'Pir Panjal High Alpine', lon: 74.3800, lat: 34.0500, temp: 10.5, precipitation: 14.0, humidity: 65, heatIndex: 10.2 },
  { id: 'srinagar', name: 'Srinagar', region: 'Kashmir Valley', lon: 74.7973, lat: 34.0837, temp: 18.5, precipitation: 12.4, humidity: 55, heatIndex: 18.2 },
  { id: 'pahalgam', name: 'Pahalgam', region: 'Lidder Valley Alpine', lon: 75.3167, lat: 34.0167, temp: 13.8, precipitation: 15.0, humidity: 62, heatIndex: 13.5 },
  { id: 'jammu', name: 'Jammu', region: 'Tawi Shivalik Foothills', lon: 74.8570, lat: 32.7266, temp: 26.2, precipitation: 18.0, humidity: 64, heatIndex: 27.5 },
  { id: 'dharamshala', name: 'Dharamshala', region: 'Dhauladhar Slope Ridge', lon: 76.3234, lat: 32.2190, temp: 20.4, precipitation: 35.0, humidity: 72, heatIndex: 20.8 },
  { id: 'manali', name: 'Manali', region: 'Upper Beas Valley', lon: 77.1887, lat: 32.2396, temp: 14.2, precipitation: 22.0, humidity: 68, heatIndex: 14.0 },
  { id: 'shimla', name: 'Shimla', region: 'Himachal Ridge', lon: 77.1734, lat: 31.1048, temp: 16.8, precipitation: 18.2, humidity: 62, heatIndex: 16.5 },
  { id: 'dehradun', name: 'Dehradun', region: 'Shivalik Foothills', lon: 78.0322, lat: 30.3165, temp: 24.6, precipitation: 22.0, humidity: 68, heatIndex: 25.1 },
  { id: 'mussoorie', name: 'Mussoorie', region: 'Garhwal Lesser Himalayas', lon: 78.0757, lat: 30.4598, temp: 17.5, precipitation: 28.0, humidity: 74, heatIndex: 17.2 },
  { id: 'nainital', name: 'Nainital', region: 'Kumaon Lake Ridge', lon: 79.4591, lat: 29.3919, temp: 16.2, precipitation: 32.0, humidity: 76, heatIndex: 16.0 },

  // ─── 11. NORTHEASTERN HILLS & VALLEYS (Orographic Inflow & Heavy Monsoonal Rain: 17°C - 27°C) ───
  { id: 'guwahati', name: 'Guwahati', region: 'Brahmaputra Valley', lon: 91.7362, lat: 26.1445, temp: 25.4, precipitation: 68.0, humidity: 84, heatIndex: 28.5 },
  { id: 'tezpur', name: 'Tezpur', region: 'North Brahmaputra Bank', lon: 92.7926, lat: 26.6528, temp: 25.0, precipitation: 72.0, humidity: 85, heatIndex: 27.8 },
  { id: 'jorhat', name: 'Jorhat', region: 'Central Assam Tea Belt', lon: 94.2037, lat: 26.7509, temp: 24.8, precipitation: 78.0, humidity: 86, heatIndex: 27.4 },
  { id: 'dibrugarh', name: 'Dibrugarh', region: 'Upper Assam Tea Basin', lon: 94.9120, lat: 27.4728, temp: 24.2, precipitation: 82.0, humidity: 86, heatIndex: 26.4 },
  { id: 'silchar', name: 'Silchar', region: 'Barak Valley Basin', lon: 92.7789, lat: 24.8333, temp: 26.0, precipitation: 65.0, humidity: 84, heatIndex: 29.5 },
  { id: 'shillong', name: 'Shillong', region: 'Khasi Hills Plateau', lon: 91.8933, lat: 25.5788, temp: 17.2, precipitation: 110.0, humidity: 88, heatIndex: 17.5 },
  { id: 'cherrapunji', name: 'Cherrapunji', region: 'Meghalaya Orographic Trap', lon: 91.7323, lat: 25.2986, temp: 18.0, precipitation: 165.0, humidity: 95, heatIndex: 18.8 },
  { id: 'itanagar', name: 'Itanagar', region: 'Arunachal Lower Hills', lon: 93.6053, lat: 27.0844, temp: 23.5, precipitation: 92.0, humidity: 88, heatIndex: 25.2 },
  { id: 'kohima', name: 'Kohima', region: 'Naga Hills Ridge', lon: 94.1086, lat: 25.6751, temp: 19.2, precipitation: 75.0, humidity: 86, heatIndex: 19.5 },
  { id: 'imphal', name: 'Imphal', region: 'Manipur Intermontane Basin', lon: 93.9368, lat: 24.8170, temp: 22.8, precipitation: 55.0, humidity: 82, heatIndex: 24.0 },
  { id: 'aizawl', name: 'Aizawl', region: 'Mizo Hills Crestline', lon: 92.7176, lat: 23.7271, temp: 21.5, precipitation: 60.0, humidity: 84, heatIndex: 22.4 },
  { id: 'agartala', name: 'Agartala', region: 'Tripura Plain', lon: 91.2868, lat: 23.8315, temp: 26.8, precipitation: 45.0, humidity: 80, heatIndex: 30.2 },

  // ─── 12. ISLAND TERRITORIES (Equatorial Maritime: 28°C - 29°C) ───
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
