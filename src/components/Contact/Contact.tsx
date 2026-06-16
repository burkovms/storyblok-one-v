"use client";

import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import styles from "./Contact.module.css";
import type { ContactBlok } from "@/components/storyblok/types";

type Status = "idle" | "submitting" | "success";

export default function Contact({ blok = {} as ContactBlok }: { blok?: ContactBlok }) {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    // Simulated submission — wire this up to a real endpoint / Server Action later.
    setTimeout(() => setStatus("success"), 700);
  }

  return (
    <section className={styles.contact} id="contact" {...storyblokEditable(blok)}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          {blok.eyebrow && <span className={styles.eyebrow}>{blok.eyebrow}</span>}
          {blok.title && <h2 className={styles.title}>{blok.title}</h2>}
          {blok.text && <p className={styles.text}>{blok.text}</p>}
          {(blok.email || blok.phone || blok.location) && (
            <ul className={styles.contactList}>
              {blok.email && <li>📧 {blok.email}</li>}
              {blok.phone && <li>📞 {blok.phone}</li>}
              {blok.location && <li>📍 {blok.location}</li>}
            </ul>
          )}
        </div>

        <div className={styles.formWrap}>
          {status === "success" ? (
            <div className={styles.success} role="status">
              <div className={styles.successIcon} aria-hidden>
                ✓
              </div>
              <h3>Thanks — we&apos;ll be in touch!</h3>
              <p>Keep an eye on your inbox for the next steps.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required placeholder="Ada Lovelace" />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ada@company.com"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="We're a 20-person team looking to..."
                />
              </div>
              <button type="submit" className={styles.submit} disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : blok.submit_label || "Request a demo"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
