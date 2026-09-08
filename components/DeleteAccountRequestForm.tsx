"use client";

import { useState } from "react";
import {
  buildDeleteAccountMailtoUrl,
  validateDeleteAccountRequest,
} from "@/lib/legal/delete-account-request";
import { legalConstants } from "@/lib/legal/constants";

interface DeleteAccountRequestFormProps {
  webFormEnabled: boolean;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function DeleteAccountRequestForm({
  webFormEnabled,
}: DeleteAccountRequestFormProps) {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    confirmed?: string;
  }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!webFormEnabled) {
    return (
      <section
        className="delete-request-section"
        aria-labelledby="web-request-heading"
      >
        <h2 id="web-request-heading">Web zahtjev za brisanje</h2>
        <p className="delete-request-notice">
          Web obrazac trenutno nije dostupan. Za zahtjev za brisanje računa
          pošaljite email na {legalConstants.putalertEmail}.
        </p>
        <a
          className="button button-primary"
          href={buildDeleteAccountMailtoUrl()}
        >
          Pošalji email
        </a>
      </section>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const validation = validateDeleteAccountRequest({ email, confirmed });
    setFieldErrors(validation.errors);

    if (!validation.valid) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/putalert/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          confirmed,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setSubmitError(
          data.message ??
            "Zahtjev nije mogao biti poslan. Pokušajte ponovo ili pošaljite email.",
        );
        return;
      }

      setStatus("success");
      setEmail("");
      setConfirmed(false);
      setFieldErrors({});
    } catch {
      setStatus("error");
      setSubmitError(
        "Zahtjev nije mogao biti poslan. Pokušajte ponovo ili pošaljite email.",
      );
    }
  }

  return (
    <section
      className="delete-request-section"
      aria-labelledby="web-request-heading"
    >
      <h2 id="web-request-heading">Web zahtjev za brisanje</h2>
      <p>
        Ako više nemate pristup aplikaciji, možete poslati zahtjev za brisanje
        računa putem obrasca ispod. Zahtjev se zaprima radi provjere i obrade;
        brisanje računa nije automatsko nakon slanja zahtjeva.
      </p>

      {status === "success" ? (
        <div className="form-message form-message-success" role="status">
          <p>
            Vaš zahtjev je zaprimljen. Obrada može potrajati. Brisanje računa
            nije automatski završeno nakon slanja zahtjeva.
          </p>
        </div>
      ) : (
        <form className="delete-request-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="delete-account-email">
              Email adresa PUTALERT računa
            </label>
            <input
              id="delete-account-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={
                fieldErrors.email ? "delete-account-email-error" : undefined
              }
              disabled={status === "submitting"}
            />
            {fieldErrors.email ? (
              <p className="form-error" id="delete-account-email-error" role="alert">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label className="checkbox-label" htmlFor="delete-account-confirm">
              <input
                id="delete-account-confirm"
                name="confirmed"
                type="checkbox"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                disabled={status === "submitting"}
              />
              Potvrđujem da želim zatražiti brisanje svog PUTALERT računa.
            </label>
            {fieldErrors.confirmed ? (
              <p className="form-error" role="alert">{fieldErrors.confirmed}</p>
            ) : null}
          </div>

          {submitError ? (
            <p className="form-error" role="alert">{submitError}</p>
          ) : null}

          <button
            className="button button-primary"
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Slanje..." : "Pošalji zahtjev za brisanje"}
          </button>
        </form>
      )}

      <p className="delete-request-alt">
        Alternativno, možete poslati email na{" "}
        <a href={buildDeleteAccountMailtoUrl(email)}>{legalConstants.putalertEmail}</a>.
      </p>
    </section>
  );
}
