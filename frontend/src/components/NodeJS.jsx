import React, { useState } from "react";
import AIQuestionTool from "../components/AIQuestionTool";
import nodeQuestions from "../data/nodejs-questions.json";
import "../assets/TopicSelector.css"; // Import shared CSS

export default function NodeJS({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("Introduction to Node.js");

  return (
    <div className="css-page-container">
      <div className="topic-selector-wrapper">
        {/* <h1 className="page-heading">
          Hello {user?.name || "Learner"}, what Node.js topic do you want to master today?
        </h1> */}

        <div className="topic-selector">
          <label htmlFor="topic-select">Choose a Topic:</label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {Object.keys(nodeQuestions).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AIQuestionTool topic={selectedTopic} questionsData={nodeQuestions} />
    </div>
  );
}
