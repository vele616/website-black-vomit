import z from "zod";
import { NextRequest } from "next/server";
import { sendConfirmationEmail, sendEmail } from "@/helper/email";

type RequestBody = z.infer<typeof bodyValidationSchema>;

const bodyValidationSchema = z.object({
  name: z.string(),
  email: z
    .email({ message: "Invalid email adress" })
    .min(1, { message: "Required field" }),
  message: z.string().min(1, { message: "Required field" }),
});

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RequestBody;
  const bodyValidationResult = bodyValidationSchema.safeParse(body);

  if (!body || bodyValidationResult.error) {
    return new Response(
      JSON.stringify({
        message: bodyValidationResult.error?.message || "No body was found",
      }),
      {
        status: 400,
      },
    );
  }

  const { name, email, message } = body;
  try {
    await sendEmail({ name, email, message });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error || "Unknown error",
      }),
      {
        status: 500,
      },
    );
  }

  try {
    await sendConfirmationEmail({ name, email });
  } catch (error) {
    console.warn("There was an error sending the confirmation email", error);
  }

  return new Response(
    JSON.stringify({
      message: "Success",
    }),
    {
      status: 200,
    },
  );
}
