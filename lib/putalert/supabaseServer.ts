import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  getPutalertSupabaseAnonKey,
  getPutalertSupabaseServiceRoleKey,
  getPutalertSupabaseUrl,
} from "@/lib/putalert/config";

export function createPutalertAnonClient(): SupabaseClient | null {
  const url = getPutalertSupabaseUrl();
  const anonKey = getPutalertSupabaseAnonKey();

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function createPutalertServiceRoleClient(): SupabaseClient | null {
  const url = getPutalertSupabaseUrl();
  const serviceRoleKey = getPutalertSupabaseServiceRoleKey();

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
