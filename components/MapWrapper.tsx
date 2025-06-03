'use client';
import Map from './Map';
import { Stay } from '@/types/stay';

export default function MapWrapper({ searchResults }: { searchResults: Stay[] }) {
  return (
    <div className='w-full h-full'>
      <Map searchResults={searchResults} />
    </div>
  );
}
