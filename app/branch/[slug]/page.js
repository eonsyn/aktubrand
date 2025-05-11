import SubjectCard from '@/components/cards/SubjectCard';
import connectDB from '@/utils/db';
import Subject from '@/models/Subject';
import ResourceInfo from '@/components/seo/ResourceInfo';
import SecondYearQuantum from '@/components/seo/SecondYearQuantum';
import Link from 'next/link';
 import ButtonBounce from '@/components/branch/ButtonBounce';
import MobileBar from '@/components/branch/MobileBar';
import Image from 'next/image';
import quantumImage from '@/public/assets/quantum/devinequantum.png'
import AdBanner300x250 from '@/components/ads/AdBanner300x250';

// Static params for branches (CSE, Mechanical, etc.)
export async function generateStaticParams() {
  const branches = [
    { id: "cse" },
    { id: "mechanical" },
  ];

  return branches.map((branch) => ({
    slug: branch.id.toString(),
  }));
}

export default async function BranchPage({ params, searchParams }) {
  const { slug } = params;
  const search = searchParams?.search || '';
  const filter = searchParams?.filter || 'both';
  const filterOptions = [
    { label: 'Quantum', value: 'quantum' },
    { label: 'Notes', value: 'notes' },
    { label: 'Both', value: 'both' },
  ];

  await connectDB();

  let query = { branch: new RegExp(`^${slug}$`, 'i') };

  if (search) {
    query.subjectName = new RegExp(search, 'i');
  }

  // Apply filter for type
  if (filter !== 'both') {
    query.type = filter;
  }

  const subjects = await Subject.find(query).limit(20).lean();

  const getFilterLink = (type) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set('search', search);
    if (type !== 'both') queryParams.set('filter', type);
    return `?${queryParams.toString()}`;
  };

  return (
    <div className="px-2 md:px-6  ">
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
          <Image src={quantumImage} className='   object-cover h-full' />
        </div>

      </header>


      <div id='quantum' className='pt-2'>


        {/* Sticky Search + Filters */}

        <div className="sticky top-14 justify-between md:flex z-10 py-1 items-center ">
          {/* Search Form */}
          <form method="GET" className="hidden md:flex w-[60vw] p-1 rounded-xl bg-white/20 backdrop-blur-2xl    gap-2">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search subjects..."
              className="w-full border bg-white border-gray-300 rounded-lg py-3 px-4 shadow-sm"
            />
            <button
              className="px-4 py-2 rounded-md bg-highlight text-white"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Filter Buttons */}
          <div className="bg-white/20   justify-center hidden md:flex p-1 rounded-xl  h-[56px] backdrop-blur-2xl  gap-4">
            {filterOptions.map((option, index) => (
              <Link key={index} href={getFilterLink(option.value)}>
                <button
                  className={`px-4 py-2 h-full rounded-md ${filter === option.value ? 'bg-highlight text-white' : 'bg-gray-200'
                    }`}
                >
                  {option.label}
                </button>
              </Link>
            ))}
          </div>


          {/* mobile search nav */}
          <MobileBar
            search={search}
            filter={filter}

          />


        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-6">
          {subjects.map((subject, index) => {
            // Convert the subject object to a plain object with only the necessary fields
            const plainSubject = {
              subjectName: subject.subjectName,
              branch: subject.branch,
              type: subject.type,
              tags: subject.tags,
              pdfUrl: subject.pdfUrl,
              cardImageUrl: subject.cardImageUrl,
              description: subject.description,
              subjectCode: subject.subjectCode,
            };

            return <SubjectCard key={index} subject={plainSubject} index={index} />;
          })}

        </div>
      </div>

      <AdBanner300x250/>
      <ResourceInfo />
      <SecondYearQuantum />
    </div>

  );
}

//metadata
export async function generateMetadata() {
  return {
    title: "CSE and Mech Quantum Resources - Boost Your AKTU Exam Preparation",
    description: "Explore the comprehensive collection of AKTU Quantum Series resources for Computer Science and Mechanical Engineering second-year students. Get access to study notes, PDFs, and essential study materials to excel in your AKTU exams.",
    keywords: "CSE Quantum, Mech Quantum, AKTU Quantum Resources, AKTU Second Year, Study Materials, Exam Preparation, AKTU Notes, Quantum PDFs, B.Tech, AKTU Study Guide",
    openGraph: {
      title: "CSE and Mech Quantum Resources - Boost Your AKTU Exam Preparation",
      description: "Explore the comprehensive collection of AKTU Quantum Series resources for Computer Science and Mechanical Engineering second-year students.",
      url: "https://aktubrand.netlify.app/branch/cse",
      site_name: "AKTU Quantum Series",
      images: [
        {
          url: "https://yourwebsite.com/images/quantum-cover.jpg",
          width: 1200,
          height: 630,
          alt: "AKTU Quantum Resources for CSE and Mech",
        },
      ],
    },
  };
}

