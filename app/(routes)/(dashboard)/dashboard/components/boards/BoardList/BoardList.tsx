import { BoardCard } from "./BoardCard";
import { BoardListProps } from "./BoardList.types";

export function BoardList(props: BoardListProps) {
  const { boards } = props;

  if (boards.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No tienes ningún board todavía.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}
