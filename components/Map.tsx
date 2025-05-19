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
  }>({});

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
        mapStyle='mapbox://styles/sonnysangha/ckqlh2q651b7k19lcymr2z03d'
        mapboxApiAccessToken={process.env.mapbox_key}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {searchResults.map((result) => (
          <div key={result.long}>
            <Marker latitude={result.lat} longitude={result.long} offsetLeft={-20} offsetTop={-10}>
              <p
                role='img'
                aria-label='push-pin'
                onClick={() => setSelectedLocation(result)}
                className='cursor-pointer text-2xl animate-bounce'
              >
                📌
              </p>
            </Marker>

            {selectedLocation.long === result.long && (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
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
