'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
});

const MapWrapper = ({ searchResults }: { searchResults: any[] }) => {
  return <DynamicMap searchResults={searchResults} />;
};

export default MapWrapper;
