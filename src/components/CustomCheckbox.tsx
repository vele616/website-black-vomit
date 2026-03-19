import { ChangeEvent, InvalidEvent, useCallback, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type CustomCheckboxProps = {
  agreed: boolean;
  id: string;
  label: string;
  setAgreed: (value: boolean) => void;
  disabled?: boolean;
  isRequired?: boolean;
  name?: string;
};

export function CustomCheckbox({
  agreed,
  id,
  label,
  setAgreed,
  disabled = false,
  isRequired = false,
  name,
}: CustomCheckboxProps) {
  const [error, setError] = useState("");
  const handleError = useCallback(
    (e: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      const field = e.currentTarget;
      if (field.validity.valueMissing) {
        setError("Please check the consent box.");
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
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Input
          aria-invalid={error !== ""}
          checked={agreed}
          className={
            "accent-white h-4 w-4 rounded border-border/70 data-[state=checked]:bg-foreground data-[state=checked]:text-background"
          }
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          onInvalid={handleError}
          required={isRequired}
          type="checkbox"
        />
        <Label
          htmlFor={id}
          className="cursor-pointer font-normal! text-xs leading-relaxed items-center flex"
        >
          {label}
        </Label>
      </div>
      <div className="h-4 text-sm text-red-500 pt-0.5">{error}</div>
    </div>
  );
}
