import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import QuestionCard from "@/components/QuestionCard";
import { questions, topics } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";

const Retry = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const [answer, setAnswer] = useState("");

  const topic = topics.find((t) => t.id === topicId);
  const topicQuestions = questions.filter((q) => q.topicId === topicId);
  // Use second question for retry, or wrap around
  const retryQuestion = topicQuestions[1] || topicQuestions[0];

  const handleSubmit = () => {
    if (answer.trim()) {
      // In a real app, this would evaluate and potentially show another explanation
      // For demo, we'll go to progress
      navigate("/progress");
    }
  };

  if (!topic || !retryQuestion) {
    return (
      <div className="min-h-screen bg-gradient-sunrise-subtle flex items-center justify-center">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sunrise-subtle">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/topics")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="text-right">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-button bg-accent text-accent-foreground">
              Retry Attempt
            </span>
          </div>
        </div>

        {/* Encouragement */}
        <div className="mb-6 animate-fade-in">
          <p className="text-muted-foreground text-sm">
            Let's check your understanding with a related question.
          </p>
        </div>

        {/* Question Card */}
        <div className="mb-8 animate-fade-in-up">
          <QuestionCard
            concept={retryQuestion.concept}
            question={retryQuestion.question}
          />
        </div>

        {/* Answer Input */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <label className="block text-sm font-medium text-foreground">
            Your answer
          </label>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[140px] rounded-card border-border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="h-12 px-8 rounded-button text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Submit Answer
          </Button>
        </div>

        {/* Skip Option */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/progress")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Retry;
