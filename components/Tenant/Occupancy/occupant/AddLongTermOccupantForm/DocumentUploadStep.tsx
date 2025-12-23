import { Button, Label } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Eye, Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

const DocumentUploadStep = () => {
  const { setValue, watch } = useFormContext();
  const files = watch(["govId", "incomeProof", "healthCert"]);

  const handleFile = (key: string, file: File | null) => {
    setValue(key, file, { shouldValidate: true });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-lg font-bold text-slate-800">Document Upload</h3>

      <FileUploadZone
        label="Government Id"
        required
        file={files[0]}
        onUpload={(f: any) => handleFile("govId", f)}
        onDelete={() => handleFile("govId", null)}
      />

      <FileUploadZone
        label="Proof Of_income"
        file={files[1]}
        onUpload={(f: any) => handleFile("incomeProof", f)}
        onDelete={() => handleFile("incomeProof", null)}
      />

      <FileUploadZone
        label="Health Certificate"
        file={files[2]}
        onUpload={(f: any) => handleFile("healthCert", f)}
        onDelete={() => handleFile("healthCert", null)}
      />
    </div>
  );
};

const FileUploadZone = ({ label, required, file, onUpload, onDelete }: any) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Label className="font-bold text-slate-700">{label}</Label>
      <Badge variant="outline" className="text-[10px] uppercase">
        {required ? "Required" : "Optional"}
      </Badge>
    </div>

    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative">
      <input
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => onUpload(e.target.files?.[0])}
      />
      <Upload className="h-8 w-8 text-slate-400 mb-2" />
      <p className="text-sm font-medium text-slate-600">Click to upload</p>
      <p className="text-xs text-slate-400">PDF, JPG, PNG up to 10MB</p>
      <Button variant="outline" size="sm" className="mt-4 pointer-events-none">
        Browse File
      </Button>
    </div>

    {file && (
      <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center gap-2 text-orange-600">
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">{file.name || "xyz.jpg"}</span>
        </div>
        <button
          onClick={onDelete}
          className="text-orange-400 hover:text-orange-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    )}
  </div>
);

export default DocumentUploadStep;
