import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-20">
        <div>
          <h1 className="text-5xl font-bold capitalize">
            “A world where helping hands, collaboration, and compassion drive
            impact.”
          </h1>
          <p className="py-6 w-[78%]">
            A decentralized platform where global experts, NGOs, businesses, and
            volunteers collaborate to tackle real-world social challenges.
          </p>
          <button
            onClick={() => navigate("/submit-problem")}
            className="btn btn-outline mr-4"
          >
            Submit A Challange
          </button>
          <button
            onClick={() => navigate("/problem-posts")}
            className="btn btn-outline"
          >
            Contribute
          </button>
        </div>
        <img
          src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072089/rgmidxvt97rdqrhe7dwt.jpg"
          className="max-w-xl rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default HeroSection;
