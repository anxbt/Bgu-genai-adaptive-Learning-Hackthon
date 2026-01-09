import { Lightbulb } from "lucide-react";

interface ExplanationSectionProps {
  conceptBreakdown: string;
  analogy: string;
  keyTakeaway: string;
}

const ExplanationSection = ({ conceptBreakdown, analogy, keyTakeaway }: ExplanationSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Concept Breakdown */}
      <div className="bg-card rounded-card border border-border p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Concept Breakdown
        </h3>
        <p className="text-foreground leading-relaxed">
          {conceptBreakdown}
        </p>
      </div>

      {/* Analogy */}
      <div className="bg-card rounded-card border border-border p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Think of it this way
        </h3>
        <p className="text-foreground leading-relaxed italic">
          "{analogy}"
        </p>
      </div>

      {/* Key Takeaway */}
      <div className="bg-accent rounded-card p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary rounded-[10px] text-primary-foreground">
            <Lightbulb className="w-5 h-5" fill="currentColor" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-accent-foreground uppercase tracking-wide mb-2">
              Key Takeaway
            </h3>
            <p className="text-foreground font-medium">
              {keyTakeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
