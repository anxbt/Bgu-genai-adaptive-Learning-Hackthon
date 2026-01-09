import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Home, Lightbulb, Target, Sparkles, Brain, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { tutorAPI, type RetryRequest, type Topic } from "@/lib/tutorAPI";

const DIAGNOSIS_CONFIG = {
  conceptual: {
    color: "bg-red-100 text-red-800 border-red-200",
    label: "Conceptual Misunderstanding",
    description: "Fundamental concept needs clarification",
  },
  procedural: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Procedural Issue",
    description: "You understand the concept but application needs work",
  },
  partial: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    label: "Partial Understanding",
    description: "You're on the right track but missing key details",
  },
  correct: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Correct Understanding",
    description: "Great job! You understand the concept well",
  },
};

interface LocationState {
  diagnosis: keyof typeof DIAGNOSIS_CONFIG;
  explanation: {
    coreIdea: string;
    keyMistake: string;
    analogy: string;
    takeaway: string;
  };
  retryQuestion: {
    question: string;
    hint: string;
  };
  originalTopic: Topic;
  studentAnswer: string;
}

const Explanation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [retryAnswer, setRetryAnswer] = useState("");
  const [retryResult, setRetryResult] = useState<{
    improved: boolean;
    feedback: string;
    nextDifficulty: string;
  } | null>(null);

  const retryMutation = useMutation({
    mutationFn: (request: RetryRequest) => tutorAPI.submitRetry(request),
    onSuccess: (response) => {
      setRetryResult(response.data);
      toast.success(response.data.improved ? "Great improvement!" : "Keep practicing!");
    },
    onError: (error) => {
      toast.error("Failed to evaluate retry", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    },
  });

  if (!state) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No results available</p>
        <Button onClick={() => navigate("/topics")}>Back to Topics</Button>
      </div>
    );
  }

  const { diagnosis, explanation, retryQuestion, originalTopic } = state;
  const diagnosisConfig = DIAGNOSIS_CONFIG[diagnosis];

  const handleRetrySubmit = () => {
    if (!retryAnswer.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    retryMutation.mutate({
      originalMistake: diagnosis,
      retryAnswer: retryAnswer,
      expectedConcept: originalTopic.expectedConcept,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Diagnosis Badge */}
        <Card className={`border-2 ${diagnosisConfig.color}`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8" />
              <div>
                <CardTitle>{diagnosisConfig.label}</CardTitle>
                <CardDescription className="text-gray-700">
                  {diagnosisConfig.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Explanation */}
        <Card>
          <CardHeader>
            <CardTitle>Personalized Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Core Idea</h3>
                  <p className="text-gray-700">{explanation.coreIdea}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Target className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Your Mistake</h3>
                  <p className="text-gray-700">{explanation.keyMistake}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Analogy</h3>
                  <p className="text-gray-700">{explanation.analogy}</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-1">✨ Key Takeaway</h3>
                <p className="text-green-800">{explanation.takeaway}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retry Section */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle>Validate Your Learning</CardTitle>
            <CardDescription>
              Try answering this follow-up question to demonstrate your understanding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="font-medium text-purple-900 mb-2">{retryQuestion.question}</p>
              <div className="flex gap-2 items-start text-sm text-purple-700">
                <span>💭</span>
                <p><strong>Hint:</strong> {retryQuestion.hint}</p>
              </div>
            </div>

            {!retryResult && (
              <>
                <Textarea
                  value={retryAnswer}
                  onChange={(e) => setRetryAnswer(e.target.value)}
                  placeholder="Your retry answer..."
                  rows={4}
                  className="resize-none"
                />
                <Button
                  onClick={handleRetrySubmit}
                  disabled={retryMutation.isPending || !retryAnswer.trim()}
                  className="w-full"
                  size="lg"
                >
                  {retryMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    "Submit Retry"
                  )}
                </Button>
              </>
            )}

            {retryResult && (
              <Alert className={retryResult.improved ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}>
                <div className="flex items-start gap-3">
                  {retryResult.improved ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2 flex-1">
                    <AlertDescription className="font-medium">
                      {retryResult.feedback}
                    </AlertDescription>
                    <p className="text-sm">
                      <strong>Next Step:</strong> {retryResult.nextDifficulty.replace(/-/g, " ")}
                    </p>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button onClick={() => navigate("/topics")} variant="outline" className="flex-1">
            <Home className="w-4 h-4 mr-2" />
            Try Another Topic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explanation;
