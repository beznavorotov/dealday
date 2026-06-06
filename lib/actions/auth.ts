"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  if (!data.session) {
    return {
      success: false,
      error: "Сесію не створено. Перевірте налаштування Supabase Auth.",
    };
  }

  return {
    success: true,
  };
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}
