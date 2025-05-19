import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSurveys } from "../hooks/useSurveys";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import SurveyCard from "../components/cards/SurveyCard";
import Error from "../components/feedback/Error";
import Skeleton from "react-loading-skeleton";
import SurveySkeletonList from "../components/skeleton/SurveyListSkeleton";

type Survey = {
  id: string;
  title: string;
  description: string;
};

const ITEMS_PER_BATCH = 9;

export default function SurveyList() {
  const { data, isLoading, isError } = useSurveys() as {
    data?: Survey[];
    isLoading: boolean;
    isError: boolean;
  };
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);

  const loadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
  const hasMore = data ? visibleCount < data.length : false;

  useInfiniteScroll({ onLoadMore: loadMore, hasMore });

  const visibleData = data?.slice(0, visibleCount);

  if (isLoading) return <SurveySkeletonList count={ITEMS_PER_BATCH} />;
  if (isError) return <Error />;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Explore Our Surveys
        </h1>
        <p className="text-gray-500 mt-2">
          Participate in surveys that help us improve services, gather feedback,
          and understand your needs better.
        </p>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {visibleData?.map((survey, idx) => (
            <motion.div
              key={survey.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.07,
                type: "spring",
                stiffness: 60,
              }}
            >
              <SurveyCard {...survey} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="text-center py-4">
          <Skeleton width={100} height={20} />
        </div>
      )}
    </div>
  );
}
