"use client";

import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (status === "loading") return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("Email is required.");
      return;
    }

    if (!consent) {
      setStatus("error");
      setMessage("Please confirm newsletter consent.");
      return;
    }

    setStatus("loading");
    setMessage("");

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

      setStatus("success");
      setMessage(data.message || "Successfully subscribed.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to subscribe."
      );
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

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Newsletter
        </p>
        <p className="text-sm text-muted-foreground">
          Quiet updates from the studio.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
          className="h-11 w-full rounded-full border border-border/70 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 sm:flex-1"
        />
        <Button
          type="submit"
          variant="outline"
          disabled={status === "loading"}
          className="h-11 cursor-pointer rounded-full border-border/70 bg-transparent px-5 text-xs uppercase tracking-[0.3em] text-foreground shadow-none transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Submitting..." : "Subscribe"}
        </Button>
      </div>

      <label
        htmlFor="newsletter-consent"
        className="flex items-start gap-2 text-xs text-muted-foreground"
      >
        <Checkbox
          id="newsletter-consent"
          checked={consent}
          onCheckedChange={handleConsentChange}
          className="mt-0.5 h-4 w-4 rounded border-border/70 data-[state=checked]:bg-foreground data-[state=checked]:text-background"
        />
        <span>I agree to receive newsletter emails.</span>
      </label>

      {message ? (
        <p
          role="status"
          className={`text-xs ${
            status === "success" ? "text-muted-foreground" : "text-destructive"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
