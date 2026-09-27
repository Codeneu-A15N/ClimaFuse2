import React from 'react';
import MapComponent from './MapComponent';

/**
 * IndiaTelemetryMap
 *
 * Renders the MapLibre GL JS Physical Relief Map within the exact
 * aspect-[4/5] max-w-md landing page container.
 */
export default function IndiaTelemetryMap() {
  return <MapComponent variant="landing" />;
}
