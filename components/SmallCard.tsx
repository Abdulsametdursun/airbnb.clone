import Image from 'next/image';

function SmallCard({
  img,
  location,
  distance,
}: {
  img: string;
  location: string;
  distance: string;
}) {
  return (
    <div className='flex items-center m-2 space-x-4 mt-5 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'>
      <div className='relative h-16 w-16'>
        <Image src={img} fill className='rounded-lg' alt='small card' />
      </div>
      <div>
        <h2>{location}</h2>
        <h3 className='text-gray-500'>{distance}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
