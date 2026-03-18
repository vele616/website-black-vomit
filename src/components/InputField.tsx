import { InvalidEvent, useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type InputFieldProps = {
  id: string;
  isRequired?: boolean;
  isTextArea?: boolean;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
};

export function InputField({
  id,
  isRequired = false,
  isTextArea = false,
  label,
  name,
  placeholder,
  type,
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
        <Label htmlFor={name} className="text-sm font-medium text-muted-foreground">
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
            className="text-white caret-white placeholder:text-muted-foreground/50 resize-none field-sizing-fixed rounded-none border-x-0 border-t-0 border-b-white bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-b-white [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#18181b_inset] [&:-webkit-autofill]:caret-[white]"
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
      <Label
        htmlFor={name}
        className="text-sm font-medium text-muted-foreground uppercase"
      >
        {label}
        {isRequired && "*"}
      </Label>
      <div>
        <Input
          className="caret-white bg-transparent text-white outline-none transition-colors placeholder:text-muted-foreground/50 py-3 px-0 rounded-none border-x-0 border-t-0 border-b-white shadow-none focus-visible:ring-0 focus-visible:border-b-white [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#0a0a0a_inset] [&:-webkit-autofill]:caret-[white]"
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
