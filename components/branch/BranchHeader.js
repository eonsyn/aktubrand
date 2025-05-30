import React from 'react'
import ButtonBounce from '@/components/branch/ButtonBounce';
import Image from 'next/image';
import quantumImage from '@/public/assets/quantum/devinequantum.png';

function BranchHeader() {
  return (
     <header className='flex flex-col md:flex-row pb-4'>
            <div className='w-full md:w-1/2'>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-tight md:leading-[5rem] font-bold capitalize">
                Quantum Series for <span className="block text-highlight">AKTU</span> Student
              </h1>
              {/* Mobile Image */}
              <div className='w-full my-4 md:hidden h-[45vh] overflow-hidden rounded-2xl'>
                <Image 
                  src={quantumImage} 
                  className='object-cover w-full h-full' 
                  alt='Devine Quantum for AKTU Students' 
                  priority // Good for LCP
                />
              </div>
              <p className='pt-1 tracking-wide text-md'>
                Get Free Quantum from here and Boost your Score in Aktu Examination by Aktu Brand.
              </p>
              <div className="mt-4">
                <ButtonBounce />
              </div>
            </div>
            {/* Desktop Image */}
            <div className='w-1/2 hidden md:block md:h-[88vh] overflow-hidden rounded-2xl md:ml-6'>
              <Image 
                alt='Devine Quantum for AKTU Students' 
                src={quantumImage} 
                className='object-cover w-full h-full' 
                priority // Good for LCP
              />
            </div>
          </header>
    
  )
}

export default BranchHeader
