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

  const handleUpvote = async (problemId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/problem/upvote/${problemId}`,
        {},
        { withCredentials: true }
      );

      // Update the UI with the new votes
      setVerifiedProblems((prevProblems) =>
        prevProblems.map((p) =>
          p._id === problemId ? { ...p, votes: response.data.votes } : p
        )
      );
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const toggleProblem = (problemId) => {
    setExpandedProblemId((prevId) => (prevId === problemId ? null : problemId));
  };

  const filteredProblems = selectedCategory
    ? verifiedProblems.filter(
        (problem) => problem.category === selectedCategory
      )
    : verifiedProblems;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="sticky top-16 bg-gray-100 z-10 p-3 flex justify-between shadow-md">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => navigate("/submit-problem")}
        >
          Submit a Challenge
        </button>
      </header>

      {/* Category Filter */}
      <section className="flex items-center justify-center my-6">
        <form className="filter flex space-x-2">
          {[
            "Education",
            "Healthcare",
            "Infrastructure",
            "Environment",
            "Technology",
            "Others",
          ].map((category) => (
            <input
              key={category}
              className="btn"
              type="radio"
              name="category"
              aria-label={category}
              onChange={() => setSelectedCategory(category)}
            />
          ))}
          <input
            className="btn btn-square"
            type="reset"
            value="×"
            onClick={() => setSelectedCategory("")}
          />
        </form>
      </section>

      {/* language change */}
      <div className="flex justify-center my-4">
        <select
          // onChange={handleLanguageChange}
          // value={selectedLanguage}
          className="p-2 border rounded"
        >
          <option value="">Select Language</option>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="bn">Bengali</option>
          <option value="te">Telugu</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
          <option value="gu">Gujarati</option>
          <option value="ur">Urdu</option>
          <option value="kn">Kannada</option>
          <option value="or">Odia</option>
          <option value="pa">Punjabi</option>
          <option value="ml">Malayalam</option>
          <option value="as">Assamese</option>
          <option value="mai">Maithili</option>
        </select>
      </div>

      {/* Problems List */}
      <main className="space-y-6 mt-6">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <article
              key={problem._id}
              className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden"
            >
              {/* Problem Header */}
              <div className="p-6 flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center text-5xl font-bold">
                    {problem?.submittedBy?.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      {problem.submittedBy.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Posted: {new Date(problem.createdAt).toLocaleDateString()}
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

              {/* Problem Details */}
              <div className="p-6">
                <p className="text-gray-600">
                  <strong>Title:</strong> {problem.title}
                </p>
                <p className="text-gray-600">
                  <strong>Description:</strong> {problem.description}
                </p>
                <p className="text-gray-500">
                  <strong>Address:</strong> {problem.address}
                </p>
              </div>

              {/* Expandable Section */}
              {expandedProblemId === problem._id ? (
                <div className="p-6">
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

                  {problem.videos.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-medium text-gray-700">
                        Videos:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {problem.videos.map((video, index) => (
                          <video
                            key={index}
                            controls
                            src={video}
                            className="w-full h-96 object-cover rounded-lg"
                          ></video>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 my-8">
                    <button
                      onClick={() => handleUpvote(problem._id)}
                      className={`px-4 py-2 rounded transition ${
                        problem.upvotedUsers.includes(verifiedProblems._id)
                          ? "bg-red-500 text-white" // If user already upvoted, show as active
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {problem.upvotedUsers.includes(verifiedProblems._id)
                        ? "Upvoted"
                        : "Upvote"}{" "}
                      ({problem.votes})
                    </button>

                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                      Contribute
                    </button>
                  </div>

                  <div className="text-center m-4">
                    <button
                      onClick={() => setExpandedProblemId(null)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Show Less
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-gradient-to-t from-white to-transparent text-center p-4">
                  <button
                    onClick={() => toggleProblem(problem._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Show More
                  </button>
                </div>
              )}
            </article>
          ))
        ) : (
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
      </main>
    </div>
  );
};

export default ProblemPostsPage;
