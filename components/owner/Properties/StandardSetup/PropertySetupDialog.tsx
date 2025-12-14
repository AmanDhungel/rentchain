"use client";
import Image from "next/image";
import useDialogOpen from "@/context/Dialog";
import { icons } from "../../../../assets/icons/exports";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import StandardPropertySetup from "./StandardPropertySetup";

export default function StandardPropertySetupDialog() {
  const { open, setIsOpen } = useDialogOpen();
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3B7080] text-white rounded-lg hover:bg-[#2C5966] transition-colors">
          <Image
            alt="RoundedPlusIcon"
            src={icons.RoundedPlusIcon}
            className="scale-200"
          />
          <span>Standard Setup</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="h-full w-screen rounded-lg  p-0 m-0 flex flex-col overflow-auto text-[#202C4B]"
        style={{ scrollbarWidth: "none" }}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            Standard Property Setup
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Streamlined property creation with essential steps only
          </p>
        </DialogHeader>
        <div className="w-full p-6 pt-0">
          <StandardPropertySetup />
        </div>
      </DialogContent>
    </Dialog>
  );
}
