// components/RouteFallback.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RouteFallback() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        <Skeleton width={220} />
      </h1>
      <p className="text-gray-600">
        <Skeleton count={3} />
      </p>
    </div>
  );
}
