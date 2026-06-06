"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { todayIsoDate } from "@/lib/utils/date";
import type { Store, StoreFormData } from "@/types/store";

function parseDisplayOrder(value: number): number {
  return Number.isFinite(value) ? Math.trunc(value) : 0;
}

function toCreatePayload(formData: StoreFormData) {
  return {
    name: formData.name.trim(),
    category: formData.category,
    image_url: formData.image_url,
    logo_url: formData.logo_url.trim() || null,
    product_url: formData.product_url || null,
    is_deal_active: formData.is_deal_active,
    deal_date: formData.is_deal_active ? todayIsoDate() : null,
    display_order: parseDisplayOrder(formData.display_order),
  };
}

function toDealUpdatePayload(formData: StoreFormData) {
  return {
    image_url: formData.image_url,
    logo_url: formData.logo_url.trim() || null,
    product_url: formData.product_url || null,
    is_deal_active: formData.is_deal_active,
    deal_date: formData.is_deal_active ? todayIsoDate() : null,
    display_order: parseDisplayOrder(formData.display_order),
  };
}

async function findStoreByName(name: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("stores")
    .select("id")
    .eq("name", name.trim())
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

async function requireAuth() {
  await requireUser();
  return createClient();
}

export async function getStores(): Promise<Store[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Store[];
}

export async function getStoreById(id: string): Promise<Store> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Store;
}

export async function createStore(formData: StoreFormData) {
  const existing = await findStoreByName(formData.name);
  if (existing) {
    throw new Error("Магазин з такою назвою вже існує. Оновіть існуючий запис.");
  }

  const supabase = await requireAuth();
  const { error } = await supabase
    .from("stores")
    .insert(toCreatePayload(formData));

  if (error) {
    if (error.code === "23505") {
      throw new Error("Магазин з такою назвою вже існує. Оновіть існуючий запис.");
    }
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateStore(id: string, formData: StoreFormData) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("stores")
    .update(toDealUpdatePayload(formData))
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteStore(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("stores").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function incrementStoreClicks(storeId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.rpc("increment_store_clicks", {
    store_id: storeId,
  });

  if (error) throw new Error(error.message);
}

export async function toggleDealActive(id: string, isActive: boolean) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("stores")
    .update({
      is_deal_active: isActive,
      deal_date: isActive ? todayIsoDate() : null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

