import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <nav className="flex justify-between items-center p-3 bg-red-100">
      <div className="flex gap-1">
        <img
          src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072087/rpkukf52d2qhqkblfu8s.jpg"
          alt="Smiling child"
          className="w-5"
        />
        <h1 className="text-xl font-Crimson Pro">स्फूर्ती</h1>
      </div>
      <div className="space-x-4">
        {/* Navigate to Home */}
        <button className="text-black" onClick={() => navigate("/")}>
          Home
        </button>

        {/* Navigate to Problem Posts */}
        <button
          className="text-black"
          onClick={() => navigate("/problem-posts")}
        >
          View Challenges
        </button>

        {/* Redirect to Home and Scroll to Stories */}
        <button
          className="text-black"
          onClick={() => navigate("/", { state: { scrollToStories: true } })}
        >
          Stories
        </button>

        {/* Navigate to Auth Page */}
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => navigate("/auth")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
