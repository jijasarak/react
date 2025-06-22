// src/pages/English.jsx
import React, { useState } from "react";
import AIQuestionTool from "./AIQuestionTool";
import englishQuestions from "../data/english-questions.json";

export default function English({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("Grammar");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#2056A7]">
        Hello {user?.name || "Learner"}, what English topic do you want to master today?
      </h1>

      <select
        className="border px-3 py-2 rounded mb-6"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {Object.keys(englishQuestions).map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <AIQuestionTool topic={selectedTopic} questionsData={englishQuestions} />
    </div>
  );
}
