import React, { useState, useEffect } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const ai = new GoogleGenAI({
  apiKey: `${import.meta.env.VITE_GOOGLE_GENAI_API_KEY}`,
});

const AIProblemSolution = ({ setShowAiSolution, problem }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  console.log(problem);

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const prompt = `I have a problem titled "${problem?.title}" in the category "${problem?.category}". The problem is described as: "${problem?.description}". The location of the problem is: "${problem?.address}". Can you suggest practical solutions for this problem, utilizing nearby resources and involving people located in or around the "${problem?.address}" area? Additionally, please provide details of relevant individuals, local organizations, or government authorities in Dehugaon, Pune, or nearby regions—such as contact numbers, names, or offices—that I can reach out to for assistance in addressing this issue. provide the solution in brief with proper contact details of the people or organizations who can help me in solving this problem.`;
        const aiResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  solution: {
                    type: Type.STRING,
                    description: "A brief practical solution for the problem",
                    nullable: false,
                  },
                  contactPerson: {
                    type: Type.STRING,
                    description:
                      "Name of the person or organization who can help",
                  },
                  contactInfo: {
                    type: Type.STRING,
                    description:
                      "Phone number, email or address of the contact",
                  },
                },
                required: ["solution"],
              },
            },
          },
        });
        console.log(
          "AI Response:",
          aiResponse.candidates[0].content.parts[0].text
        );
        setResponse(aiResponse.candidates[0].content.parts[0].text);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setError("Failed to fetch AI response. Please check your API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, [problem]);

  return (
    <div className="border-2 h-[80vh] border-base-300 p-4 rounded-lg overflow-auto">
      {loading ? (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          <div className="flex justify-between items-center text-4xl">
            <h2 className="text-lg font-semibold mb-2">
              SPURTI AI-Generated Solutions:{" "}
            </h2>
            <RxCross2
              onClick={() => {
                setShowAiSolution(false);
              }}
            />
          </div>
          <div className="grid gap-4">
            {response &&
              JSON.parse(response).map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow bg-base-100"
                >
                  <p className="font-semibold text-primary"></p>
                  <p>
                    {" "}
                    <strong>Solution: </strong> {item.solution}
                  </p>
                  {item.contactPerson && (
                    <p className="mt-2">
                      <strong>Contact Person:</strong> {item.contactPerson}
                    </p>
                  )}
                  {item.contactInfo && (
                    <p>
                      <strong>Contact Info:</strong> {item.contactInfo}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProblemSolution;
