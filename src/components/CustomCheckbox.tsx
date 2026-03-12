import { ChangeEvent, InvalidEvent, useCallback, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type CustomCheckboxProps = {
  agreed: boolean;
  id: string;
  isRequired?: boolean;
  name: string;
  setAgreed: (value: boolean) => void;
  label: string;
};

export function CustomCheckbox({
  agreed,
  id,
  isRequired,
  name,
  setAgreed,
  label,
}: CustomCheckboxProps) {
  const [error, setError] = useState("");

  const handleError = useCallback(
    (e: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const field = e.currentTarget;
      field.setCustomValidity(" ");
      if (field.validity.valueMissing) {
        setError("This field is required.");
      }
    },
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const field = e.currentTarget;
      setAgreed(field.checked);
      field.setCustomValidity("");
      setError("");
    },
    [setAgreed],
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start gap-3">
      <Input
        id={id}
        type="checkbox"
        name={name}
        required={isRequired}
        checked={agreed}
        aria-invalid={error !== ""}
        className={
          "mt-0.5 size-4 p-0 accent-brand-800 focus-visible:ring-1 focus-visible:ring-offset-1"
        }
        onInvalid={handleError}
        onChange={handleChange}
        />
      <div>
        <Label htmlFor={name} className="text-xs leading-relaxed text-white">
          {label}
        </Label>
      </div>
        </div>
      <div className="h-4 text-sm text-red-500">{error}</div>
    </div>
  );
}
