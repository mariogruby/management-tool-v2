export type FilterStatus = "all" | "pending" | "completed";
export type FilterDueDate = "all" | "overdue" | "today" | "week" | "none";

export type BoardFiltersState = {
  status: FilterStatus;
  dueDate: FilterDueDate;
  labelIds: string[];
};

export type BoardFiltersProps = {
  filters: BoardFiltersState;
  onChange: (filters: BoardFiltersState) => void;
  availableLabels: { id: string; title: string; color: string }[];
};
