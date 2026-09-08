import { NextResponse } from "next/server";
import { legalConstants } from "@/lib/legal/constants";
import {
  isAccountDeletionWebFormEnabled,
  validateDeleteAccountRequest,
} from "@/lib/legal/delete-account-request";

interface DeleteAccountRequestBody {
  email?: string;
  confirmed?: boolean;
}

export async function POST(request: Request) {
  if (!isAccountDeletionWebFormEnabled()) {
    return NextResponse.json(
      {
        message:
          "Web obrazac trenutno nije dostupan. Pošaljite email na putalert.app@gmail.com.",
      },
      { status: 503 },
    );
  }

  let body: DeleteAccountRequestBody;

  try {
    body = (await request.json()) as DeleteAccountRequestBody;
  } catch {
    return NextResponse.json(
      { message: "Neispravan zahtjev." },
      { status: 400 },
    );
  }

  const validation = validateDeleteAccountRequest({
    email: body.email ?? "",
    confirmed: Boolean(body.confirmed),
  });

  if (!validation.valid) {
    return NextResponse.json(
      {
        message: "Provjerite unesene podatke i pokušajte ponovo.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.ACCOUNT_DELETION_RESEND_API_KEY?.trim();
  const fromEmail = process.env.ACCOUNT_DELETION_FROM_EMAIL?.trim();

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "Web obrazac trenutno nije dostupan. Pošaljite email na putalert.app@gmail.com.",
      },
      { status: 503 },
    );
  }

  const accountEmail = body.email!.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [legalConstants.putalertEmail],
        subject: "PUTALERT – Zahtjev za brisanje računa",
        text: [
          "Primljen je zahtjev za brisanje PUTALERT računa putem web obrasca.",
          "",
          `Email adresa PUTALERT računa: ${accountEmail}`,
          "",
          "Napomena: Ovo je samo zahtjev za brisanje. Račun nije automatski obrisan.",
        ].join("\n"),
        reply_to: accountEmail,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            "Zahtjev nije mogao biti poslan. Pokušajte ponovo ili pošaljite email.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Zahtjev je zaprimljen.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Zahtjev nije mogao biti poslan. Pokušajte ponovo ili pošaljite email.",
      },
      { status: 502 },
    );
  }
}
