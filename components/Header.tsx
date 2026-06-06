import Link from "next/link";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_TELEGRAM,
  SITE_TELEGRAM_URL,
} from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 min-[375px]:px-4 min-[375px]:py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 min-[375px]:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-transform group-hover:scale-105 min-[375px]:h-10 min-[375px]:w-10 min-[375px]:text-base">
            ТД
          </div>
          <div className="min-w-0">
            <span className="block truncate text-base font-bold tracking-tight text-zinc-900 min-[375px]:text-lg sm:text-xl">
              {SITE_NAME}
            </span>
            <span className="hidden text-xs text-zinc-400 sm:block">
              Щоденні пропозиції
            </span>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2 min-[430px]:gap-4">
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-orange-600 min-[430px]:inline-flex"
          >
            <MailIcon />
            <span className="hidden lg:inline">{SITE_EMAIL}</span>
            <span className="lg:hidden">Email</span>
          </a>
          <a
            href={SITE_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1.5 text-sm font-medium text-orange-600 transition-all hover:bg-orange-100 hover:text-orange-700 min-[375px]:px-3"
          >
            <TelegramIcon />
            <span className="hidden min-[430px]:inline">{SITE_TELEGRAM}</span>
            <span className="min-[430px]:hidden">TG</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function MailIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}
