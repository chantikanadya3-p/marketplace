"use client";

import {
  FormEvent,
  useState,
} from "react";
import { CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!email.trim()) return;

    setIsSubmitted(true);
    setEmail("");

    window.setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
  <section
    id="contact"
    className="bg-[#F8FAFC] px-5 py-8 sm:px-8 sm:py-16"
  >
    <div className="mx-auto max-w-xl text-center">
      <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">
        Stay Updated
      </h2>

      <p className="mx-auto mt-3 max-w-[260px] text-[11px] leading-4 text-slate-500 sm:mt-4 sm:max-w-none sm:text-sm sm:leading-5">
        Subscribe to receive notifications about new
        inventory and special offers
      </p>

      {isSubmitted ? (
        <div className="mx-auto mt-5 flex h-9 max-w-md items-center justify-center gap-2 rounded-md bg-emerald-50 px-4 text-xs font-medium text-emerald-700 sm:mt-6 sm:h-11 sm:text-sm">
          <CheckCircle2 size={16} />
          Thank you for subscribing!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-5 flex w-full max-w-md flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3"
        >
          <label
            htmlFor="newsletter-email"
            className="sr-only"
          >
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Email address"
            className="h-9 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#17365f] sm:h-11 sm:px-4 sm:text-sm"
          />

          <button
            type="submit"
            className="h-9 w-full rounded-md bg-[#17365f] px-6 text-xs font-semibold text-white transition-colors hover:bg-[#102947] sm:h-11 sm:w-auto sm:px-7 sm:text-sm"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  </section>
);
}