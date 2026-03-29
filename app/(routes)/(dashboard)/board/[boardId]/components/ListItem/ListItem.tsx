import { ListItemProps } from "./ListItem.types";
import { TaskCard } from "../TaskCard/TaskCard";
import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm";

export function ListItem({ list }: ListItemProps) {
  return (
    <div className="flex flex-col bg-muted rounded-xl w-64 shrink-0 p-3 gap-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-semibold text-sm">{list.title}</h3>
        <span className="text-xs text-muted-foreground">{list.tasks.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {list.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <CreateTaskForm listId={list.id} />
    </div>
  );
}
