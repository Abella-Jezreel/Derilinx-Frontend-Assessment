import { Link } from "react-router-dom";

export default function BackToListLink() {
  return (
    <Link
      to="/surveys"
      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Survey List
    </Link>
  );
}
