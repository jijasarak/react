// src/pages/JavaScript.jsx
import React, { useState, useEffect } from "react";
import jsQuestions from "../data/javascript-questions.json";
import axios from "axios";
import { format } from "date-fns";

function JavaScript({ user }) {
  const [selectedTopic, setSelectedTopic] = useState("Variables");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const [explanation, setExplanation] = useState("");

  const questions = jsQuestions[selectedTopic] || [];
  const currentQuestion = questions[currentIndex];

  const today = format(new Date(), "eeee, MMMM do yyyy");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/motivation", { topic: selectedTopic });
        setQuote(res.data.quote);
      } catch (err) {
        setQuote("🔥 Keep going! Your effort today builds your success tomorrow.");
        console.error(err)
      }
    };

    const fetchExplanation = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/explanation", { topic: selectedTopic });
        setExplanation(res.data.explanation);
      } catch (err) {
        setExplanation("📘 Explanation is currently unavailable. Please try again later.");
        console.error(err)
      }
    };

    setCurrentIndex(0);
    setUserAnswer("");
    setFeedback("");
    fetchQuote();
    fetchExplanation();
  }, [selectedTopic]);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/feedback", {
        question: currentQuestion.question,
        userAnswer,
      });
      setFeedback(res.data.feedback);
    } catch (err) {
      setFeedback("⚠️ Failed to fetch feedback. Please try again.");
      console.error(err);
      
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setUserAnswer("");
    setFeedback("");
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-[#2056A7]">
          Hello {user?.name || "Learner"}, Ready to Master JavaScript?
        </h1>
        <p className="text-sm text-gray-600">{today}</p>
        <blockquote className="text-orange-500 italic mt-2">"{quote}"</blockquote>
      </div>

      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <h2 className="text-xl font-semibold text-[#2056A7] mb-2">Choose a Topic</h2>
        <select
          className="border px-3 py-2 rounded w-full"
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

      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-[#2056A7]">📘 Learn About {selectedTopic}</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line mt-2">{explanation}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <h2 className="text-lg font-semibold text-[#2056A7]">Question {currentIndex + 1} of {questions.length}</h2>
        <p className="text-base text-gray-800 mt-1">{currentQuestion.question}</p>
        <p className="text-xs text-gray-500 mb-4">Difficulty: {currentQuestion.difficulty}</p>

        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4 min-h-[100px]"
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        ></textarea>

        {!feedback ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#2056A7] hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            {loading ? "Evaluating..." : "Submit Answer"}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-100 p-3 rounded-lg border border-green-300 mt-4">
              <p className="text-green-800 whitespace-pre-line">{feedback}</p>
            </div>
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="mt-2 bg-[#FF9800] hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded"
              >
                Next Question
              </button>
            ) : (
              <p className="text-center text-blue-700 font-semibold mt-4">
                🎉 You have completed all questions!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JavaScript;
