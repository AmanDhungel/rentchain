import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";
import UtilityStepForm from "./StepFormUtility";

const UtilityStepformDIalog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          <Image
            alt="RoundedPlusIcon"
            src={icons.RoundedPlusIcon}
            className="scale-200"
          />
          <span>Add Meter</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="h-full w-screen rounded-lg  p-0 m-0 flex flex-col overflow-auto text-[#202C4B]"
        style={{ scrollbarWidth: "none" }}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            Add New Meter
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Install a new utility meter
          </p>
        </DialogHeader>
        <div className="w-full p-6 pt-0">
          <UtilityStepForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UtilityStepformDIalog;
