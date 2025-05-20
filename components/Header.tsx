'use client';

import {
  GlobeAltIcon,
  Bars2Icon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type DateRangeSelection = {
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
};

function Header({ placeholder }: { placeholder?: string }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState('');
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  function handleSelect(ranges: DateRangeSelection) {
    const selection = ranges.selection;
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
  }

  function resetInput() {
    setSearchInput('');
  }

  function search() {
    if (!searchInput) return;

    router.push(
      `/search?location=${searchInput}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&noOfGuests=${noOfGuests}`,
    );

    setSearchInput('');
  }

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10'>
      {/* Left - Logo */}
      <div
        onClick={() => router.push('/')}
        className='relative flex items-center h-10 my-auto cursor-pointer'
      >
        <Image
          src='/logo.svg'
          alt='Airbnb Logo'
          width={100}
          height={40}
          className='object-contain object-left'
        />
      </div>

      {/* Middle - Search Input */}
      <div className='flex items-center md:border-2 rounded-full md:shadow-sm py-2'>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          placeholder={placeholder || 'Start your Search'}
          className='flex-grow text-sm text-gray-600 pl-5 placeholder-gray-400 outline-none bg-transparent'
        />
        <MagnifyingGlassIcon className='h-8 hidden md:inline-flex p-2 mx-auto cursor-pointer md:mx-2 bg-red-400 rounded-full text-white' />
      </div>

      {/* Right - User Options */}
      <div className='flex items-center text-gray-500 justify-end space-x-4'>
        <p className='cursor-pointer hidden md:inline'>Become a host</p>
        <GlobeAltIcon className='h-6 cursor-pointer hidden sm:inline' />
        <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
          <Bars2Icon className='h-6 cursor-pointer' />
          <UserCircleIcon className='h-6 cursor-pointer' />
        </div>
      </div>

      {/* Calendar and Guests Picker */}
      {searchInput && (
        <div className='flex flex-col col-span-3 mx-auto mt-0'>
          <DateRangePicker
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
          <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
            <UsersIcon className='h-5' />
            <input
              className='w-12 pl-2 text-lg outline-none text-red-400'
              type='number'
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(Number(e.target.value))}
            />
          </div>
          <div className='flex'>
            <button onClick={resetInput} className='flex-grow text-gray-500'>
              Cancel
            </button>
            <button onClick={search} className='flex-grow text-red-400'>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
