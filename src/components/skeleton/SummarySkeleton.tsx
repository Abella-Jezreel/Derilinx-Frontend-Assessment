import Skeleton from "react-loading-skeleton";

export default function SummarySkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        <Skeleton width={200} />
      </h1>
      <p className="text-gray-600">
        <Skeleton count={2} />
      </p>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="border-b pb-4 mb-4">
          <h2 className="font-semibold mb-2">
            <Skeleton width={`80%`} />
          </h2>
          <ul className="space-y-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex justify-between">
                <Skeleton width="40%" />
                <Skeleton width="20%" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
