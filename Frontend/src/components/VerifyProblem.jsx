import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addProblems } from "../utils/problemSlice";

const VerifyProblem = () => {
  const dispatch = useDispatch();

  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/verify/allProblems`,
        {
          withCredentials: true,
        }
      );
      const fetchedProblems = response.data.problems;
      console.log(fetchedProblems);

      dispatch(addProblems(fetchedProblems));
      setProblems(fetchedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  const updateProblemStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/verify/updateStatus`,
        { problemId: id, status },
        { withCredentials: true }
      );
      console.log(response.data.message);

      setProblems((prevProblems) =>
        prevProblems.map((problem) =>
          problem._id === id
            ? {
                ...problem,
                verificationStatus: status,
                verified: status === "approved",
              }
            : problem
        )
      );
    } catch (error) {
      console.error("Error updating problem status:", error);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Verify Problems</h1>
      <button onClick={fetchProblems} className="btn btn-dash btn-primary mb-4">
        Fetch Problems
      </button>

      <div className="space-y-6">
        {problems.length === 0 ? (
          <p className="text-center text-gray-500">No problems found.</p>
        ) : (
          problems.map((problem) =>
            problem.verified ? (
              <div
                key={problem._id}
                className="bg-white p-4 rounded-xl shadow-md"
              >
                <h2 className="text-lg font-semibold">{problem.title}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{" "}
                  <p className="text-lg font-semibold inline text-green-900">
                    {problem.verificationStatus}
                  </p>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Posted On:</strong>{" "}
                  {new Date(problem.createdAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <div
                key={problem._id}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h2 className="text-xl font-semibold">
                  Title: {problem.title}
                </h2>
                <p className="text-gray-700 mt-2">
                  Description: {problem.description}
                </p>

                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <strong>Category:</strong> {problem.category}
                  </p>
                  <p>
                    <strong>Address:</strong> {problem.address}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <p className="text-lg font-semibold inline text-red-900">
                      {problem.verificationStatus}
                    </p>
                  </p>
                  <p>
                    <strong>Submitted By:</strong> {problem.submittedBy.name} (
                    {problem.submittedBy.email})
                  </p>
                </div>

                {/* Images */}
                {problem.images.length > 0 && (
                  <div className="flex space-x-4 mt-4">
                    {problem.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Problem"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {/* Videos */}
                {problem.videos.length > 0 && (
                  <div className="flex space-x-4 mt-4">
                    {problem.videos.map((video, index) => (
                      <video
                        key={index}
                        controls
                        className="w-64 h-36 rounded-lg"
                      >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ))}
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

                {problem.verificationStatus === "rejected" ? (
                  ""
                ) : (
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() =>
                        updateProblemStatus(problem._id, "approved")
                      }
                      className="btn btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateProblemStatus(problem._id, "rejected")
                      }
                      className="btn btn-error"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default VerifyProblem;
