export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}