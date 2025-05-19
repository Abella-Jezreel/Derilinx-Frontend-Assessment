import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSurveys } from "../hooks/useSurveys";
import Error from "../components/Error";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaPoll } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_BATCH = 9;

type Survey = {
  id: string;
  title: string;
  description: string;
};

export default function SurveyList() {
  const { data, isLoading, isError } = useSurveys();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom && data && visibleCount < data.length) {
        setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, visibleCount]);

  const visibleData = data?.slice(0, visibleCount);

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: ITEMS_PER_BATCH }).map((_, i) => (
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
          {visibleData?.map((survey: Survey, idx: number) => (
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
              <Link to={`/survey/${survey.id}`}>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md hover:bg-blue-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <FaPoll className="text-blue-500" />
                    {survey.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {survey.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleData && data && visibleData.length < data.length && (
        <div className="text-center py-4">
          <Skeleton width={100} height={20} />
        </div>
      )}
    </div>
  );
}
