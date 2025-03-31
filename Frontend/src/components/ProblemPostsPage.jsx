import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProblemPostsPage = () => {
  const [verifiedProblems, setVerifiedProblems] = useState([]); // State to store problems
  const [votedProblems, setVotedProblems] = useState([]); // State to track voted problems
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/problem/verifiedProblems`,
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", response.data); // Log response
        setVerifiedProblems(response.data.problems); // Store problems in state
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

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
        {verifiedProblems.length > 0 ? (
          verifiedProblems.map((problem) => (
            <div
              key={problem._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center text-5xl font-bold">
                  {problem?.submittedBy?.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {problem.submittedBy.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Posted a challenge :{" "}
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mt-2">
                <strong>Title:</strong> {problem.title}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Description:</strong> {problem.description}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Category:</strong> {problem.category}
              </p>
              <p className="text-gray-500 mt-2">
                <strong>Address:</strong> {problem.address}
              </p>

              {problem.images.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {problem.images.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Problem ${problem._id} photo ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}

              {problem.videos?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-700">Videos:</h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    {problem.videos.map((video, index) => (
                      <li key={index}>
                        <a
                          href={video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Video {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {problem.documents?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-700">
                    Documents:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    {problem.documents.map((doc, index) => (
                      <li key={index}>
                        <a
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Document {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center space-x-4 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Upvote ({problem.votes})
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                  Contribute
                </button>
              </div>

              {problem.contributors?.length > 0 && (
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
          ))
        ) : (
          <p className="text-center text-gray-500">No challenges found.</p>
        )}
      </div>
    </div>
  );
};

export default ProblemPostsPage;
