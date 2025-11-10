import { FilterType } from "@/types/todo";
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function FilterButtons({ activeFilter, onFilterChange, counts }: FilterButtonsProps) {
  const filters: { type: FilterType; label: string; count: number }[] = [
    { type: "all", label: "All", count: counts.all },
    { type: "active", label: "Active", count: counts.active },
    { type: "completed", label: "Completed", count: counts.completed },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.type}
          variant={activeFilter === filter.type ? "default" : "outline"}
          onClick={() => onFilterChange(filter.type)}
          className={
            activeFilter === filter.type
              ? "bg-gradient-primary hover:opacity-90"
              : "hover:bg-secondary"
          }
        >
          {filter.label}
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-background/20">
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
}
