import React, { useState } from "react";
import AIQuestionTool from "../components/AIQuestionTool";
import cssQuestions from "../data/css-questions.json";
import "../assets/TopicSelector.css"; // ⬅️ Make sure to create this CSS file

export default function CSS({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("CSS Basics");

  return (
    <div className="css-page-container">
      <div className="topic-selector-wrapper">
        <h1 className="page-heading">
          Hello {user?.name || "Learner"}, what CSS topic do you want to master today?
        </h1>

        <div className="topic-selector">
          <label htmlFor="topic-select">Choose a Topic:</label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {Object.keys(cssQuestions).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AIQuestionTool topic={selectedTopic} questionsData={cssQuestions} />
    </div>
  );
}
