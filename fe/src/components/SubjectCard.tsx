import { cn } from "@/lib/utils";
import { Globe, Network } from "lucide-react";

interface SubjectCardProps {
  id: string;
  name: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

const SubjectCard = ({ id, name, description, selected = false, onClick }: SubjectCardProps) => {
  const Icon = id === 'web-dev' ? Globe : Network;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-6 text-left transition-all duration-200",
        "rounded-card border-2 bg-card",
        selected
          ? "border-primary shadow-md"
          : "border-border hover:border-primary/40 hover:shadow-sm"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-[12px]",
          selected ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}>
          <Icon className="w-6 h-6" fill="currentColor" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default SubjectCard;
