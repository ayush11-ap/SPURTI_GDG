// SubmitChallenge.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SubmitChallenge = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <section className="p-10 flex flex-col md:flex-row items-center gap-44">
      <div className="md:w-1/2">
        <h2 className="text-5xl font-bold">Submit a Challenge</h2>
        <p className="mt-4">
          Facing issues like unsafe water, poor healthcare, education gaps, or
          child labor? Raise your voice! Submit a challenge and connect with
          experts, NGOs, businesses, and volunteers to create real
          solutions—policy changes, tech innovations, infrastructure projects,
          and more.
        </p>
        <div className="mt-4 space-x-4">
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => navigate("/submit-problem")} // Use navigate to go to /submit-problem
          >
            Submit a Challenge
          </button>
        </div>
      </div>
      <div className="flex justify-end md:w-2/5 mt-4 md:mt-0">
        <img
          src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072093/s8cjinejykdgnuadvcem.jpg"
          alt="Smiling child"
          className="rounded-lg"
        />
      </div>
    </section>
  );
};

export default SubmitChallenge;
