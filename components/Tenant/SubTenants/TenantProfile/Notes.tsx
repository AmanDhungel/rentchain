"use client";
import React, { useState } from "react";
import { Pencil, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NotesDashboard = () => {
  const [notes, setNotes] = useState([
    {
      type: "Positive",
      text: "Excellent tenant - always pays on time and keeps space very clean",
      date: "4/1/2024",
    },
    {
      type: "Info",
      text: "Requested early lease renewal for next year",
      date: "4/1/2024",
    },
    {
      type: "Positive",
      text: "Very respectful of quiet hours and shared spaces",
      date: "4/1/2024",
    },
  ]);

  return (
    <div className="p-8  mx-auto space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1e293b] text-xl font-bold">
            Notes & Observations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notes.map((note, index) => (
            <div
              key={index}
              className="relative p-5 border border-slate-100 rounded-xl bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="outline"
                  className="font-normal text-slate-500 px-3 py-0.5 rounded-md">
                  {note.type}
                </Badge>
                <span className="text-sm text-slate-400 font-medium">
                  {note.date}
                </span>
              </div>
              <p className="text-slate-500 font-medium">{note.text}</p>
            </div>
          ))}

          {/* Add Note Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full py-6 mt-4 border-slate-200 text-[#1e293b] font-bold gap-2">
                <Pencil className="w-4 h-4" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Note</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">Notes</Label>
                  <Textarea id="note" placeholder="Enter your observation..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" className="block" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() =>
                    setNotes((prev) => [
                      ...prev,
                      {
                        type: "Positive",
                        text: "New note added",
                        date: new Date().toLocaleDateString(),
                      },
                    ])
                  }
                  className="bg-[#1e293b]">
                  Save Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesDashboard;
