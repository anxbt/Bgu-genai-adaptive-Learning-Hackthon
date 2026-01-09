import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tutorAPI } from "@/lib/tutorAPI";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
}

const TopicSelection = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get stored context
  const course = sessionStorage.getItem("selectedCourse") || "B.Tech";
  const year = sessionStorage.getItem("selectedYear") || "2";

  useEffect(() => {
    const fetchTopics = async () => {
      if (!subjectId) return;

      try {
        const response = await tutorAPI.getTopicsBySubject(subjectId);
        setTopics(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load topics. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [subjectId, toast]);

  const handleTopicSelect = (topicId: string) => {
    sessionStorage.setItem("selectedTopic", topicId);
    navigate(`/question/${topicId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading topics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-blue-600">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/years/${encodeURIComponent(course)}`)}
            className="hover:text-blue-600"
          >
            {course}
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/subjects/${encodeURIComponent(course)}/${year}`)}
            className="hover:text-blue-600"
          >
            Year {year}
          </button>
          <span>/</span>
          <span className="font-medium text-gray-900 capitalize">
            {subjectId?.replace("-", " ")}
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select a Topic
          </h1>
          <p className="text-lg text-gray-600 capitalize">
            {subjectId?.replace("-", " ")}
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-orange-500"
              onClick={() => handleTopicSelect(topic.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{topic.icon}</span>
                  <div>
                    <CardTitle>{topic.name}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {topic.questionCount} question{topic.questionCount !== 1 ? "s" : ""}
                  </span>
                  <Button variant="outline" size="sm">
                    <span>Start</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/subjects/${encodeURIComponent(course)}/${year}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">How it works</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>1️⃣ Answer the question in your own words</p>
              <p>2️⃣ Get personalized feedback on your understanding</p>
              <p>3️⃣ Retry with a new question to validate learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicSelection;
