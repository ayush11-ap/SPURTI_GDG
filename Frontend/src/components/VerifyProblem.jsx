import React, { useState } from "react";

const VerifyProblem = () => {
  // Dummy problems with submitter details, address, and photos
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Optimize Sorting Algorithm",
      description:
        "Improve the efficiency of a sorting algorithm for large datasets.",
      submittedBy: "Alice Johnson",
      profileIcon: "https://via.placeholder.com/40", // Placeholder profile icon
      address: "123 Tech Street, Silicon Valley, CA, USA",
      photos: ["https://via.placeholder.com/300"], // Dummy photo
      isVerified: false,
    },
    {
      id: 2,
      title: "Build a Chatbot",
      description:
        "Create a chatbot that can answer frequently asked questions.",
      submittedBy: "Bob Smith",
      profileIcon: "https://via.placeholder.com/40", // Placeholder profile icon
      address: "456 AI Avenue, New York, NY, USA",
      photos: [], // No photos
      isVerified: false,
    },
    {
      id: 3,
      title: "Develop a Weather App",
      description:
        "Build a weather application that provides real-time updates.",
      submittedBy: "Charlie Brown",
      profileIcon: "https://via.placeholder.com/40", // Placeholder profile icon
      address: "789 Cloud Lane, Seattle, WA, USA",
      photos: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ], // Multiple dummy photos
      isVerified: false,
    },
  ]);

  const handleVerify = (id) => {
    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem.id === id ? { ...problem, isVerified: true } : problem
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Verify Problems</h1>
      <div className="space-y-6">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            {/* Submitter Info */}
            <div className="flex items-center mb-4">
              <img
                src={problem.profileIcon}
                alt={`${problem.submittedBy}'s profile`}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {problem.submittedBy}
                </h3>
                <p className="text-sm text-gray-500">Posted a challenge</p>
              </div>
            </div>

            {/* Problem Details */}
            <h2 className="text-xl font-semibold text-gray-800">
              {problem.title}
            </h2>
            <p className="text-gray-600 mt-2">{problem.description}</p>

            {/* Address */}
            <p className="text-gray-500 mt-2">
              <strong>Address:</strong> {problem.address}
            </p>

            {/* Photos */}
            {problem.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {problem.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Problem ${problem.id} photo ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}

            {/* Verify Button */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={() => handleVerify(problem.id)}
                className={`px-4 py-2 rounded transition ${
                  problem.isVerified
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                disabled={problem.isVerified}
              >
                {problem.isVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyProblem;
