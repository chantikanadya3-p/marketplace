"use client";

import {
  type FormEvent,
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
      className="bg-[#F8FAFC] px-5 py-10 sm:px-8 sm:py-16"
    >
      <div className="mx-auto w-full max-w-xl text-center">
        <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">
          Stay Updated
        </h2>

        <p className="mx-auto mt-3 max-w-[280px] text-[11px] leading-4 text-slate-500 sm:mt-4 sm:max-w-none sm:text-sm sm:leading-5">
          Subscribe to receive notifications
          about new inventory and special offers
        </p>

        {isSubmitted ? (
          <div className="mx-auto mt-5 flex h-12 w-full max-w-md items-center justify-center gap-2 rounded-md bg-emerald-50 px-4 text-xs font-medium text-emerald-700 sm:mt-6 sm:h-11 sm:text-sm">
            <CheckCircle2
              size={16}
              aria-hidden="true"
            />

            <span>
              Thank you for subscribing!
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3"
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
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder="Email address"
              className="h-12 w-full min-w-0 shrink-0 appearance-none rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#17365f] focus:ring-1 focus:ring-[#17365f] sm:h-11 sm:flex-1 sm:shrink"
            />

            <button
              type="submit"
              className="h-12 w-full shrink-0 rounded-md bg-[#17365f] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#102947] focus:outline-none focus:ring-2 focus:ring-[#17365f] focus:ring-offset-2 sm:h-11 sm:w-auto sm:px-7"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}