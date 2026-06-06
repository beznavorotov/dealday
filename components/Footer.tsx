import Link from "next/link";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_TELEGRAM,
  SITE_TELEGRAM_URL,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-3 py-8 min-[375px]:px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-xs font-bold text-white">
              ТД
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">{SITE_NAME}</p>
              <p className="text-xs text-zinc-400">Щоденні товари від магазинів</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="transition-colors hover:text-orange-600"
            >
              {SITE_EMAIL}
            </a>
            <a
              href={SITE_TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-orange-600"
            >
              {SITE_TELEGRAM}
            </a>
            <Link
              href="/login"
              className="transition-colors hover:text-orange-600"
            >
              Адмін
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} {SITE_NAME}. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}
