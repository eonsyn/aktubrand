import SubjectCard from '@/components/cards/SubjectCard';
import connectDB from '@/utils/db';
import Subject from '@/models/Subject';
import ResourceInfo from '@/components/seo/ResourceInfo';
import SecondYearQuantum from '@/components/seo/SecondYearQuantum';
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

// Fetch subjects data inside the component for static generation
export default async function BranchPage({ params, searchParams }) {
  const { slug } = params; // Get branch name from URL
  const search = searchParams?.search || ''; // Get search term from query params

  await connectDB();

  // Build query with branch filtering and optional search term
  let query = { branch: new RegExp(`^${slug}$`, 'i') };

  if (search) {
    query.subjectName = new RegExp(search, 'i'); // Case-insensitive search
  }

  // Fetch subjects based on query (branch + search term)
  const subjects = await Subject.find(query).limit(20).lean(); // Adjust limit as needed

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 capitalize">{slug} Branch</h1>

      {/* Search form */}
      <form method="GET" className="mb-6 max-w-md mx-auto flex">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search subjects..."
          className="w-full border border-gray-300 rounded-lg py-3 px-4 shadow-sm"
        />
        <button className='p-2 rounded-md cursor-pointer bg-blue-500 text-white' type='submit'>Search </button>
      </form>

      {/* Display subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} index={index} />
        ))}
      </div>
      <ResourceInfo/>
      <SecondYearQuantum/>
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

