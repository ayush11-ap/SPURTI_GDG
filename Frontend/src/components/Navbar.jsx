import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({}); // Simulate user object when logged in
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`
      );
      if (response.status === 200) {
        localStorage.removeItem("token"); // Clear token from localStorage
        setUser(null); // Reset user state
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1 flex gap-1">
          <img
            src="https://res.cloudinary.com/dfl3qkx31/image/upload/v1743072087/rpkukf52d2qhqkblfu8s.jpg"
            alt="Smiling child"
            className="w-5"
          />
          <h1 className="text-xl font-Crimson Pro">स्फूर्ती</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center gap-4 mr-2 cursor-pointer text-xl">
            <h1 onClick={() => navigate("/")}>Home</h1>
            {/* <a href="#stories">Stories</a> */}
            <h1 onClick={() => navigate("/submit-problem")}>
              Submit Challenge
            </h1>
            <h1 onClick={() => navigate("/problem-posts")}>Challenges</h1>
            <h1 onClick={() => navigate("/problem-posts")}>Contribute</h1>
          </div>
          {/* Authentication UI */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user.profilePicture ||
                      "https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
