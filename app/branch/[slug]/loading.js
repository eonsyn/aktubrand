import ButtonBounce from '@/components/branch/ButtonBounce';
import Image from 'next/image';
import quantumImage from '@/public/assets/quantum/devinequantum.png'
export default function Loading() {
  return (
    <div className="px-6 py-10">
 <header className='flex pb-4   '>
        <div className=' w-full md:w-1/2'>
          <h1 className="text-6xl lg:text-8xl leading-[3rem]  md:leading-[5rem] font-bold  capitalize">Quantum Series for <span className="block text-highlight">AKTU</span>
             {/* <span className="text-highlight">
            {slug === 'cse'
              ? 'Computer Science '
              : slug === 'me'
                ? 'Mechanical Engineering '
                : slug}
          </span> */}
            Student </h1>
          <div className='w-full my-1  md:hidden h-[45vh] overflow-hidden rounded-2xl'>
            <Image src={quantumImage} className='   object-cover h-full' alt='quantum image' />
          </div>
          <p className='pt-1 tracking-wide text-md'>
            Get Free Quantum from here and Boost your Score in Aktu Examination by Aktu Brand.
          </p>
               <div>
                <ButtonBounce/>
               </div>
        </div>
        <div className='w-1/2  hidden md:block h-[88vh] overflow-hidden rounded-2xl'>
          <Image alt='image' src={quantumImage} className='   object-cover h-full' />
        </div>

      </header>
      {/* Skeleton for filter/search bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="h-10 bg-gray-200 rounded w-full md:w-1/3 animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Grid of loading cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg p-4 animate-pulse h-40"></div>
        ))}
      </div>
    </div>
  );
}
