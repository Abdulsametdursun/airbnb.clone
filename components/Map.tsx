'use client';

import { useState } from 'react';
import ReactMapGL, { Marker, Popup, ViewState } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

const Map = ({
  searchResults,
}: {
  searchResults: {
    lat: number;
    long: number;
    title: string;
  }[];
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat?: number;
    long?: number;
    title?: string;
  } | null>(null);

  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  const center = getCenter(coordinates) || {
    latitude: searchResults[0]?.lat || 0,
    longitude: searchResults[0]?.long || 0,
  };

  const [viewport, setViewport] = useState<ViewState>({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <div className='w-full h-full'>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/sananemapbox/cmb2z4x2d00oz01qy5yaobmqh'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {searchResults.map((result) => (
          <div key={result.long}>
            <Marker latitude={result.lat} longitude={result.long} anchor='bottom'>
              <p
                role='img'
                aria-label='push-pin'
                onClick={() => setSelectedLocation(result)}
                className='cursor-pointer text-2xl animate-bounce'
              >
                📌
              </p>
            </Marker>

            {selectedLocation &&
              selectedLocation.long === result.long &&
              selectedLocation.lat === result.lat && (
                <Popup
                  onClose={() => setSelectedLocation(null)}
                  closeOnClick={true}
                  latitude={result.lat}
                  longitude={result.long}
                  anchor='top'
                >
                  {result.title}
                </Popup>
              )}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
