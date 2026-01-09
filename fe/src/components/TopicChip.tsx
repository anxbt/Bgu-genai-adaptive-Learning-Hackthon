import { cn } from "@/lib/utils";

interface TopicChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const TopicChip = ({ label, selected = false, onClick }: TopicChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-all duration-200",
        "rounded-button border",
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent"
      )}
    >
      {label}
    </button>
  );
};

export default TopicChip;
