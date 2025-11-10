import { useState } from "react";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="group flex items-center gap-3 p-4 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5 data-[state=checked]:animate-check-bounce"
      />

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9"
            autoFocus
          />
          <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleSave}>
            <Check className="h-4 w-4 text-success" />
          </Button>
          <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleCancel}>
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      ) : (
        <>
          <p
            className={`flex-1 text-sm transition-all duration-200 ${
              todo.completed
                ? "line-through text-muted-foreground"
                : "text-foreground"
            }`}
          >
            {todo.text}
          </p>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
