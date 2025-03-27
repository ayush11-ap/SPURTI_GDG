import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    address: "",
    role: "",
    // Role-specific details
    ngoDetails: {
      organizationName: "",
      focusArea: "",
    },
    expertDetails: {
      expertise: "",
    },
    donorDetails: {
      donationPreference: "",
    },
    volunteerDetails: {
      skills: "",
      preferredArea: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested form data for role-specific details
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "NGO":
        return (
          <div className="space-y-4 ">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                name="ngoDetails.organizationName"
                value={formData.ngoDetails.organizationName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                name="ngoDetails.registrationNumber"
                value={formData.ngoDetails.registrationNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter registration number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Focus Area
              </label>
              <select
                name="ngoDetails.focusArea"
                value={formData.ngoDetails.focusArea}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
          </div>
        );

      case "Expert":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Area of Expertise
              </label>
              <input
                type="text"
                name="expertDetails.expertise"
                value={formData.expertDetails.expertise}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your area of expertise"
              />
            </div>
          </div>
        );

      case "Donor":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Donation Preference
              </label>
              <select
                name="donorDetails.donationPreference"
                value={formData.donorDetails.donationPreference}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Donation Preference</option>
                <option value="Monetary">Monetary</option>
                <option value="Resources">Resources</option>
                <option value="Skills">Skills</option>
                <option value="Funds">Funds</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
          </div>
        );

      case "volunteer":
      case "Spurti Volunteer":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                type="text"
                name="volunteerDetails.skills"
                value={formData.volunteerDetails.skills}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="List your key skills"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Area of Contribution
              </label>
              <select
                name="volunteerDetails.preferredArea"
                value={formData.volunteerDetails.preferredArea}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
                <option value="Child Welfare">Other</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare submission data
    const submissionData = {
      ...formData,
      ...(formData.role === "NGO" && { ngoDetails: formData.ngoDetails }),
      ...(formData.role === "Expert" && {
        expertDetails: formData.expertDetails,
      }),
      ...(formData.role === "Donor" && { donorDetails: formData.donorDetails }),
      ...(["volunteer", "Spurti Volunteer"].includes(formData.role) && {
        volunteerDetails: formData.volunteerDetails,
      }),
    };

    try {
      const endpoint = isLogin ? "/api/login" : "/api/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Login to Spurti" : "Sign Up for Spurti"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              {/* Basic Fields */}
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Mobile Number"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Address"
                  required
                />

                {/* Role Selection */}
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Select Your Role</option>
                  <option value="Residential">Residential</option>
                  <option value="NGO">NGO</option>
                  <option value="Expert">Expert</option>
                  <option value="Donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>

              {/* Role-Specific Fields */}
              {formData.role && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    {formData.role} Specific Details
                  </h3>
                  {renderRoleSpecificFields()}
                </div>
              )}
            </>
          )}

          {/* Common Login Fields */}
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Toggle Between Login/Signup */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              {isLogin
                ? "Need an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
