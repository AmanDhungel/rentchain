import React, { useRef, useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { icons } from "../../../assets/icons/exports";
import { useFormContext } from "react-hook-form";
import { Article } from "../../../assets/exportsiconsjsx/Article";
import { Upload } from "lucide-react";

type FileChip = {
  id: string;
  name: string;
  size: number;
  file?: File;
  kind?: "photo" | "video" | "tour" | "floorplan" | "document";
};

const genId = () => Math.random().toString(36).slice(2, 9);

export default function MediaFiles({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const { setValue, getValues } = useFormContext();

  // ✅ Single useState for all form-related data
  const [formState, setFormState] = useState(() => ({
    propertyPhotos: getValues("propertyPhotos") || [],
    propertyVideos: getValues("propertyVideos") || [],
    virtualTours: getValues("virtualTours") || [],
    floorPlans: getValues("floorPlans") || [],
    documentsLegal: getValues("documentsLegal") || [],
    documentsInsurance: getValues("documentsInsurance") || [],
    urls: getValues("urls") || [],
    addWatermark: getValues("addWatermark") || false,
    autoResize: getValues("autoResize") || false,
    publicGallery: getValues("publicGallery") || false,
    tenantAccess: getValues("tenantAccess") || false,
  }));

  const [urlInput, setUrlInput] = useState("");

  // Hidden input refs
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const tourInputRef = useRef<HTMLInputElement | null>(null);
  const floorInputRef = useRef<HTMLInputElement | null>(null);
  const legalDocRef = useRef<HTMLInputElement | null>(null);
  const insuranceDocRef = useRef<HTMLInputElement | null>(null);

  // ✅ One useEffect to sync all data to react-hook-form
  useEffect(() => {
    Object.entries(formState).forEach(([key, value]) => {
      setValue(key as keyof typeof formState, value);
    });
  }, [formState, setValue]);

  // Helpers
  const addFiles = (
    files: FileList | null,
    field: keyof typeof formState,
    kind?: FileChip["kind"]
  ) => {
    if (!files) return;
    const newFiles = Array.from(files).map((f) => ({
      id: genId(),
      name: f.name,
      size: f.size,
      file: f,
      kind,
    }));
    setFormState((prev) => ({
      ...prev,
      [field]: [...(prev[field] as FileChip[]), ...newFiles],
    }));
  };

  const removeChip = (id: string, field: keyof typeof formState) => {
    setFormState((prev) => ({
      ...prev,
      [field]: (prev[field] as FileChip[]).filter((f) => f.id !== id),
    }));
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setFormState((p) => ({ ...p, urls: [...p.urls, trimmed] }));
    setUrlInput("");
  };

  const removeUrl = (url: string) => {
    setFormState((p) => ({
      ...p,
      urls: p.urls.filter((u: any) => u !== url),
    }));
  };

  const toggleCheckbox = (field: keyof typeof formState) => {
    setFormState((p) => ({ ...p, [field]: !p[field] }));
  };

  const handleNext = () => {
    Object.entries(formState).forEach(([key, value]) => {
      setValue(key as keyof typeof formState, value);
    });
    onNext();
  };

  // Dropzone UI (unchanged)
  const Dropzone: React.FC<{
    title?: string;
    description?: React.ReactNode;
    onClickBrowse: () => void;
    exampleChips?: FileChip[];
    onRemoveChip?: (id: string) => void;
    accept?: string;
  }> = ({
    title,
    description,
    onClickBrowse,
    exampleChips = [],
    onRemoveChip,
  }) => (
    <div className="mb-4">
      <div className="text-sm font-medium mb-2">{title}</div>
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[92px] bg-white">
        <div className="text-center text-sm text-gray-500">
          <div className="mb-2">{description}</div>
          <Button
            variant="outline"
            onClick={onClickBrowse}
            className="!px-3 !py-1">
            Browse File
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {exampleChips.map((c) => (
          <div
            key={c.id}
            className="inline-flex items-center gap-3 px-3 py-2 border rounded-full bg-white text-sm shadow-sm">
            <span className="text-gray-700">{c.name}</span>
            {onRemoveChip && (
              <button
                onClick={() => onRemoveChip(c.id)}
                className="ml-1 text-gray-400 hover:text-gray-600">
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-start gap-4">
        <div className="rounded-full border p-3 w-14 h-14 flex items-center justify-center">
          <img
            src={icons.CloudAdd}
            alt="Media & Files Icon"
            className="w-6 h-6"
          />
        </div>

        <div>
          <div className="text-lg font-semibold">Media &amp; Files</div>
          <div className="text-sm text-gray-500 mt-1">
            Upload photos, videos, 360° tours, and documents for your property
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <Dropzone
            title="Property Photos"
            description={
              <>
                <img src={icons.PhotoAlternative} className="m-auto" />
                Upload Property Photos <br />
                <span className="text-xs text-gray-400">
                  JPG / PNG up to 10MB each
                </span>
              </>
            }
            onClickBrowse={() => photoInputRef.current?.click()}
            exampleChips={formState.propertyPhotos}
            onRemoveChip={(id) => removeChip(id, "propertyPhotos")}
            accept="image/*"
          />
          <input
            ref={photoInputRef}
            type="file"
            onChange={(e) =>
              addFiles(e.target.files, "propertyPhotos", "photo")
            }
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>

        {/* Property Videos */}
        <div>
          <Dropzone
            title="Property Videos"
            description={
              <>
                <img src={icons.VideoCam} className="m-auto" />
                Upload Property Videos <br />
                <span className="text-xs text-gray-400">
                  MP4, MOV up to 150MB each
                </span>
              </>
            }
            onClickBrowse={() => videoInputRef.current?.click()}
            exampleChips={formState.propertyVideos}
            onRemoveChip={(id) => removeChip(id, "propertyVideos")}
            accept="video/*"
          />
          <input
            ref={videoInputRef}
            type="file"
            onChange={(e) =>
              addFiles(e.target.files, "propertyVideos", "video")
            }
            accept="video/*"
            multiple
            className="hidden"
          />
        </div>

        {/* Virtual Tours */}
        <div>
          <Dropzone
            title="360° Virtual Tour"
            description={
              <>
                <img src={icons.ThreeSixty} className="m-auto" />
                Upload 360° Tour or VR Content <br />
                <span className="text-xs text-gray-400">
                  360° images, VR videos, or tour links
                </span>
              </>
            }
            onClickBrowse={() => tourInputRef.current?.click()}
            exampleChips={formState.virtualTours}
            onRemoveChip={(id) => removeChip(id, "virtualTours")}
            accept="image/*,video/*"
          />
          <input
            ref={tourInputRef}
            type="file"
            onChange={(e) => addFiles(e.target.files, "virtualTours", "tour")}
            accept="image/*,video/*"
            multiple
            className="hidden"
          />
        </div>

        {/* URL Input */}
        <div>
          <Label>Virtual Tour URL</Label>
          <div className="flex gap-3 mt-2">
            <Input
              placeholder="Enter URL"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Button
              onClick={handleAddUrl}
              className="bg-orange-500 hover:bg-orange-600 text-white">
              Add URL
            </Button>
          </div>

          <div className="mt-3 space-y-2">
            {formState.urls.map((u) => (
              <div
                key={u}
                className="flex items-center justify-between border rounded-full py-2 px-3 bg-white">
                <span className="text-sm text-gray-600 break-words max-w-[420px]">
                  {u}
                </span>
                <button
                  onClick={() => removeUrl(u)}
                  className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plans */}
        <div>
          <Dropzone
            title="Floor Plans & Layouts"
            description={
              <>
                <Article className="m-auto" />
                Upload Floor Plans <br />
                <span className="text-xs text-gray-400">
                  PDF, JPG, PNG architectural drawings
                </span>
              </>
            }
            onClickBrowse={() => floorInputRef.current?.click()}
            exampleChips={formState.floorPlans}
            onRemoveChip={(id) => removeChip(id, "floorPlans")}
            accept=".pdf,image/*"
          />
          <input
            ref={floorInputRef}
            type="file"
            onChange={(e) =>
              addFiles(e.target.files, "floorPlans", "floorplan")
            }
            accept=".pdf,image/*"
            multiple
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Legal Documents */}
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex flex-col  justify-between">
              <div className="flex gap-2 mb-2">
                <Article fill="#1B84FF" />
                <p className="font-medium">Legal Documents</p>
              </div>
              <div>
                <Button
                  variant={"outline"}
                  onClick={() => legalDocRef.current?.click()}
                  className="w-full poppins-font text-[#202C4B] hover:bg-none rounded-md border-none hover:brightness-90 bg-[#F6F9FF]">
                  <Upload /> Upload
                </Button>
                <div className="text-xs text-gray-400 mt-1">
                  Deeds, permits, certificates
                </div>
              </div>

              <div>
                <input
                  ref={legalDocRef}
                  type="file"
                  onChange={(e) =>
                    addFiles(e.target.files, "documentsLegal", "document")
                  }
                  className="hidden"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {formState.documentsLegal.map((d) => (
                <div
                  key={d.id}
                  className="inline-flex items-center gap-3 px-3 py-2 border rounded-full bg-white text-sm shadow-sm">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      d="M3 7h18M3 12h18M3 17h18"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="w-20 overflow-clip">{d.name}</span>
                  <button
                    onClick={() => removeChip(d.id, "documentsLegal")}
                    className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Papers */}
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex flex-col  justify-between">
              <div className="flex gap-2 mb-2">
                <img src={icons.HealthAndSafety} alt="Insurance" />
                <p className="font-medium">Insurance Papers</p>
              </div>
              <div>
                <Button
                  variant={"outline"}
                  onClick={() => insuranceDocRef.current?.click()}
                  className="w-full poppins-font text-[#202C4B] hover:bg-none rounded-md border-none hover:brightness-90 bg-[#F6F9FF]">
                  <Upload /> Upload
                </Button>

                <div className="text-xs text-gray-400 mt-1">
                  Insurance policies, coverage
                </div>
                <div>
                  <input
                    ref={insuranceDocRef}
                    type="file"
                    onChange={(e) =>
                      addFiles(e.target.files, "documentsInsurance", "document")
                    }
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {formState.documentsInsurance.map((d) => (
                <div
                  key={d.id}
                  className="inline-flex items-center gap-3 px-3 py-2 border rounded-full bg-white text-sm shadow-sm">
                  <svg
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      d="M12 2l9 4v6c0 7-9 10-9 10S3 19 3 12V6l9-4z"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{d.name}</span>
                  <button
                    onClick={() => removeChip(d.id, "documentsInsurance")}
                    className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="border-t pt-4">
          <div className="text-sm font-medium mb-2">Media Organization</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["addWatermark", "Add watermark"],
              ["autoResize", "Auto-resize images"],
              ["publicGallery", "Public gallery"],
              ["tenantAccess", "Tenant access"],
            ].map(([field, label]) => (
              <label key={field} className="flex items-center gap-2">
                <Checkbox
                  checked={
                    formState[field as keyof typeof formState] as boolean
                  }
                  onCheckedChange={() =>
                    toggleCheckbox(field as keyof typeof formState)
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            onClick={onPrev}
            variant="secondary"
            className="bg-gray-200 text-gray-700 hover:bg-gray-300">
            ← Previous
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleNext}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}
