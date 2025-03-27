import React, { useState } from "react";

const ProblemSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    images: [],
    videos: [],
    documents: [],
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateTitle = (title) => {
    const wordCount = title.trim().split(/\s+/).length;
    return wordCount <= 50;
  };

  const validateDescription = (description) => {
    return description.length >= 50 && description.length <= 2000;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);

    // Define the maximum allowed files for each type
    const maxFiles = {
      images: 5,
      videos: 2,
      documents: 5,
    };

    // Check if the total files exceed the limit
    if (formData[type].length + files.length > maxFiles[type]) {
      setErrors((prev) => ({
        ...prev,
        [type]: `You can upload a maximum of ${maxFiles[type]} ${type}.`,
      }));
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      let isValidType = false;
      let isValidSize = file.size <= 10 * 1024 * 1024; // 10MB max

      switch (type) {
        case "images":
          isValidType = file.type.startsWith("image/");
          break;
        case "videos":
          isValidType = file.type.startsWith("video/");
          break;
        case "documents":
          isValidType = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
          ].includes(file.type);
          break;
      }

      if (!isValidType) {
        setErrors((prev) => ({
          ...prev,
          [type]: `Invalid ${type.slice(0, -1)} file type.`,
        }));
      }

      if (!isValidSize) {
        setErrors((prev) => ({
          ...prev,
          [type]: `${type.slice(0, -1)} file must be less than 10MB.`,
        }));
      }

      return isValidType && isValidSize;
    });

    // Update state with valid files
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...validFiles],
    }));
  };

  const handleRemoveFile = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // Render file list component
  const renderFileList = (type, files) => {
    if (files.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between  bg-gray-100 p-2 rounded-md"
          >
            <span className="truncate max-w-[80%]">{file.name}</span>
            <button
              type="button"
              onClick={() => handleRemoveFile(type, index)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Render upload section
  const renderUploadSection = (type, label, accept) => {
    const hiddenFileInputRef = React.useRef(null);

    const handleButtonClick = () => {
      hiddenFileInputRef.current.click();
    };

    return (
      <div>
        <label className="block text-sm font-medium  text-gray-700 mb-2 w-3xl">
          {label}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            ref={hiddenFileInputRef}
            multiple
            accept={accept}
            onChange={(e) => handleFileUpload(e, type)}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Upload {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
          <span className="text-gray-500">
            {formData[type].length} file{formData[type].length !== 1 ? "s" : ""}{" "}
            selected
          </span>
        </div>
        {errors[type] && (
          <p className="mt-1 text-sm text-red-500">{errors[type]}</p>
        )}
        {renderFileList(type, formData[type])}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate title
    if (!formData.title) {
      newErrors.title = "Title is required";
    } else if (!validateTitle(formData.title)) {
      newErrors.title = "Title must not exceed 20 words";
    }

    // Validate description
    if (!formData.description) {
      newErrors.description = "Description is required";
    } else if (!validateDescription(formData.description)) {
      newErrors.description =
        "Description must be between 50 and 2000 characters";
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    // Validate address
    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    // If there are any errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Implement actual submission logic
    console.log("Form submitted:", formData);
    alert("Problem submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Submit a Problem
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Problem Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter a concise problem title (max 50 words)"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Problem Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Describe the problem in detail (50-2000 characters)"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Category Select */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Problem Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.category
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="">Select a category</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="environment">Environment</option>
            <option value="technology">Technology</option>
            <option value="others">Others</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        {/* Address Section */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Problem Location
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter full address including street, city, state, zip code, and country"
          ></textarea>
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        {/* Images Upload */}
        <div>
          {renderUploadSection(
            "images",
            "Problem Images (Optional)",
            "image/*"
          )}
        </div>

        {/* Videos Upload */}
        <div>
          {renderUploadSection(
            "videos",
            "Problem Videos (Optional)",
            "video/*"
          )}
        </div>

        {/* Documents Upload */}
        <div>
          {renderUploadSection(
            "documents",
            "Related Documents (Optional)",
            ".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition font-semibold"
          >
            Submit Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemSubmissionForm;
