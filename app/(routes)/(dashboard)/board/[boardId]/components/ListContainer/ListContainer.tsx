import { ListWithTasks } from "../TaskCard/TaskCard.types";
import { ListItem } from "../ListItem/ListItem";
import { CreateListForm } from "../CreateListForm/CreateListForm";

interface ListContainerProps {
  lists: ListWithTasks[];
  boardId: string;
}

export function ListContainer({ lists, boardId }: ListContainerProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 items-start">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
      <CreateListForm boardId={boardId} />
    </div>
  );
}
