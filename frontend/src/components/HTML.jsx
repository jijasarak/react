import React, { useState } from "react";
import AIQuestionTool from "../components/AIQuestionTool";
import htmlQuestions from "../data/html-questions.json";
import "../assets/TopicSelector.css"; // Ensure this file exists and is applied globally

export default function HTML({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("HTML Basics");

  return (
    <div className="css-page-container">
      <div className="topic-selector-wrapper">
        {/* <h1 className="page-heading">
          Hello {user?.name || "Learner"}, what HTML topic do you want to master today?
        </h1> */}

        <div className="topic-selector">
          <label htmlFor="topic-select">Choose a Topic:</label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {Object.keys(htmlQuestions).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AIQuestionTool topic={selectedTopic} questionsData={htmlQuestions} />
    </div>
  );
}
