import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { Stay } from '../../../types/stay';
import InfoCard from '../../../components/InfoCard';

export default async function SearchPage() {
  const res = await fetch('https://www.jsonkeeper.com/b/5NPS');
  const searchResults: Stay[] = await res.json();

  <p className='text-red-500'>Found {searchResults.length} stays</p>;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const queryString = globalThis?.location?.search || '';
  const url = new URL(queryString, baseUrl);

  const location = url.searchParams.get('location') ?? '';
  const startDateRaw = url.searchParams.get('startDate') ?? '';
  const endDateRaw = url.searchParams.get('endDate') ?? '';
  const noOfGuests = url.searchParams.get('noOfGuests') ?? '1';

  const startDate = startDateRaw ? new Date(startDateRaw) : null;
  const endDate = endDateRaw ? new Date(endDateRaw) : null;

  const formattedStartDate = startDate ? format(startDate, 'dd MMMM yy') : 'Anytime';
  const formattedEndDate = endDate ? format(endDate, 'dd MMMM yy') : 'Anytime';
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guest`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            {searchResults.length}+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location || 'Here'}</h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>
          {searchResults.map((item) => (
            <InfoCard
              key={item.img}
              img={item.img}
              location={item.location}
              title={item.title}
              description={item.description}
              star={item.star}
              price={item.price}
              total={item.total}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
