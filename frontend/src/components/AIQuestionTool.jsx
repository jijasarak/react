import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import "../assets/AIQuestionTool.css";

export default function AIQuestionTool({ topic, questionsData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const [explanation, setExplanation] = useState("");

  const questions = questionsData?.[topic] || [];
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!topic) return;

    setCurrentIndex(0);
    setUserAnswer("");
    setFeedback("");

    const fetchQuote = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/motivation", { topic });
        setQuote(res.data.quote || "Stay focused and keep going! 🚀");
      } catch {
        setQuote("Stay focused and keep going! 🚀");
      }
    };

    const fetchExplanation = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/explanation", { topic });
        setExplanation(res.data.explanation || "Explanation not available.");
      } catch {
        setExplanation("Explanation not available.");
      }
    };

    fetchQuote();
    fetchExplanation();
  }, [topic]);

  const handleSubmit = async () => {
    if (!userAnswer.trim() || !currentQuestion) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/feedback", {
        question: currentQuestion.question,
        userAnswer,
      });
      setFeedback(res.data.feedback || "No feedback available.");
    } catch {
      setFeedback("Error retrieving feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setUserAnswer("");
    setFeedback("");
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const today = format(new Date(), "eeee, MMMM do yyyy");

  if (!questions.length || !currentQuestion) {
    return (
      <div className="ai-container">
        <p className="ai-question">
          ⚠️ No questions available for topic: <strong>{topic}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="ai-container">
      <div className="ai-header">
        <h1>Welcome to {topic} AI Practice</h1>
        <p>{today}</p>
        <blockquote>"{quote}"</blockquote>
      </div>

      <div className="ai-card">
        <h2 className="ai-question-title">📘 Learn about {topic}</h2>
        <div className="ai-markdown">
          <ReactMarkdown>{explanation}</ReactMarkdown>
        </div>
      </div>

      <div className="ai-card">
        <h2 className="ai-question-title">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <p className="ai-question">{currentQuestion.question}</p>
        <p className="ai-meta">Difficulty: {currentQuestion.difficulty}</p>

        <textarea
          className="ai-textarea"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />

        {!feedback ? (
          <button className="ai-button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Evaluating..." : "Submit Answer"}
          </button>
        ) : (
          <div>
            <div className="ai-feedback ai-markdown">
              <ReactMarkdown>{feedback}</ReactMarkdown>
            </div>
            {currentIndex < questions.length - 1 ? (
              <button className="ai-button" onClick={handleNext}>Next Question</button>
            ) : (
              <p className="ai-meta" style={{ marginTop: "1rem", color: "#2056A7" }}>
                🎉 You’ve completed all questions!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}