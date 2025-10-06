'use client'; // Only for client components like ClientFilterBar

import React, { Suspense } from 'react';
import Image from 'next/image';
import connectDB from '@/utils/db';
import Subject from '@/models/Subject';
import ClientFilterBar from './ClientFilterBar';
import ResourceInfo from '@/components/seo/ResourceInfo';
import SecondYearQuantum from '@/components/seo/SecondYearQuantum';
import ButtonBounce from '@/components/branch/ButtonBounce';
import quantumImage from '@/public/assets/quantum/devinequantum.png';
// import AdBanner300x250 from '@/components/ads/AdBanner300x250'; // Uncomment if needed

export const revalidate = 600;

export async function generateStaticParams() {
  const branches = [{ id: 'cse' }, { id: 'mechanical' }];
  return branches.map(branch => ({ slug: branch.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const pageTitle =
    slug === 'cse'
      ? 'CSE Quantum Resources'
      : slug === 'mechanical'
      ? 'Mechanical Quantum Resources'
      : `${slug.toUpperCase()} Quantum Resources`;

  return {
    title: `${pageTitle} - Boost Your AKTU Exam Preparation`,
    description: `Explore the AKTU Quantum Series resources for ${slug.toUpperCase()} students.`,
    openGraph: {
      title: `${pageTitle} - Boost Your AKTU Exam Preparation`,
      description: `Explore the AKTU Quantum Series resources for ${slug.toUpperCase()} students.`,
      url: `https://aktubrand.netlify.app/branch/${slug}`,
      site_name: 'AKTU Quantum Series',
      images: [
        {
          url: 'https://yourwebsite.com/images/quantum-cover.jpg',
          width: 1200,
          height: 630,
          alt: `AKTU Quantum Resources for ${slug.toUpperCase()}`,
        },
      ],
    },
  };
}

export default async function BranchPage({ params }) {
  const { slug } = params;

  // Connect to DB and fetch subjects
  await connectDB();
  const subjects = await Subject.find({
    branch: { $in: [new RegExp(`^${slug}$`, 'i'), 'all'] },
  })
    .limit(100)
    .lean();

  return (
    <div className="px-2 md:px-6">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row pb-4">
        <div className="w-full text-center md:text-left md:w-1/2">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-tight md:leading-[5rem] font-bold capitalize">
            Quantum Series for <span className="block text-highlight">AKTU</span> {slug} Student
          </h1>

          {/* Mobile Image */}
          <div className="w-full my-4 md:hidden h-[45vh] overflow-hidden rounded-2xl">
            <Image
              src={quantumImage}
              className="object-cover w-full h-full"
              alt="Devine Quantum for AKTU Students"
              priority
            />
          </div>

          <p className="pt-1 tracking-wide text-md">
            Get Free Quantum from here and Boost your Score in Aktu Examination by Aktu Brand.
          </p>

          <div className="mt-4">
            <ButtonBounce />
          </div>
        </div>

        {/* Desktop Image */}
        <div className="w-1/2 hidden md:block md:h-[88vh] overflow-hidden rounded-2xl md:ml-6">
          <Image
            alt="Devine Quantum for AKTU Students"
            src={quantumImage}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </header>

      {/* Client Filter Bar */}
      <div id="quantum" className="pt-2">
        <Suspense fallback={<div className="text-center py-10">Loading Subjects...</div>}>
          <ClientFilterBar subjects={subjects} branchSlug={slug} />
        </Suspense>
      </div>

      {/* Resources Section */}
      <div className="mt-8">
        {/* <AdBanner300x250 /> */}
        <ResourceInfo />
        <SecondYearQuantum />
      </div>
    </div>
  );
}
