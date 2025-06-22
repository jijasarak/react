import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { format } from "date-fns";

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
        const response = await axios.post("http://localhost:5000/api/motivation", { topic });
        setQuote(response.data.quote || "Stay focused and keep going! 🚀");
      } catch {
        setQuote("Stay focused and keep going! 🚀");
      }
    };

    const fetchExplanation = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/explanation", { topic });
        setExplanation(response.data.explanation || "Explanation not available right now.");
      } catch {
        setExplanation("Explanation not available right now.");
      }
    };

    fetchQuote();
    fetchExplanation();
  }, [topic]);

  const handleSubmit = async () => {
    if (!userAnswer.trim() || !currentQuestion) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/feedback", {
        question: currentQuestion.question,
        userAnswer,
      });
      setFeedback(response.data.feedback || "Feedback not available.");
    } catch {
      setFeedback("Something went wrong. Please try again.");
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
      <div className="text-red-600">
        ⚠️ No questions available for topic: <strong>{topic}</strong>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-[#2056A7]">Welcome to {topic} AI Practice</h1>
        <p className="text-sm text-gray-600">{today}</p>
        <blockquote className="text-orange-500 italic mt-2">"{quote}"</blockquote>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">📘 Learn about {topic}</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm bg-gray-50 p-3 rounded-lg border">
            {explanation}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p className="text-gray-800 text-base">{currentQuestion.question}</p>
          <p className="text-sm text-gray-500">Difficulty: {currentQuestion.difficulty}</p>

          <Textarea
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full min-h-[120px]"
          />

          {!feedback ? (
            <Button onClick={handleSubmit} disabled={loading} className="bg-[#2056A7] text-white">
              {loading ? "Evaluating..." : "Submit Answer"}
            </Button>
          ) : (
            <div className="space-y-4">
              <Card className="bg-green-50">
                <CardContent>
                  <p className="text-green-700 font-medium whitespace-pre-line">{feedback}</p>
                </CardContent>
              </Card>
              {currentIndex < questions.length - 1 ? (
                <Button onClick={handleNext}>Next Question</Button>
              ) : (
                <p className="text-blue-700 font-semibold">🎉 You have completed all questions!</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
