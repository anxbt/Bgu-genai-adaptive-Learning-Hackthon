import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { tutorAPI, type AttemptRequest } from "@/lib/tutorAPI";

interface Question {
  id: string;
  question: string;
  expectedConcept: string;
}

interface TopicContext {
  course: string;
  year: number;
  subject: { id: string; name: string };
  topic: { id: string; name: string };
}

const QuestionAttempt = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [context, setContext] = useState<TopicContext | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch questions for the topic
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!topicId) return;

      try {
        const response = await tutorAPI.getQuestionsByTopic(topicId);
        setQuestions(response.data);
        setContext(response.statusCode?.context || null);
      } catch (error) {
        toast.error("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId]);

  const currentQuestion = questions[0]; // For MVP, use first question

  const submitMutation = useMutation({
    mutationFn: (request: AttemptRequest) => tutorAPI.submitAttempt(request),
    onSuccess: (response) => {
      // Navigate to explanation page with the response data
      navigate(`/explanation/${topicId}`, {
        state: {
          diagnosis: response.data.diagnosis,
          explanation: response.data.explanation,
          retryQuestion: response.data.retryQuestion,
          originalTopic: {
            subject: context?.subject.id,
            topic: topicId,
            question: currentQuestion?.question,
            expectedConcept: currentQuestion?.expectedConcept,
          },
          studentAnswer: answer,
        },
      });
    },
    onError: (error) => {
      toast.error("Failed to submit answer", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading question...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Question not found</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    submitMutation.mutate({
      subject: context?.subject.id || "",
      topic: topicId || "",
      question: currentQuestion.question,
      studentAnswer: answer,
      expectedConcept: currentQuestion.expectedConcept,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-blue-600">
            Home
          </button>
          {context && (
            <>
              <span>/</span>
              <span>{context.course}</span>
              <span>/</span>
              <span>Year {context.year}</span>
              <span>/</span>
              <span>{context.subject.name}</span>
              <span>/</span>
              <span className="font-medium text-gray-900">{context.topic.name}</span>
            </>
          )}
        </div>

        {/* Top Bar */}
        <Button
          variant="ghost"
          onClick={() => navigate(`/topics/${context?.subject.id || ""}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Topics
        </Button>

        <Card className="border-2">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-3">
              {context && (
                <>
                  <Badge variant="secondary">{context.subject.name}</Badge>
                  <Badge variant="outline">{context.topic.name}</Badge>
                </>
              )}
            </div>
            <CardTitle className="text-2xl">Answer the Question</CardTitle>
            <CardDescription>
              Take your time and explain in your own words
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-2">Question:</h3>
              <p className="text-lg text-gray-800">{currentQuestion.question}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium">
                Your Answer:
              </label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                Don't worry about being perfect - this is a learning experience!
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending || !answer.trim()}
              className="w-full"
              size="lg"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  AI is analyzing your answer...
                </>
              ) : (
                "Submit Answer"
              )}
            </Button>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>💡 Tip:</strong> The AI will diagnose your understanding and provide
                personalized feedback, not just tell you if you're right or wrong.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionAttempt;
