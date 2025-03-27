import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Simulating the signed-in user
const currentUser = {
  name: "John Doe", // Replace this with the actual signed-in user's name from your authentication logic
};

const ProblemPostsPage = () => {
  // Dummy problems with submitter details, address, and photos
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: "Optimize Sorting Algorithm",
      description:
        "Improve the efficiency of a sorting algorithm for large datasets.",
      upvotes: 0,
      contributors: [],
      submittedBy: "Alice Johnson",
      profileIcon: "https://via.placeholder.com/40", // Placeholder profile icon
      address: "123 Tech Street, Silicon Valley, CA, USA",
      photos: ["https://via.placeholder.com/300"], // Dummy photo
    },
    {
      id: 2,
      title: "Build a Chatbot",
      description:
        "Create a chatbot that can answer frequently asked questions.",
      upvotes: 0,
      contributors: [],
      submittedBy: "Bob Smith",
      profileIcon: "https://via.placeholder.com/40", // Placeholder profile icon
      address: "456 AI Avenue, New York, NY, USA",
      photos: [], // No photos
    },
    {
      id: 3,
      title: "Develop a Weather App",
      description:
        "Build a weather application that provides real-time updates.",
      upvotes: 0,
      contributors: [],
      submittedBy: "Charlie Brown",
      profileIcon: "https://via.placeholder.com/40", // Placeholder profile icon
      address: "789 Cloud Lane, Seattle, WA, USA",
      photos: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ], // Multiple dummy photos
    },
  ]);

  const handleUpvote = (id) => {
    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem.id === id
          ? { ...problem, upvotes: problem.upvotes + 1 }
          : problem
      )
    );
  };

  const handleContribute = (id) => {
    const contributorName = currentUser.name; // Automatically take the signed-in user's name
    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem.id === id
          ? {
              ...problem,
              contributors: [...problem.contributors, contributorName],
            }
          : problem
      )
    );
  };
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="sticky top-16 bg-gray-100 z-10 p-3 flex justify-between shadow-md">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => navigate("/submit-problem")}
        >
          Submit a Challenge
        </button>
      </div>
      <div className="space-y-6 mt-6">
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

            {/* Buttons */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={() => handleUpvote(problem.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Upvote ({problem.upvotes})
              </button>
              <button
                onClick={() => handleContribute(problem.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Contribute
              </button>
            </div>

            {/* Contributors */}
            {problem.contributors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-700">
                  Contributors:
                </h4>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  {problem.contributors.map((contributor, index) => (
                    <li key={index}>{contributor}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemPostsPage;
