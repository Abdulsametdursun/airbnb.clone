import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import Footer from '../components/Footer';
import exploreData from '../data/exploreData';
import cardsData from '../data/cardsData';

export default function Home() {
  return (
    <div>
      <Head>
        <title>airbnb clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      <main className='mx-auto px-8 sm:px-16 max-w-7xl'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData.map(
              ({
                img,
                distance,
                location,
              }: {
                img: string;
                distance: string;
                location: string;
              }) => (
                <SmallCard key={img} img={img} distance={distance} location={location} />
              ),
            )}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>

          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData.map(({ img, title }: { img: string; title: string }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img='https://picsum.photos/seed/banner/1200/500'
          title='The Greatest Outdoors'
          description='Wishlists curated by Airbnb.'
          buttonText='Get Inspired'
        />
      </main>
      <Footer />
    </div>
  );
}
