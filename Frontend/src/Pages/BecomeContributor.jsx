import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BecomeContributor = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="hero py-12">
      <div className="hero-content flex-col lg:flex-row gap-30">
        <img
          src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072088/rdufphjtdocctcfrwyba.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold capitalize">
            become a contributor, <br /> Drive Real Impact
          </h1>
          <p className="py-6 w-[78%]">
            Want to be part of the solution? Join as an expert, NGO, business,
            volunteer, or donor to help solve real-world challenges. Contribute
            skills, funding, technology, or support to tackle issues like
            education, healthcare, clean water, and employment. Together, we
            create real impact!
          </p>
          <button
            onClick={() => navigate("/problem-posts")}
            className="btn btn-outline btn-wide"
          >
            Contribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeContributor;
