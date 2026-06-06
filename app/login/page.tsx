import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: `Вхід — ${SITE_NAME}`,
};

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg font-bold text-white">
              ТД
            </div>
            <span className="text-xl font-bold text-zinc-900">{SITE_NAME}</span>
          </Link>
          <p className="mt-2 text-sm text-zinc-500">Панель адміністратора</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="mb-6 text-lg font-semibold text-zinc-900">Вхід</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
