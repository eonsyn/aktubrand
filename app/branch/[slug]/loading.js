export default function Loading() {
  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-4 animate-pulse">Loading Branch Resources...</h2>

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
