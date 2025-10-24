import supabaseBaseQuery from "@/shared/supabase/supabaseBaseQuery";
import type {IUserTable} from "@/shared/types/user-table.types";
import type {IUserInfo} from "@/shared/types/user-info.types";
import {createApi} from "@reduxjs/toolkit/query/react";

export const userInfoData = createApi({
  reducerPath: "getUserTableData",
  baseQuery: supabaseBaseQuery,

  endpoints: (build) => ({
    fetchUserById: build.query<IUserInfo, string>({
      query: (userId) => ({table: "person_info", method: "selectById", userId}),
    }),
    fetchPersonalInfo: build.query<IUserTable, string>({
      query: (userId) => ({
        table: "person",
        method: "selectByIdPerson",
        userId,
      }),
    }),
  }),
});

export const {useFetchUserByIdQuery, useFetchPersonalInfoQuery} = userInfoData;
