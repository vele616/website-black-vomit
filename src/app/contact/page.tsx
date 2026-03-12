"use client";

import { CustomCheckbox } from "@/components/CustomCheckbox";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, Send } from "lucide-react";
import { SubmitEvent, useCallback, useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: SubmitEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
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
    } catch (error) {
      console.error("ERROR", error);
      toast.error("An error occurred.", {
        description:
          "There was an error submitting Your form, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <section id="contact" className="scroll-mt-20 bg-background py-10 lg:py-12">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="h-px bg-border" />
      </div>
      <div className="mx-auto max-w-350 px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
              Get in touch
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-balance text-white lg:text-5xl">
              Let&apos;s work together
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Interested in commissioning a piece, purchasing prints, or
              collaborating on a project? I&apos;d love to hear from you. Fill
              out the form and I&apos;ll get back to you within 48 hours.
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
              className="group mt-4 flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors hover:text-muted-foreground"
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
                    placeholder={"Your full name"}
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

                <CustomCheckbox
                  setAgreed={setAgreed}
                  agreed={agreed}
                  name="consent"
                  label={
                    "I consent to the processing of personal data for the purpose of responding to my inquiry."
                  }
                  id="consent"
                  isRequired={true}
                />

                <div className="mt-2">
                  <Button
                    type="submit"
                    className="group relative inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-medium tracking-[0.15em] text-black uppercase hover:text-white disabled:opacity-60 hover:border-white hover:border"
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <div className="flex gap-3">
                        <span>Send Message</span>
                        <Send className="self-center h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    )}
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
