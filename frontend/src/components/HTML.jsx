import React, { useState } from "react";
import AIQuestionTool from "./AIQuestionTool";
import htmlQuestions from "../data/html-questions.json";

export default function HTML({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("Elements");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#2056A7]">
        Hello {user?.name || "Learner"}, what HTML topic do you want to master today?
      </h1>

      <select
        className="border px-3 py-2 rounded mb-6"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {Object.keys(htmlQuestions).map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <AIQuestionTool topic={selectedTopic} questionsData={htmlQuestions} />
    </div>
  );
}
