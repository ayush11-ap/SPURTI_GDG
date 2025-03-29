import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  // Role-specific states
  const [organizationName, setOrganizationName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [focusArea, setFocusArea] = useState("");

  const [expertise, setExpertise] = useState("");

  const [donationPreference, setDonationPreference] = useState("");

  const [skills, setSkills] = useState("");
  const [preferredArea, setPreferredArea] = useState("");

  const navigate = useNavigate();

  const renderRoleSpecificFields = () => {
    switch (role) {
      case "NGO":
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Organization Name"
            />
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Registration Number"
            />
            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Focus Area</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Environment">Environment</option>
              <option value="Child Welfare">Child Welfare</option>
              <option value="Women Empowerment">Women Empowerment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        );

      case "Expert":
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Area of Expertise"
            />
          </div>
        );

      case "Donor":
        return (
          <div className="space-y-4">
            <select
              value={donationPreference}
              onChange={(e) => setDonationPreference(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Donation Preference</option>
              <option value="Monetary">Monetary</option>
              <option value="Resources">Resources</option>
              <option value="Skills">Skills</option>
              <option value="Funds">Funds</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>
        );

      case "volunteer":
      case "Spurti Volunteer":
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Skills"
            />
            <select
              value={preferredArea}
              onChange={(e) => setPreferredArea(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Preferred Area</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Community Development">
                Community Development
              </option>
              <option value="Environmental Conservation">
                Environmental Conservation
              </option>
              <option value="Child Welfare">Child Welfare</option>
              <option value="Other">Other</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      name,
      email,
      mobileNo,
      password,
      address,
      role,
      roleDetails: {
        ...(role === "NGO" && {
          organizationName,
          registrationNumber,
          focusArea,
        }),
        ...(role === "Expert" && { expertise }),
        ...(role === "Donor" && { donationPreference }),
        ...(["volunteer", "Spurti Volunteer"].includes(role) && {
          skills,
          preferredArea,
        }),
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        submissionData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
      <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-lg">SignUp to Spurti</legend>

        <label className="fieldset-label">Name</label>
        <input type="text" className="input w-full" placeholder="Enter Name" />

        <legend className="fieldset-legend">Address</legend>
        <textarea className="textarea h-24 w-full" placeholder="Bio"></textarea>

        <legend onClick={renderRoleSpecificFields} className="fieldset-legend">
          Roles
        </legend>
        <select defaultValue="Pick a browser" className="select w-full">
          <option disabled={true}>Select Your Role</option>
          <option value="Residential">Residential</option>
          <option value="NGO">NGO</option>
          <option value="Expert">Expert</option>
          <option value="Donor">Donor</option>
          <option value="volunteer">Volunteer</option>
        </select>

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
          className="input  w-full"
          placeholder="Password"
        />

        <button onClick={handleSubmit} className="btn btn-neutral mt-4">
          Sign Up
        </button>
        <p className="my-2 text-center text-lg text-gray-600 font-semibold">
          Already Have An Account :{" "}
          <span
            className="cursor-pointer hover:text-gray-100"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </fieldset>
    </div>
  );
};

export default SignUp;
