import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSubmit, renderRoleSpecificFields } from "../utils/data";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const [organizationName, setOrganizationName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [expertise, setExpertise] = useState("");
  const [donationPreference, setDonationPreference] = useState("");
  const [skills, setSkills] = useState("");
  const [preferredArea, setPreferredArea] = useState("");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
      <fieldset className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-lg">SignUp to Spurti</legend>

        <label className="fieldset-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input w-full"
          placeholder="Enter Name"
        />

        <label className="fieldset-label">Mobile No.</label>
        <input
          type="text"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          className="input w-full"
          placeholder="Enter Mobile No."
        />

        <label className="fieldset-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
          placeholder="Email"
        />

        <legend className="fieldset-legend">Address</legend>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="textarea h-24 w-full"
          placeholder="Bio"
        ></textarea>

        <legend className="fieldset-legend">Roles</legend>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select w-full"
        >
          <option disabled={true}>Select Your Role</option>
          <option value="Residential">Residential</option>
          <option value="NGO">NGO</option>
          <option value="Expert">Expert</option>
          <option value="Donor">Donor</option>
          <option value="volunteer">Volunteer</option>
        </select>
        {renderRoleSpecificFields(
          role,
          setOrganizationName,
          setRegistrationNumber,
          setFocusArea,
          setExpertise,
          setDonationPreference,
          setSkills,
          setPreferredArea
        )}

        <label className="fieldset-label mt-2">Password : {password}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input  w-full"
          placeholder="Password"
        />

        <button
          onClick={(e) =>
            handleSubmit(
              e,
              name,
              mobileNo,
              email,
              password,
              address,
              role,
              organizationName,
              registrationNumber,
              focusArea,
              expertise,
              donationPreference,
              skills,
              preferredArea,
              navigate
            )
          }
          className="btn btn-neutral mt-4"
        >
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
