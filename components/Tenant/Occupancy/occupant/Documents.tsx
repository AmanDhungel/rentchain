import { FileText, Eye, Upload, Trash2, AlertTriangle } from "lucide-react";
import React, { useState, ChangeEvent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, Label } from "@/components/ui";

type DocStatus = "Verified" | "Not Verified";

interface DocumentItem {
  id: number;
  type: string;
  file: File | null;
  name: string | null;
  status: DocStatus;
  date: string | null;
  size: string | null;
  expiry?: string;
}

const DocumentVerification: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 1,
      type: "National ID",
      file: null,
      name: null,
      status: "Not Verified",
      date: null,
      size: null,
      expiry: "March 15, 2029",
    },
    {
      id: 2,
      type: "Passport",
      file: null,
      name: null,
      status: "Not Verified",
      date: null,
      size: null,
      expiry: "March 15, 2029",
    },
    {
      id: 3,
      type: "Employment Letter",
      file: null,
      name: null,
      status: "Not Verified",
      date: null,
      size: null,
    },
    {
      id: 4,
      type: "Income Statement",
      file: null,
      name: null,
      status: "Not Verified",
      date: null,
      size: null,
    },
  ]);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const [newName, setNewName] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const addNewDocument = () => {
    if (!newName || !newFile) return;

    const newDoc: DocumentItem = {
      id: Math.random().toString(36).substr(2, 9) as unknown as number,
      type: newName,
      file: newFile,
      name: newFile.name,
      size: (newFile.size / (1024 * 1024)).toFixed(1) + " MB",
      status: "Verified",
      date: getCurrentDate(),
    };

    setDocuments([...documents, newDoc]);
    setIsAddModalOpen(false);
    setNewName("");
    setNewFile(null);
  };

  const handleUpload = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const now = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              file: file,
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
              status: "Verified" as DocStatus,
              date: now,
            }
          : doc
      )
    );

    e.target.value = "";
  };

  const confirmDelete = () => {
    if (deleteId === null) return;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === deleteId
          ? {
              ...doc,
              file: null,
              status: "Not Verified" as DocStatus,
              date: null,
              name: null,
              size: null,
            }
          : doc
      )
    );
    setDeleteId(null);
  };

  return (
    <div className="mx-auto p-6 bg-white min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <h1 className="text-xl font-bold text-slate-800">
          Document Verification Status
        </h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#f26522] hover:bg-[#d4551a] text-white gap-2 px-6 rounded-md transition-colors">
              <Upload className="h-4 w-4" /> Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Document Type Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Utility Bill"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">File Upload (PDF)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setNewFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addNewDocument} disabled={!newName || !newFile}>
                Add to List
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="border border-slate-200 shadow-none overflow-hidden hover:border-slate-300 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg h-fit">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 text-lg mb-1">
                      {doc.type}
                    </h3>
                    {doc.file ? (
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <span className="font-medium">{doc.size}</span>
                          <span className="text-slate-300">•</span>
                          <span>{doc.name}</span>
                        </p>
                        <p className="text-sm text-slate-500">
                          Uploaded: {doc.date}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic">
                        No document uploaded
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Badge
                    className={`
                    ${
                      doc.status === "Verified"
                        ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-100"
                    } 
                    px-4 py-1 rounded-md border-none font-semibold text-xs tracking-wide
                  `}>
                    {doc.status}
                  </Badge>

                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-slate-600"
                      disabled={!doc.file}
                      onClick={() => setPreviewFile(doc.file)}>
                      <Eye className="h-5 w-5" />
                    </Button>

                    <div className="relative">
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => handleUpload(doc.id, e)}
                        accept=".pdf"
                        title="Upload file"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-slate-600">
                        <Upload className="h-5 w-5" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setDeleteId(doc.id)}
                      disabled={!doc.file}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              {doc.status === "Verified" && (
                <div className="mt-6 p-3 bg-[#e6f7f1] border border-[#c3eadc] rounded-md">
                  <p className="text-[#10b981] text-sm font-medium flex items-center gap-2">
                    Verified on {doc.date}
                    {doc.expiry && (
                      <>
                        <span className="text-[#a0dcc7] mx-1">•</span>
                        <span>Expires: {doc.expiry}</span>
                      </>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Document?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the uploaded file and reset the
              verification status. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600">
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={previewFile !== null}
        onOpenChange={(open) => !open && setPreviewFile(null)}>
        <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{previewFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-full bg-slate-100">
            {previewFile && (
              <iframe
                src={URL.createObjectURL(previewFile)}
                className="w-full h-[calc(90vh-120px)]"
                title="Document Preview"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentVerification;
