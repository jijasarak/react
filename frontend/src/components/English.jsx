import React, { useState } from "react";
import AIQuestionTool from "../components/AIQuestionTool";
import englishQuestions from "../data/english-questions.json";
import "../assets/TopicSelector.css"; // Make sure this CSS exists

export default function English({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("nouns_verbs");

  return (
    <div className="css-page-container">
      <div className="topic-selector-wrapper">
        {/* <h1 className="page-heading">
          Hello {user?.name || "Learner"}, what English topic do you want to master today?
        </h1> */}

        <div className="topic-selector">
          <label htmlFor="topic-select">Choose a Topic:</label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {Object.keys(englishQuestions).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AIQuestionTool topic={selectedTopic} questionsData={englishQuestions} />
    </div>
  );
}
