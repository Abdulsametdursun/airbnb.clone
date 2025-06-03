'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker, Popup, MapRef, ViewState } from 'react-map-gl';
import { Stay } from '@/types/stay';

export default function Map({ searchResults }: { searchResults: Stay[] }) {
  const mapRef = useRef<MapRef>(null);
  const [selectedLocation, setSelectedLocation] = useState<Stay | null>(null);

  const [viewport, setViewport] = useState<ViewState>({
    latitude: 51.5072,
    longitude: -0.1276,
    zoom: 10,
  });

  // Calculate bounds from coordinates
  useEffect(() => {
    if (!mapRef.current || searchResults.length === 0) return;

    const lats = searchResults.map((loc) => loc.lat);
    const longs = searchResults.map((loc) => loc.long);

    const bounds = [
      [Math.min(...longs), Math.min(...lats)],
      [Math.max(...longs), Math.max(...lats)],
    ];

    mapRef.current.fitBounds(bounds as [[number, number], [number, number]], {
      padding: 80,
      duration: 1000,
    });
  }, [searchResults]);

  return (
    <div className='w-full h-full relative'>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapStyle='mapbox://styles/sananemapbox/cmb2z4x2d00oz01qy5yaobmqh'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(e) => setViewport(e.viewState)}
        style={{ width: '100%', height: '100%' }}
      >
        {searchResults.map((result) => (
          <Marker key={result.long} longitude={result.long} latitude={result.lat} anchor='bottom'>
            <div
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
            >
              📌
            </div>
          </Marker>
        ))}

        {selectedLocation && (
          <Popup
            longitude={selectedLocation.long}
            latitude={selectedLocation.lat}
            onClose={() => setSelectedLocation(null)}
            closeOnClick
          >
            {selectedLocation.title}
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
