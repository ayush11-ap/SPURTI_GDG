import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProblemPostsPage = () => {
  const [verifiedProblems, setVerifiedProblems] = useState([]);
  // const [expandedProblemId, setExpandedProblemId] = useState(null);
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

  // const toggleProblem = (problemId) => {
  //   setExpandedProblemId((prevId) => (prevId === problemId ? null : problemId));
  // };

  const filteredProblems = selectedCategory
    ? verifiedProblems.filter(
        (problem) => problem.category === selectedCategory
      )
    : verifiedProblems;

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* Header */}
      <header className="sticky border-[1px] rounded-lg top-16 bg-gray-100 z-10 p-3 flex justify-between shadow-md">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <button
          className="bg-neutral text-white px-4 py-2 rounded"
          onClick={() => navigate("/submit-problem")}
        >
          Submit a Challenge
        </button>
      </header>

      <div className="flex items-center justify-center gap-4">
        <div className="left-panel w-[60%] p-2">
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

          {/* Problems List */}
          <main className="space-y-6 mt-6">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <article
                  key={problem._id}
                  className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden"
                >
                  {/* Problem Header */}
                  <div className="px-4 flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <div className="bg-base-200 border-2 border-base-300 rounded-full text-neutral w-14 h-14 flex items-center justify-center text-5xl font-bold">
                        {problem?.submittedBy?.name.charAt(0)}
                      </div>
                      <div className="ml-3">
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
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip="Category"
                      >
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
                  {/* {expandedProblemId === problem._id ? ( */}
                  <div className="p-6">
                    {problem.images.length > 0 && (
                      <div className="relative w-full max-w-lg">
                        {/* Carousel Container */}
                        <div
                          ref={carouselRef}
                          className="flex w-[55vw] overflow-x-scroll scroll-smooth space-x-4 p-4 border-2 rounded-box scrollbar-hide"
                        >
                          {problem.images.map((photo, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 w-60 h-50"
                            >
                              <img
                                src={photo}
                                alt={`Problem ${problem._id} photo ${index + 1}`}
                                className="rounded-lg border-2 border-black w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {problem.videos.map((video, index) => (
                            <div
                              key={problem.images.length + index}
                              className="flex-shrink-0 w-60 h-50"
                            >
                              <video
                                controls
                                src={video}
                                className="rounded-lg border-2 border-black w-full h-full"
                              ></video>
                            </div>
                          ))}
                        </div>

                        {/* Navigation Buttons */}
                        {problem.images.length + problem.videos.length >= 4 && (
                          <div className="absolute w-[55vw] left-0 right-0 top-1/2 flex justify-between -translate-y-1/2 px-4">
                            <button
                              onClick={scrollLeft}
                              className="btn btn-circle opacity-80 bg-gray-800 text-white hover:bg-gray-600"
                            >
                              ❮
                            </button>
                            <button
                              onClick={scrollRight}
                              className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600"
                            >
                              ❯
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {problem.documents?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-medium text-gray-700">
                          Documents:
                        </h4>
                        <div className="flex items-center justify-evenly w-full mt-2">
                          {problem.documents.map((doc, index) => (
                            <a
                              key={index}
                              href={doc}
                              target="_blank"
                              download
                              className=" btn btn-dash cursor-pointer font-medium"
                            >
                              Document {index + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-4 my-8">
                      <button
                        onClick={() => handleUpvote(problem._id)}
                        className={`btn btn-outline`}
                      >
                        {problem.upvotedUsers.includes(verifiedProblems._id)
                          ? "Upvoted"
                          : "Upvote"}{" "}
                        ({problem.votes})
                      </button>

                      <button className="btn btn-outline"> Contribute</button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <div
                  role="alert"
                  className="alert alert-error text-center w-[80%] mt-6"
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
      </div>
    </div>
  );
};

export default ProblemPostsPage;
