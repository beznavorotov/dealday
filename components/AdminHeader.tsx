import Link from "next/link";
import { signOut } from "@/lib/actions/auth";
import { SITE_NAME } from "@/lib/constants";

export default function AdminHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-bold text-zinc-900">
            {SITE_NAME} — Адмін
          </Link>
          <nav className="hidden gap-4 text-sm sm:flex">
            <Link
              href="/admin"
              className="text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Магазини
            </Link>
            <Link
              href="/admin/create"
              className="text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Створити
            </Link>
            <Link
              href="/"
              className="text-zinc-600 transition-colors hover:text-zinc-900"
            >
              На сайт
            </Link>
          </nav>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            Вийти
          </button>
        </form>
      </div>
    </header>
  );
}
