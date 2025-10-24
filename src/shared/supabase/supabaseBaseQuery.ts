import type {BaseQueryFn} from "@reduxjs/toolkit/query";
import type {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import supabase from "./supabase.api";

type SupabaseQueryArgs = {
  table: string;
  method:
    | "select"
    | "insert"
    | "selectById"
    | "selectByIdPerson"
    | "selectCategories"
    | "insertNewPerson";
  userId?: string | number;
  data?: unknown;
};

type SupabaseResponse =
  | PostgrestResponse<unknown>
  | PostgrestSingleResponse<unknown>;

const supabaseBaseQuery: BaseQueryFn<
  SupabaseQueryArgs,
  unknown,
  unknown
> = async ({table, method, userId, data}) => {
  let response: SupabaseResponse | undefined;
  switch (method) {
    case "select": {
      response = await supabase.from(table).select("*");
      break;
    }
    case "insert": {
      if (!data) {
        return {error: {message: "Missing data for insert"} as unknown};
      }
      response = await supabase.from(table).insert([data]).select();
      break;
    }
    case "selectById": {
      const idValue =
        userId !== undefined && userId !== null ? Number(userId) : undefined;
      if (idValue === undefined || Number.isNaN(idValue)) {
        return {error: {message: "Missing or invalid userId"} as unknown};
      }
      response = await supabase
        .from(table)
        .select("*")
        .eq("person_id", idValue)
        .single();
      break;
    }
    case "selectByIdPerson": {
      const idValue =
        userId !== undefined && userId !== null ? Number(userId) : undefined;
      if (idValue === undefined || Number.isNaN(idValue)) {
        return {error: {message: "Missing or invalid userId"} as unknown};
      }
      response = await supabase
        .from(table)
        .select("*")
        .eq("id", idValue)
        .single();
      break;
    }
    case "selectCategories": {
      response = await supabase.from("person").select("category");
      break;
    }

    default: {
      return {error: {message: "Unsupported method"} as unknown as unknown};
    }
  }
  if (response && response.error) return {error: response.error};
  return {data: response ? response.data : null};
};
export default supabaseBaseQuery;
