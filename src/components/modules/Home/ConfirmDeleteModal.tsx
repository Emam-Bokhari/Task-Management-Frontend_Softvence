"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiDeleteBinLine } from "react-icons/ri";
import confirmDeleteImage from "@/assets/confirmDelete.png";
import Image from "next/image";
import { useState } from "react";

export default function ConfirmDeleteModal({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <RiDeleteBinLine className="text-2xl text-red-500" />
        </div>
      </DialogTrigger>
      <DialogTitle className="sr-only">Confirm Delete</DialogTitle>
      <DialogContent>
        <div className="flex justify-center space-y-3">
          <div className="space-y-3">
            <div className="flex justify-center">
              <Image
                width={300}
                height={300}
                src={confirmDeleteImage}
                alt="Confirm Delete Image"
              />
            </div>
            <p className="text-2xl font-bold text-[#1F1F1F] text-center">
              Are You Sure!!
            </p>
            <p className="text-base text-[#667085] text-center">
              Do you want to delete this Task on this app?
            </p>
            <div className="flex gap-5 justify-center">
              <Button
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
                className="bg-[#60E5AE] hover:bg-[#46C98C] cursor-pointer text-[#1F1F1F] font-bold"
              >
                Yes
              </Button>
              <Button
                onClick={() => setOpen(false)}
                className="bg-[#F5DBD5] hover:bg-[#eec9c0] cursor-pointer text-red-500 font-bold"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
