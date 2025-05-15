// /app/branch/[slug]/page.js

// The 'use client' directive is not typically needed for Server Components
// that fetch data, unless you have client-side interactivity that
// cannot be achieved otherwise or specific hooks like useState/useEffect at the top level.
// Based on your code, this page is primarily a Server Component.

import SubjectCard from '@/components/cards/SubjectCard';
import connectDB from '@/utils/db'; // Ensure this connects efficiently and handles connections properly
import Subject from '@/models/Subject'; // Your Mongoose model
import ResourceInfo from '@/components/seo/ResourceInfo';
import SecondYearQuantum from '@/components/seo/SecondYearQuantum';
import Link from 'next/link';
import ButtonBounce from '@/components/branch/ButtonBounce';
import MobileBar from '@/components/branch/MobileBar';
import Image from 'next/image';
import quantumImage from '@/public/assets/quantum/devinequantum.png';
import AdBanner300x250 from '@/components/ads/AdBanner300x250';

// This tells Next.js to revalidate the page every 600 seconds (10 minutes)
// For pages using searchParams, this means the output for a specific URL (including params)
// will be cached and revalidated.
export const revalidate = 600;

// Generates static paths at build time for the slugs provided.
// e.g., /branch/cse and /branch/mechanical
export async function generateStaticParams() {
  const branches = [
    { id: "cse" },
    { id: "mechanical" },
    // Add other branches here if they are relatively static and known at build time
  ];

  return branches.map((branch) => ({
    slug: branch.id.toString(),
  }));
}

// Generates metadata for the page.
// This function can also be dynamic if it needs access to params.
export async function generateMetadata({ params }) { // Added params if you want to customize metadata per slug
  const { slug } = params;
  // Example: Customize title based on slug
  const pageTitle = slug === 'cse' ? "CSE Quantum Resources" :
                    slug === 'mechanical' ? "Mechanical Quantum Resources" :
                    `${slug.toUpperCase()} Quantum Resources`;

  return {
    title: `${pageTitle} - Boost Your AKTU Exam Preparation`,
    description: `Explore the comprehensive collection of AKTU Quantum Series resources for ${slug.toUpperCase()} students. Get access to study notes, PDFs, and essential study materials to excel in your AKTU exams.`,
    keywords: `${slug.toUpperCase()} Quantum, AKTU Quantum Resources, AKTU Second Year, Study Materials, Exam Preparation, AKTU Notes, Quantum PDFs, B.Tech, AKTU Study Guide`,
    openGraph: {
      title: `${pageTitle} - Boost Your AKTU Exam Preparation`,
      description: `Explore the comprehensive collection of AKTU Quantum Series resources for ${slug.toUpperCase()} students.`,
      url: `https://aktubrand.netlify.app/branch/${slug}`, // Dynamic URL
      site_name: "AKTU Quantum Series",
      images: [
        {
          url: "https://yourwebsite.com/images/quantum-cover.jpg", // Replace with actual relevant image
          width: 1200,
          height: 630,
          alt: `AKTU Quantum Resources for ${slug.toUpperCase()}`,
        },
      ],
    },
  };
}

// The main page component
export default async function BranchPage({ params, searchParams }) {
  const { slug } = params; // From the dynamic route segment [slug]
  const search = searchParams?.search || ''; // From URL query ?search=...
  const filter = searchParams?.filter || 'both'; // From URL query ?filter=...

  const filterOptions = [
    { label: 'Quantum', value: 'quantum' },
    { label: 'Notes', value: 'notes' },
    { label: 'Both', value: 'both' },
  ];

  // Connect to the database
  // Ensure connectDB is idempotent and handles connections efficiently,
  // especially in serverless environments.
  await connectDB();

  // Build the database query
  let query = { branch: new RegExp(`^${slug}$`, 'i') }; // Case-insensitive match for branch

  if (search) {
    query.subjectName = new RegExp(search, 'i'); // Case-insensitive search for subjectName
  }

  if (filter !== 'both') {
    query.type = filter; // Filter by type (quantum or notes)
  }

  // Fetch subjects from the database
  // .lean() is good for performance as it returns plain JavaScript objects
  const subjects = await Subject.find(query).limit(20).lean();

  // Helper function to generate filter links
  const getFilterLink = (typeValue) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set('search', search); // Preserve current search term
    if (typeValue !== 'both') queryParams.set('filter', typeValue); // Set new filter
    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : ''; // Return with '?' or empty if no params
  };

  return (
    <div className="px-2 md:px-6">
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

      <div id='quantum' className='pt-2'>
        {/* Sticky Search + Filters */}
        <div className="sticky top-14 z-10 py-2 md:py-4 items-center bg-background/80 backdrop-blur-md"> {/* Added background for sticky */}
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            {/* Search Form - Desktop */}
            <form method="GET" action="" className="hidden md:flex flex-grow p-1 rounded-xl bg-white/20 backdrop-blur-2xl gap-2 items-center">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search subjects..."
                className="w-full border bg-white border-gray-300 rounded-lg py-3 px-4 shadow-sm focus:ring-highlight focus:border-highlight"
              />
              <button
                className="px-6 py-3 rounded-md bg-highlight text-white hover:bg-highlight-dark transition-colors"
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Filter Buttons - Desktop */}
            <div className="bg-white/20 justify-center hidden md:flex p-1 rounded-xl h-[56px] backdrop-blur-2xl gap-2 md:gap-4">
              {filterOptions.map((option) => (
                <Link key={option.value} href={getFilterLink(option.value)} passHref legacyBehavior>
                  <a
                    className={`px-4 py-2 h-full flex items-center justify-center rounded-md transition-colors ${
                      filter === option.value 
                        ? 'bg-highlight text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Search Nav */}
          <div className="md:hidden mt-2"> {/* Ensure MobileBar is styled appropriately */}
            <MobileBar
              search={search}
              filter={filter}
              // getFilterLink might need to be passed or its logic replicated if MobileBar constructs links
            />
          </div>
        </div>

        {/* Subjects Grid */}
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
            {subjects.map((subject, index) => {
              // Ensure only serializable data is passed to client components if SubjectCard is one.
              // .lean() already helps here.
              const plainSubject = {
                _id: subject._id?.toString(), // Pass ID if needed by SubjectCard for keys or links
                subjectName: subject.subjectName,
                branch: subject.branch,
                type: subject.type,
                tags: subject.tags,
                pdfUrl: subject.pdfUrl,
                cardImageUrl: subject.cardImageUrl,
                description: subject.description,
                subjectCode: subject.subjectCode,
              };
              return <SubjectCard key={plainSubject._id || index} subject={plainSubject} index={index} />;
            })}
          </div>
        ) : (
          <div className="text-center py-10 mt-6">
            <p className="text-xl text-gray-600">
              No subjects found matching your criteria for "{slug.toUpperCase()}"
              {search && ` with search term "${search}"`}
              {filter !== 'both' && ` and filter "${filter}"`}.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <AdBanner300x250 />
      </div>
      <div className="mt-8">
        <ResourceInfo />
      </div>
      <div className="mt-8">
        <SecondYearQuantum />
      </div>
    </div>
  );
}
