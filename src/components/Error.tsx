import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white shadow-lg border rounded-lg p-6 max-w-md w-full text-center">
        <img
          src="https://www.svgrepo.com/show/488925/error.svg"
          alt="Error"
          className="w-24 h-24 mx-auto mb-4 animate-bounce text-red-500"
          style={{ filter: "drop-shadow(0 0 5px rgba(255, 0, 0, 0.5))" }}
        />
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong
        </h2>
        <p className="text-gray-600 mt-2">
          We couldn’t load the survey. Please check your connection or try again
          later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Error;
