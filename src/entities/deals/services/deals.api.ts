import supabaseBaseQuery from "@/shared/supabase/supabaseBaseQuery";
import type {IDeal} from "@/shared/types/deals.types";
import {createApi} from "@reduxjs/toolkit/query/react";

export const dealsData = createApi({
  reducerPath: "dealsData",
  baseQuery: supabaseBaseQuery,
  endpoints: (build) => ({
    getDeals: build.query<IDeal[], void>({
      query: () => ({table: "deals", method: "getAllDeals"}),
    }),
  }),
});

export const {useGetDealsQuery} = dealsData;
