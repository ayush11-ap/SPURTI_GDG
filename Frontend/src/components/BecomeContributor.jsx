// BecomeContributor.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BecomeContributor = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <section className="p-10 flex flex-col md:flex-row items-center gap-44">
      <div className="flex justify-start md:w-2/5 mt-4 md:mt-0">
        <img
          src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072088/rdufphjtdocctcfrwyba.jpg"
          alt="Smiling child"
          className="rounded-lg"
        />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-5xl font-bold">
          Become a Contributor: Drive Real Impact
        </h2>
        <p className="mt-4">
          Want to be part of the solution? Join as an expert, NGO, business,
          volunteer, or donor to help solve real-world challenges. Contribute
          skills, funding, technology, or support to tackle issues like
          education, healthcare, clean water, and employment. Together, we
          create real impact!
        </p>
        <div className="mt-4 space-x-4">
          <button
            className="border border-black px-4 py-2 rounded"
            onClick={() => navigate("/problem-posts")} // Use navigate to go to /problem-posts
          >
            Helping Hand
          </button>
        </div>
      </div>
    </section>
  );
};

export default BecomeContributor;

// filepath: c:\Users\Ram\Desktop\Spurti\Frontend\src\App.jsx
