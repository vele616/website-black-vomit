"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { InputField } from "./InputField";

type SubmitStatus = "idle" | "loading" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (status === "loading") return;

    const normalizedEmail = email.trim().toLowerCase();
    const isConsentMissing = !consent;

    if (isConsentMissing) {
      setConsentError("Please check the consent box.");
    } else {
      setConsentError("");
    }

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("This field is required.");
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (isConsentMissing) {
      setStatus("error");
      setMessage("");
      return;
    }

    setStatus("loading");
    setMessage("");
    setConsentError("");

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

      setStatus("idle");
      setMessage("");
      toast.success("Success!", {
        description: "Your request was sent successfully.",
      });
      setEmail("");
    } catch (error) {
      setStatus("error");
      console.error("ERROR", error);
      toast.error("An error occurred.", {
        description:
          "There was an error subscribing to the newslatter, please try again later.",
      });
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value);

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  function handleConsentChange(checked: boolean | "indeterminate") {
    setConsent(checked === true);
    setConsentError("");

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  useEffect(() => {
    setStatus("idle");
    setMessage("");
    setConsentError("");
  }, [pathname]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-3"
    >
      <div className="space-y-1 text-left">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Newsletter
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="w-full sm:flex-1">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            autoComplete="email"
            disabled={status === "loading"}
            className="h-11 w-full rounded-full border border-border/70 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60"
          />
          <InputField
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            className="h-11 w-full rounded-full border border-border/70 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60"
          />
          <p
            role="status"
            aria-live="polite"
            className={`min-h-4 pt-0.5 text-left text-xs ${
              status === "error" ? "text-red-500" : "text-transparent"
            }`}
          >
            {message || "\u00A0"}
          </p>
        </div>
        <Button
          type="submit"
          variant="outline"
          disabled={status === "loading"}
          className="h-11 cursor-pointer rounded-full border-border/70 bg-transparent px-5 text-xs uppercase tracking-[0.3em] text-foreground shadow-none transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Submitting..." : "Subscribe"}
        </Button>
      </div>

      <div className="-mt-[10px]">
        <div className="flex w-full items-center justify-start gap-2 text-xs text-muted-foreground">
          <Checkbox
            id="newsletter-consent"
            checked={consent}
            onCheckedChange={handleConsentChange}
            aria-label="Send me newsletters and occasional updates."
            className="h-4 w-4 rounded border-border/70 data-[state=checked]:bg-foreground data-[state=checked]:text-background"
          />
          <label htmlFor="newsletter-consent" className="cursor-pointer">
            Send me newsletters and occasional updates.
          </label>
        </div>
        <p
          role="status"
          aria-live="polite"
          className={`min-h-4 pt-0.5 text-left text-xs ${
            consentError ? "text-red-500" : "text-transparent"
          }`}
        >
          {consentError || "\u00A0"}
        </p>
      </div>
    </form>
  );
}
