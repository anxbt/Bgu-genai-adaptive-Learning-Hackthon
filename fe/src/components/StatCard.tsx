import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  variant?: 'default' | 'success' | 'warning';
}

const StatCard = ({ icon: Icon, label, value, variant = 'default' }: StatCardProps) => {
  const variantStyles = {
    default: "bg-accent text-accent-foreground",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <div className="bg-card rounded-card border border-border p-5">
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-[12px]", variantStyles[variant])}>
          <Icon className="w-5 h-5" fill="currentColor" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
