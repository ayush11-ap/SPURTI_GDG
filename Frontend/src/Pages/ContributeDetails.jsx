import React from "react";

const ContributeDetails = ({ problem, setShowDetails }) => {
  if (!problem) return null;

  return (
    <div className="relative top-10 flex items-center justify-center">
      <div className="card w-[90%] max-w-2xl bg-base-100 shadow-2xl backdrop-blur-md bg-opacity-80">
        <div className="card-body">
          <h2 className="card-title">
            Thanks for your contribution! Here are the details:
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Title:</span> {problem.title}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {problem.category}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {problem.description}
            </p>

            <div className="card bg-base-200 p-4 space-y-2 rounded-lg mt-4">
              <p className="text-lg font-semibold">User Details:</p>
              <p>
                <span className="font-semibold">Submitted By:</span>{" "}
                {problem.submittedBy?.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {problem.submittedBy?.email}
              </p>
              <p>
                <span className="font-semibold">Mobile Number:</span>{" "}
                {problem.submittedBy?.mobileNo}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {problem.submittedBy?.address}
              </p>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-outline"
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributeDetails;
