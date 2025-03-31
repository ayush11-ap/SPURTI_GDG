import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data);

        const data = response.data.data;
        localStorage.setItem("token", data.token);
        dispatch(addUser(data));
        navigate("/");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
      <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-lg">Login to Spurti</legend>

        <label className="fieldset-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
          placeholder="Email"
        />

        <label className="fieldset-label mt-2">Password : {password}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full"
          placeholder="Password"
        />

        <button onClick={handleSubmit} className="btn btn-neutral mt-4">
          Login
        </button>
        <p className="my-2 text-center text-lg text-gray-600 font-semibold">
          Don't Have Account :{" "}
          <span
            className="cursor-pointer hover:text-gray-100"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </span>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
