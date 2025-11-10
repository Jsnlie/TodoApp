import { useState, useMemo } from "react";
import { CheckSquare } from "lucide-react";
import { Todo, FilterType } from "@/types/todo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TodoForm } from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";
import { FilterButtons } from "@/components/FilterButtons";
import { EmptyState } from "@/components/EmptyState";

const Index = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((todo) => !todo.completed).length,
      completed: todos.filter((todo) => todo.completed).length,
    }),
    [todos]
  );

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <CheckSquare className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              My Tasks
            </h1>
          </div>
          <p className="text-muted-foreground">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="mb-6 animate-slide-in">
          <TodoForm onAdd={addTodo} />
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 animate-fade-in">
          <FilterButtons
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
