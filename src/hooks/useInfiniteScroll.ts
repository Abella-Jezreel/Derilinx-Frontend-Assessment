import { useEffect } from "react";

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
}: {
  onLoadMore: () => void;
  hasMore: boolean;
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom && hasMore) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onLoadMore, hasMore]);
};
