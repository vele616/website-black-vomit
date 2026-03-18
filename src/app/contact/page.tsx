"use client";

import { CustomCheckbox } from "@/components/CustomCheckbox";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SubmitEvent, useCallback, useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [consentError, setConsentError] = useState("");

  const handleAgreedChange = useCallback((value: boolean) => {
    setAgreed(value);
    if (consentError) {
      setConsentError("");
    }
  }, [consentError]);

  const handleSubmit = useCallback(async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreed) {
      setConsentError("This field is required.");
      return;
    }

    if (consentError) {
      setConsentError("");
    }

    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      message: String(formData.get("message")),
    };
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.status !== 200) {
        const data = await res.json();
        throw new Error(JSON.stringify(data.message));
      }
      toast.success("Success!", {
        description: "Your request was sent successfully.",
      });
      form.reset();
      setAgreed(false);
      setConsentError("");
    } catch (error) {
      console.error("ERROR", error);
      toast.error("An error occurred.", {
        description:
          "There was an error submitting Your form, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [agreed, consentError]);

  const handleSubmitButtonClick = useCallback(() => {
    if (!agreed) {
      setConsentError("Please check the consent box.");
    }
  }, [agreed]);

  return (
    <section id="contact" className="scroll-mt-20 bg-background py-10 lg:py-12">
      <div className="mx-auto max-w-350 px-6 pb-0 pt-0 lg:px-10 lg:pb-0 lg:pt-0">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-tight text-balance text-white lg:text-3xl">
              Get in touch
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              For inquiries or collaborations, please use the contact form.
              Feel free to reach out and I&apos;ll get back to you as soon as
              possible.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                or email directly
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <a
              href="mailto:bv.design@hotmail.com"
              className="group mt-4 flex items-center justify-center gap-0 text-sm font-medium text-white transition-colors hover:text-muted-foreground"
            >
              bv.design@hotmail.com
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="col-start-2 p-6 md:p-8">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <InputField
                    id={"name"}
                    isRequired={true}
                    label={"Name"}
                    name={"name"}
                    placeholder={"Your name"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <InputField
                    id={"email"}
                    isRequired={true}
                    label={"Email"}
                    name={"email"}
                    placeholder={"your@email.com"}
                    type={"email"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <InputField
                    id={"message"}
                    isRequired={true}
                    isTextArea={true}
                    label={"Message"}
                    name={"message"}
                    placeholder={"Tell me about your project..."}
                  />
                </div>

                <div className="-mt-[9px]">
                  <CustomCheckbox
                    setAgreed={handleAgreedChange}
                    agreed={agreed}
                    label={
                      "I consent to the processing of personal data for the purpose of responding to my inquiry."
                    }
                    id="consent"
                  />
                  <p
                    aria-live="polite"
                    className="h-5 text-left text-sm leading-5 text-red-500"
                  >
                    {consentError || "\u00A0"}
                  </p>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="outline"
                    onClick={handleSubmitButtonClick}
                    disabled={isLoading}
                    className="h-11 cursor-pointer rounded-full border-border/70 bg-transparent px-5 text-xs uppercase tracking-[0.3em] text-foreground shadow-none transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Submitting..." : "Send Message"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
