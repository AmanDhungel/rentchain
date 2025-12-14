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
import ParkingQuickSetup from "./QuickSetup";

export default function ParkingSetupDialog() {
  const { open, setIsOpen } = useDialogOpen();
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-1.5 bg-linear-to-r from-orange-400 via-orange-500  to-orange-500 text-white rounded-lg hover:bg-[#2C5966] transition-colors">
          <Image
            alt="RoundedPlusIcon"
            src={icons.RoundedPlusIcon}
            className="scale-200"
          />
          <span>Quick Setup</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="h-full w-screen rounded-lg  p-0 m-0 flex flex-col overflow-auto text-[#202C4B]"
        style={{ scrollbarWidth: "none" }}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            Parking Facility Setup
          </DialogTitle>
        </DialogHeader>
        <div className="w-full p-6 pt-0">
          <ParkingQuickSetup setIsOpen={setIsOpen} isOpen={open} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
