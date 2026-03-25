"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateBoardStepper } from "./CreateBoardStepper";

export function CreateBoardModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="mr-2 h-4 w-4" />
        Crear board
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo board</DialogTitle>
        </DialogHeader>
        <CreateBoardStepper onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
