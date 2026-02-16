import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY as string,
            },
            body: JSON.stringify({
                sender: {
                    name: "Portfolio Contact",
                    email: process.env.CONTACT_TO_EMAIL,
                },
                to: [
                    {
                        email: process.env.CONTACT_TO_EMAIL,
                    },
                ],
                subject: `New Contact Form Message from ${name}`,
                htmlContent: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
            }),
        });

        if (!response.ok) {
            throw new Error("Brevo API error");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
