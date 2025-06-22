import React, { useState } from "react";
import AIQuestionTool from "../components/AIQuestionTool";
import reactQuestions from "../data/react-questions.json";

export default function ReactPage({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("JSX");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#2056A7]">
        Hey {user?.name || "Learner"}, ready to master React?
      </h1>

      <select
        className="border px-3 py-2 rounded mb-6"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {Object.keys(reactQuestions).map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <AIQuestionTool topic={selectedTopic} questionsData={reactQuestions} />
    </div>
  );
}
