import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProblemPostsPage = () => {
  const [verifiedProblems, setVerifiedProblems] = useState([]);
  const [expandedProblemId, setExpandedProblemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/problem/verifiedProblems`,
          { withCredentials: true }
        );
        setVerifiedProblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  // Toggle function to expand/collapse a problem
  const toggleProblem = (problemId) => {
    setExpandedProblemId((prevId) => (prevId === problemId ? null : problemId));
  };

  // Filtered problems based on selected category
  const filteredProblems = selectedCategory
    ? verifiedProblems.filter(
        (problem) => problem.category === selectedCategory
      )
    : verifiedProblems;

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

      {/* Category Filter (Using Only Input Fields) */}
      <div className="flex items-center justify-center my-6">
        <form className="filter">
          <input
            className="btn btn-square"
            type="reset"
            value="×"
            onClick={() => setSelectedCategory("")}
          />

          <input
            className="btn"
            type="radio"
            name="category"
            aria-label="Education"
            onChange={() => setSelectedCategory("Education")}
          />

          <input
            className="btn"
            type="radio"
            name="category"
            aria-label="Healthcare"
            onChange={() => setSelectedCategory("Healthcare")}
          />

          <input
            className="btn"
            type="radio"
            name="category"
            aria-label="Infrastructure"
            onChange={() => setSelectedCategory("Infrastructure")}
          />

          <input
            className="btn"
            type="radio"
            name="category"
            aria-label="Environment"
            onChange={() => setSelectedCategory("Environment")}
          />

          <input
            className="btn"
            type="radio"
            name="category"
            aria-label="Technology"
            onChange={() => setSelectedCategory("Technology")}
          />

          <input
            className="btn"
            type="radio"
            name="category"
            aria-label="Others"
            onChange={() => setSelectedCategory("Others")}
          />
        </form>
      </div>

      <div className="space-y-6 mt-6">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => {
            const isExpanded = expandedProblemId === problem._id;

            return (
              <div
                key={problem._id}
                className={`bg-white shadow-md rounded-lg border border-gray-200 
                transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-[2000px]" : "max-h-[300px]"
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center text-5xl font-bold">
                        {problem?.submittedBy?.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {problem.submittedBy.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Posted:{" "}
                          {new Date(problem.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="category">
                      <div className="tooltip" data-tip="Category">
                        <button className="btn btn-lg btn-dash">
                          {problem.category}
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-2">
                    <strong>Title:</strong> {problem.title}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Description:</strong> {problem.description}
                  </p>
                  <p className="text-gray-500 mt-2">
                    <strong>Address:</strong> {problem.address}
                  </p>
                </div>

                {!isExpanded && (
                  <div className="w-full bg-gradient-to-t from-white to-transparent text-center p-4">
                    <button
                      onClick={() => toggleProblem(problem._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
                    >
                      Show More
                    </button>
                  </div>
                )}

                {/* Expanded Content with animations */}
                <div
                  className={`transition-opacity duration-500 ${
                    isExpanded ? "opacity-100 delay-150" : "opacity-0 h-0"
                  }`}
                >
                  {isExpanded && (
                    <>
                      {problem.images.length > 0 && (
                        <div className="flex space-x-4 mt-4">
                          {problem.images.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Problem ${problem._id} photo ${index + 1}`}
                              className="w-60 h-60 rounded-lg shadow-md"
                            />
                          ))}
                        </div>
                      )}

                      {problem.videos?.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lg font-medium text-gray-700">
                            Videos:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {problem.videos.map((video, index) => (
                              <div
                                key={index}
                                className="overflow-hidden rounded-lg shadow-md"
                              >
                                <video
                                  controls
                                  src={video}
                                  className="w-full h-96 object-cover rounded-lg"
                                ></video>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {problem.documents?.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lg font-medium text-gray-700">
                            Documents:
                          </h4>
                          <div className="grid grid-cols-2 gap-4 w-full h-screen mt-2">
                            {problem.documents.map((doc, index) => (
                              <div
                                key={index}
                                className="w-full h-full border p-2 rounded-md shadow-md"
                              >
                                <h5 className="text-gray-600">
                                  Document {index + 1}
                                </h5>
                                <iframe
                                  src={doc}
                                  className="w-full h-full border rounded-md"
                                  title={`Document ${index + 1}`}
                                ></iframe>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 my-8">
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

                      {/* Show Less Button */}
                      <div className="text-center m-4">
                        <button
                          onClick={() => setExpandedProblemId(null)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
                        >
                          Show Less
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          // No Problems Found Message
          <div className="flex items-center justify-center">
            <div
              role="alert"
              className="alert alert-info text-center w-[80%] mt-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Problem Not Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPostsPage;
