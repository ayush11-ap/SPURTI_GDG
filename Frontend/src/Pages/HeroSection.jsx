// HeroSection.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <section className="p-10 flex flex-col md:flex-row items-center gap-44">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold">
          “A world where helping hands, collaboration, and compassion drive
          impact.”
        </h2>
        <p className="mt-4">
          A decentralized platform where global experts, NGOs, businesses, and
          volunteers collaborate to tackle real-world social challenges.
        </p>
        <div className="mt-4 space-x-4">
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => navigate("/submit-problem")}
          >
            Submit a Challenge
          </button>
          <button
            className="border border-black px-4 py-2 rounded"
            onClick={() => navigate("/problem-posts")}
          >
            Contribute
          </button>
        </div>
      </div>
      <div className="flex justify-end md:w-2/5 mt-4 md:mt-0">
        <img
          src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072089/rgmidxvt97rdqrhe7dwt.jpg"
          alt="Smiling child"
          className="rounded-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
