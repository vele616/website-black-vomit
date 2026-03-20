"use client";

import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { InputField } from "./InputField";
import { CustomCheckbox } from "./CustomCheckbox";

export function NewsletterForm() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const em = String(formData.get("email"));

    const normalizedEmail = em.trim().toLowerCase();

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      let data: { message?: string; error?: string } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      toast.success("Success!", {
        description: "Your request was sent successfully.",
      });
      form.reset();
    } catch (error) {
      console.error("ERROR", error);
      toast.error("An error occurred.", {
        description:
          "There was an error subscribing to the newslatter, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
      <div className="space-y-1 text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Newsletter
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="w-full sm:flex-1">
          <InputField
            key={`newsletter-email-${pathname}`}
            ariaLabel="Email"
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            isRequired
            autoComplete="email"
            disabled={isLoading}
            className="h-11 w-full rounded-full border border-border/70 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          disabled={isLoading}
          className="h-11 cursor-pointer rounded-full border-border/70 bg-transparent px-5 text-xs uppercase tracking-[0.3em] text-foreground shadow-none transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Subscribe"}
        </Button>
      </div>

      <div className="-mt-2.5">
        <div className="flex w-full items-center justify-start gap-2 text-xs text-muted-foreground">
          <CustomCheckbox
            key={`newsletter-consent-${pathname}`}
            disabled={isLoading}
            id="newsletter-consent"
            isRequired={true}
            label="Send me newsletters and occasional updates."
            name="newsletter-consent"
          />
        </div>
      </div>
    </form>
  );
}
