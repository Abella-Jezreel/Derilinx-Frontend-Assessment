import { FaGithub, FaReact } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t mt-12 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-800">SurveyPulse</span>. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Abella-Jezreel/Derilinx-Frontend-Assessment"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaGithub size={18} />
          </a>
          <span className="flex items-center gap-1">
            Built with <FaReact className="text-blue-500" size={18} /> React
          </span>
        </div>
      </div>
    </footer>
  );
}
