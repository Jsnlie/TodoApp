import { CheckCircle2 } from "lucide-react";

interface EmptyStateProps {
  filter: string;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const messages = {
    all: "No tasks yet. Add one to get started!",
    active: "All caught up! No active tasks.",
    completed: "No completed tasks yet.",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="h-24 w-24 rounded-full bg-gradient-primary opacity-10 flex items-center justify-center mb-6">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      <p className="text-lg text-muted-foreground">
        {messages[filter as keyof typeof messages] || messages.all}
      </p>
    </div>
  );
}
