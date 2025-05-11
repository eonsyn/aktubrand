export default function Loading() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 py-8 animate-pulse text-gray-700">
      <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
      <hr className="mb-6" />

      <div className="space-y-4">
        {Array(5).fill().map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
        <div className="h-48 bg-gray-200 rounded w-full mt-6"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>

      <div className="mt-10 space-x-2">
        <span className="inline-block h-6 w-16 bg-gray-300 rounded"></span>
        <span className="inline-block h-6 w-14 bg-gray-300 rounded"></span>
        <span className="inline-block h-6 w-12 bg-gray-300 rounded"></span>
      </div>

      <div className="mt-12">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((key) => (
            <div key={key} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </main>
  );
}
