import React, { useState } from "react";
import AIQuestionTool from "../components/AIQuestionTool";
import jsQuestions from "../data/javascript-questions.json";
import "../assets/TopicSelector.css"; // Reuse same CSS as other modules

export default function JavaScript({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("variable");

  return (
    <div className="css-page-container">
      <div className="topic-selector-wrapper">
        {/* <h1 className="page-heading">
          Hey {user?.name || "Learner"}, ready to master JavaScript?
        </h1> */}

        <div className="topic-selector">
          <label htmlFor="topic-select">Choose a Topic:</label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {Object.keys(jsQuestions).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AIQuestionTool topic={selectedTopic} questionsData={jsQuestions} />
    </div>
  );
}
