import { ListItem } from "../ListItem/ListItem";
import { CreateListForm } from "../CreateListForm/CreateListForm";
import { ListContainerProps } from "./ListContainer.types";

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
