import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProblems } from "../utils/problemSlice";
import { useGSAP } from "@gsap/react";
import AIProblemSolution from "./AIProblemSolution";
import { gsap } from "gsap";

const ProblemSubmissionForm = () => {
  const [title, setTitle] = useState("Overcrowding During Religious Events");
  const [description, setDescription] = useState(
    "As a pilgrimage site due to the Sant Tukaram Gatha Mandir, Dehugaon sees a massive influx of visitors during festivals and events. This strains local infrastructure—roads, sanitation, and accommodation—leading to overcrowding, traffic jams, and temporary disruptions in daily life for residents."
  );
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState(
    "Sant Tukaram Vaikunth Mandir, Dehugaon, Pune, Maharashtra 412109"
  );
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});
  const aiSolutionRef = useRef(null);
  const [showAiSolution, setShowAiSolution] = useState(false); // New state
  const [submittedProblem, setSubmittedProblem] = useState(null);

  const dispatch = useDispatch();

  const fileInputRefs = {
    images: useRef(null),
    videos: useRef(null),
    documents: useRef(null),
  };

  const maxFiles = { images: 5, videos: 2, documents: 5 };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length + eval(type).length > maxFiles[type]) {
      setErrors((prev) => ({
        ...prev,
        [type]: `Max ${maxFiles[type]} files allowed.`,
      }));
      return;
    }

    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);
    eval(`set${type.charAt(0).toUpperCase() + type.slice(1)}`)((prev) => [
      ...prev,
      ...validFiles,
    ]);
  };

  const handleRemoveFile = (type, index) => {
    eval(`set${type.charAt(0).toUpperCase() + type.slice(1)}`)((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleProblemSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("address", address);

    images.forEach((image) => formData.append("images", image));
    videos.forEach((video) => formData.append("videos", video));
    documents.forEach((document) => formData.append("documents", document));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/problem/submit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      // setSubmittedProblem(response.data);
      // console.log("Problem submitted2:", response.data.problem);
      setSubmittedProblem(response.data.problem);
      if (response.status === 201) {
        // alert("Problem submitted successfully!");
        const data = response.data.data;
        dispatch(addProblems(data));
        // Reset form fields
        setTitle("");
        setDescription("");
        setCategory("");
        setAddress("");
        setImages([]);
        setVideos([]);
        setDocuments([]);
        setErrors({});
        setShowAiSolution(true); // Show AI solution after successful submission
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useGSAP(
    function () {
      if (showAiSolution) {
        gsap.to(aiSolutionRef.current, {
          transform: "translateY(0)",
          duration: 0.5, // Duration for showing
        });
      } else {
        gsap.to(aiSolutionRef.current, {
          transform: "translateY(100%)",
          duration: 0.5, // Duration for hiding
        });
      }
    },
    [showAiSolution] // Updated dependency
  );

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-md rounded-lg">
        <fieldset className="fieldset border border-base-300 p-6 rounded-box">
          <legend className="fieldset-legend text-lg font-semibold">
            Submit A Problem
          </legend>

          {/* Title */}
          <div>
            <legend className="fieldset-legend">Problem Title</legend>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter problem title"
            />
          </div>

          {/* Description */}
          <div>
            <legend className="fieldset-legend">Problem Description</legend>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full h-24"
              placeholder="Describe the issue"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <legend className="fieldset-legend">Problem Category</legend>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select a category
              </option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Infrastructure</option>
              <option>Environment</option>
              <option>Technology</option>
              <option>Others</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <legend className="fieldset-legend">Problem Location</legend>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Enter full address"
            ></textarea>
          </div>

          {/* File Uploads */}
          {["images", "videos", "documents"].map((type) => (
            <fieldset
              key={type}
              className="fieldset border border-base-300 p-4 rounded-box mt-4"
            >
              <legend className="fieldset-legend capitalize">
                Upload {type}
              </legend>
              <input
                type="file"
                ref={fileInputRefs[type]}
                multiple
                onChange={(e) => handleFileUpload(e, type)}
                className="file-input file-input-bordered w-full"
              />
              <label className="fieldset-label">
                Max size 10MB, {maxFiles[type]} files allowed{" "}
                {type === "documents" && "(PDF only)"}
              </label>
              {errors[type] && (
                <p className="text-error text-sm mt-1">{errors[type]}</p>
              )}
              <div className="mt-2 space-y-2 flex flex-col items-center ">
                {eval(type).map((file, index) => (
                  <div
                    key={index}
                    className="w-1/2 rounded-xl border-neutral border-[1px] bg-base-100 p-2 flex justify-between items-center"
                  >
                    <span className="truncate max-w-[80%] inline-block">
                      {file.name}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(type, index)}
                      className="btn btn-error btn-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>
          ))}

          {/* Submit Button */}
          <div className="mt-4">
            <button
              onClick={handleProblemSubmit}
              className="btn btn-neutral w-full"
            >
              Submit Problem
            </button>
          </div>
        </fieldset>
      </div>
      {showAiSolution && (
        <div
          ref={aiSolutionRef}
          className="fixed w-full translate-y-full z-10 bg-white/60 backdrop-blur-3xl bottom-0 px-8 py-8"
        >
          <span className="font-light italic">
            Your problem has been submitted successfully! While your problem is
            being verified, you can continue with the solution provided below.
          </span>
          <AIProblemSolution
            setShowAiSolution={setShowAiSolution}
            problem={submittedProblem}
          />
        </div>
      )}
    </>
  );
};

export default ProblemSubmissionForm;
