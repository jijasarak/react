import React, { useState } from "react";
import AIQuestionTool from "../components/AIQuestionTool";
import reactQuestions from "../data/react-questions.json";
import "../assets/TopicSelector.css"; // Ensure this is imported for consistent styling

export default function ReactPage({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("React Basics");

  return (
    <div className="css-page-container">
      <div className="topic-selector-wrapper">
        {/* <h1 className="page-heading">
          Hello {user?.name || "Learner"}, what React topic do you want to master today?
        </h1> */}

        <div className="topic-selector">
          <label htmlFor="topic-select">Choose a Topic:</label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {Object.keys(reactQuestions).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AIQuestionTool topic={selectedTopic} questionsData={reactQuestions} />
    </div>
  );
}
