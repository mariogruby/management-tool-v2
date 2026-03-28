import { ListWithTasks } from "../TaskCard/TaskCard.types";
import { ListItem } from "../ListItem/ListItem";

interface ListContainerProps {
  lists: ListWithTasks[];
}

export function ListContainer({ lists }: ListContainerProps) {
  if (lists.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Este board no tiene listas todavía.
      </p>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
    </div>
  );
}
