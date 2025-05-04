import SubjectCard from '@/components/cards/SubjectCard';
import connectDB from '@/utils/db';
import Subject from '@/models/Subject';
import ResourceInfo from '@/components/seo/ResourceInfo';
import SecondYearQuantum from '@/components/seo/SecondYearQuantum';
import Link from 'next/link';

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
    <div className="p-6">
    <h1 className="text-4xl font-bold mb-4 capitalize">{slug} Branch</h1>
  <div>

  
    {/* Sticky Search + Filters */}

    <div className="sticky top-14 justify-between md:flex z-10 py-1 items-center ">
      {/* Search Form */}
      <form method="GET" className=" max-w-md p-1 rounded-xl bg-white/20 backdrop-blur-2xl  flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search subjects..."
          className="w-full border bg-white border-gray-300 rounded-lg py-3 px-4 shadow-sm"
        />
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
          type="submit"
        >
          Search
        </button>
      </form>
  
      {/* Filter Buttons */}
      <div className="flex justify-center p-1 rounded-xl bg-white/20 backdrop-blur-2xl  gap-4">
        <Link href={getFilterLink('quantum')}>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'quantum' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Quantum Only
          </button>
        </Link>
        <Link href={getFilterLink('notes')}>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'notes' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Notes Only
          </button>
        </Link>
        <Link href={getFilterLink('both')}>
          <button
            className={`px-4 py-2 rounded-md ${
              filter === 'both' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Show Both
          </button>
        </Link>
      </div>
    </div>
  
    {/* Subjects Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {subjects.map((subject, index) => (
        <SubjectCard key={index} subject={subject} index={index} />
      ))}
    </div>
  </div>
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

