import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { mockProgress } from "@/data/mockData";
import { CheckCircle, Lightbulb, Flag, ArrowLeft } from "lucide-react";

const Progress = () => {
  const navigate = useNavigate();

  // Calculate totals
  const totalAttempted = mockProgress.reduce((sum, p) => sum + p.attempted, 0);
  const totalFixed = mockProgress.reduce((sum, p) => sum + p.fixed, 0);
  const totalNeedsReview = mockProgress.reduce((sum, p) => sum + p.needsReview, 0);

  return (
    <div className="min-h-screen bg-gradient-sunrise-subtle">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex items-center mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/topics")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to topics</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
          <p className="mt-2 text-muted-foreground">
            Track your learning journey and see where you've improved.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10 animate-fade-in-up">
          <StatCard
            icon={CheckCircle}
            label="Concepts Attempted"
            value={totalAttempted}
            variant="default"
          />
          <StatCard
            icon={Lightbulb}
            label="Misunderstandings Fixed"
            value={totalFixed}
            variant="success"
          />
          <StatCard
            icon={Flag}
            label="Needs Review"
            value={totalNeedsReview}
            variant="warning"
          />
        </div>

        {/* Topic Progress */}
        <div className="bg-card rounded-card border border-border p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Progress by Topic
          </h2>
          <div className="space-y-6">
            {mockProgress.map((item) => (
              <div key={item.topicId}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {item.topicName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.fixed}/{item.attempted} fixed
                  </span>
                </div>
                <ProgressBar value={item.progress} showLabel={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Needs Review Section */}
        {totalNeedsReview > 0 && (
          <div className="mt-6 bg-warning/5 rounded-card border border-warning/20 p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-warning/10 rounded-[10px] text-warning">
                <Flag className="w-5 h-5" fill="currentColor" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {totalNeedsReview} concepts need review
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Practice these again to strengthen your understanding.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => navigate("/topics")}
            className="h-12 px-8 rounded-button text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Progress;
