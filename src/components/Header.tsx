import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md border-b">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/surveys"
          className="flex items-center gap-2 text-blue-600 font-bold text-xl hover:opacity-90"
        >
          <div className="flex items-center">
            <img
              src="https://i.gifer.com/origin/2d/2dabb694e9bfccef713863a4a6543c79_w200.webp"
              alt="SurveyPulse Logo"
              className="h-8 w-8 mr-2 rounded-full"
            />
            <h1
              className="text-lg md:text-2xl font-bold relative overflow-hidden"
              style={{ display: "inline-block" }}
            >
              SurveyPulse
            </h1>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm md:text-lg text-gray-700 font-medium">
          <Link to="/surveys" className="hover:text-blue-600 transition">
            All Surveys
          </Link>
          <a
            href="https://github.com/Abella-Jezreel/Derilinx-Frontend-Assessment"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <FiGithub />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
