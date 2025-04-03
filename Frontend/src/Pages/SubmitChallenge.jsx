import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SubmitChallenge = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="hero py-12">
      <div className="hero-content flex-col lg:flex-row gap-30">
        <div>
          <h1 className="text-5xl font-bold">Submit a Challenge</h1>
          <p className="py-6">
            Facing issues like unsafe water, poor healthcare, education gaps, or
            child labor? Raise your voice! Submit a challenge and connect with
            experts, NGOs, businesses, and volunteers to create real
            solutions—policy changes, tech innovations, infrastructure projects,
            and more
          </p>
          <button
            onClick={() => navigate("/submit-problem")}
            className="btn btn-outline  btn-wide"
          >
            Submit a Challenge
          </button>
        </div>
        <img
          src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072093/s8cjinejykdgnuadvcem.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default SubmitChallenge;
