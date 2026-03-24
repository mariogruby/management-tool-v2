import { CreateBoardModal } from "./components/boards/CreateBoardModal/CreateBoardModal";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mis boards</h1>
        <CreateBoardModal />
      </div>
    </div>
  );
}
