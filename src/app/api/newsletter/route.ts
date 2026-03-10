import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const { data: contact, error: contactError } =
      await resend.contacts.create({
        email,
      });

    if (contactError) {
      const message =
        typeof contactError === "string"
          ? contactError
          : JSON.stringify(contactError);

      if (
        message.toLowerCase().includes("already exists") ||
        message.toLowerCase().includes("conflict")
      ) {
        await resend.contacts.segments.add({
          email,
          segmentId: process.env.RESEND_SEGMENT_ID!,
        });

        return NextResponse.json({
          success: true,
          message: "Email already subscribed.",
        });
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    await resend.contacts.segments.add({
      contactId: contact!.id,
      segmentId: process.env.RESEND_SEGMENT_ID!,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to subscribe." },
      { status: 500 }
    );
  }
}