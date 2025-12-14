import React, { useState, useEffect, type JSX } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { useFormContext } from "react-hook-form";

type Amenity = { id: string; label: string };

const initialSuggestions = [
  "Pool",
  "Gym",
  "Parking",
  "WiFi",
  "Pet Friendly",
  "AC",
  "Heating",
  "Balcony",
  "Laundry",
  "Security",
  "Elevator",
  "Garden",
  "Furnished",
  "Storage",
  "24/7 Support",
];

const genId = (seed = "") =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}${seed}`;

type FormValues = {
  amenities: string[];
};

export default function Amenities({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}): JSX.Element {
  const [suggestions, setSuggestions] = useState<Amenity[]>(
    initialSuggestions.map((s) => ({ id: genId(s), label: s }))
  );
  const [inputValue, setInputValue] = useState("");
  const [localAmenities, setLocalAmenities] = useState<string[]>([]);

  const { watch, setValue } = useFormContext<FormValues>();

  // Sync form state with local state instantly
  const watchedAmenities = watch("amenities") ?? [];

  useEffect(() => {
    setLocalAmenities(watchedAmenities);
  }, [watchedAmenities]);

  const toggleSelect = (label: string) => {
    const exists = localAmenities.includes(label);
    const updated = exists
      ? localAmenities.filter((x) => x !== label)
      : [...localAmenities, label];
    setValue("amenities", updated, { shouldDirty: true });
    setLocalAmenities(updated);
  };

  const removeSelected = (label: string) => {
    const updated = localAmenities.filter((x) => x !== label);
    setValue("amenities", updated, { shouldDirty: true });
    setLocalAmenities(updated);
  };

  const addCustomAmenity = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const existsInSuggestions = suggestions.some(
      (s) => s.label.toLowerCase() === trimmed.toLowerCase()
    );
    if (!existsInSuggestions) {
      const newAmenity = { id: genId(trimmed), label: trimmed };
      setSuggestions((s) => [newAmenity, ...s]);
    }

    if (
      !localAmenities.some((c) => c.toLowerCase() === trimmed.toLowerCase())
    ) {
      const updated = [...localAmenities, trimmed];
      setValue("amenities", updated, { shouldDirty: true });
      setLocalAmenities(updated);
    }

    setInputValue("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomAmenity();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Amenities</h3>
      <p className="text-sm text-gray-500 mb-4">
        Add property amenities and features
      </p>

      <div className="flex gap-3 items-start">
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter amenity"
            className="h-10"
          />
        </div>

        <Button
          onClick={addCustomAmenity}
          className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white">
          <span className="inline-flex items-center gap-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden>
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add
          </span>
        </Button>
      </div>

      {/* Suggestions */}
      <div className="mt-4 flex flex-wrap gap-3">
        {suggestions.map((s) => {
          const active = localAmenities.includes(s.label);
          return (
            <button
              key={s.id}
              onClick={() => toggleSelect(s.label)}
              type="button"
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border transition-shadow focus:outline-none ${
                active
                  ? "bg-gray-800 text-white border-transparent shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:shadow-sm"
              }`}>
              <span className="w-4 h-4 flex items-center justify-center">
                {active && (
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden>
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="select-none">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Added Amenities */}
      <div className="mt-6">
        <div className="text-sm font-medium text-gray-700 mb-2">
          Added Amenities
        </div>

        <div className="flex flex-wrap gap-2">
          {localAmenities.length === 0 ? (
            <div className="text-sm text-gray-400">No amenities added</div>
          ) : (
            localAmenities.map((label) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm">
                <span>{label}</span>
                <button
                  onClick={() => removeSelected(label)}
                  className="w-5 h-5 inline-flex items-center justify-center rounded-full hover:bg-white/10"
                  aria-label={`Remove ${label}`}>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden>
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={onPrev}>
          <span className="inline-flex items-center gap-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden>
              <path
                d="M15 6L9 12l6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </span>
        </Button>

        <Button
          onClick={onNext}
          className="bg-orange-500 text-white hover:bg-orange-600">
          <span className="inline-flex items-center gap-2">
            Next
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden>
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
}
