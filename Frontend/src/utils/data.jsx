export const renderRoleSpecificFields = (
  role,
  setOrganizationName,
  setRegistrationNumber,
  setFocusArea,
  setExpertise,
  setDonationPreference,
  setSkills,
  setPreferredArea
) => {
  switch (role) {
    case "NGO":
      return (
        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => setOrganizationName(e.target.value)}
            className="input w-full"
            placeholder="Organization Name"
          />
          <input
            type="text"
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="input w-full"
            placeholder="Registration Number"
          />
          <select
            onChange={(e) => setFocusArea(e.target.value)}
            className="select w-full"
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
            onChange={(e) => setExpertise(e.target.value)}
            className="input w-full"
            placeholder="Area of Expertise"
          />
        </div>
      );
    case "Donor":
      return (
        <div className="space-y-4">
          <select
            onChange={(e) => setDonationPreference(e.target.value)}
            className="select w-full"
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
            onChange={(e) => setSkills(e.target.value)}
            className="input w-full"
            placeholder="Skills"
          />
          <select
            onChange={(e) => setPreferredArea(e.target.value)}
            className="select w-full"
          >
            <option value="">Select Preferred Area</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Community Development">Community Development</option>
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

export const handleSubmit = async (
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
) => {
  e.preventDefault();
  const submissionData = {
    name,
    mobileNo,
    email,
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
