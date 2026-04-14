interface DayData {
  date: string; // "YYYY-MM-DD"
  count: number;
}

export interface WeeklyActivityProps {
  days: DayData[];
}
