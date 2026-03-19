import { InvalidEvent, useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

type InputFieldProps = {
  id: string;
  name: string;
  placeholder: string;
  isRequired?: boolean;
  isTextArea?: boolean;
  label?: string;
  type?: string;
  className?: string;
};

export function InputField({
  id,
  name,
  placeholder,
  isRequired = false,
  isTextArea = false,
  label = "",
  type,
  className,
}: InputFieldProps) {
  const [error, setError] = useState("");

  const handleError = useCallback(
    (e: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      const field = e.currentTarget;
      if (field.validity.valueMissing) {
        setError("This field is required.");
      }
      if (field.validity.typeMismatch && field.type === "email") {
        setError("Please enter a valid email address.");
      }
    },
    [],
  );

  const resetError = useCallback(() => {
    setError("");
  }, []);

  if (isTextArea) {
    return (
      <>
        <Label
          htmlFor={name}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
          {isRequired && "*"}
        </Label>
        <div>
          <Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            rows={5}
            required={isRequired}
            onInvalid={handleError}
            onInput={resetError}
            className={cn(
              "text-white caret-white bg-transparent outline-none placeholder:text-muted-foreground/50 resize-none field-sizing-fixed rounded-none border-x-0 border-t-0 border-b-white px-0 shadow-none focus-visible:ring-0 focus-visible:border-b-white [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#18181b_inset] [&:-webkit-autofill]:caret-[white]",
              className,
            )}
          />
          <p className="h-5 text-left text-sm leading-5 text-red-500">
            {error || "\u00A0"}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {label && (
        <Label
          htmlFor={name}
          className={"text-sm font-medium text-muted-foreground uppercase"}
        >
          {label}
          {isRequired && "*"}
        </Label>
      )}
      <div>
        <Input
          className={cn(
            "text-white caret-white bg-transparent outline-none transition-colors placeholder:text-muted-foreground/50 focus-visible:ring-0 [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#0a0a0a_inset] [&:-webkit-autofill]:caret-[white]",
            className,
          )}
          id={id}
          name={name}
          onInput={resetError}
          onInvalid={handleError}
          placeholder={placeholder}
          required={isRequired}
          type={type}
          spellCheck={false}
        />
        <p className="h-5 text-left text-sm leading-5 text-red-500">
          {error || "\u00A0"}
        </p>
      </div>
    </>
  );
}
