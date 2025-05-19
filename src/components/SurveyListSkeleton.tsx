import Skeleton from "react-loading-skeleton";

export default function SurveySkeletonList({ count = 9 }: { count?: number }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">
            <Skeleton width={150} />
          </h2>
          <p className="text-gray-600">
            <Skeleton count={2} />
          </p>
        </div>
      ))}
    </div>
  );
}
