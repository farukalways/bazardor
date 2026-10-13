export default function GridSkeleton({ n = 8 }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="skeleton h-8 w-56 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} className="skeleton h-36 w-full" />
        ))}
      </div>
    </div>
  );
}
