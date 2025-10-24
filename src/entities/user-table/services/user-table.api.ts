import supabaseBaseQuery from "@/shared/supabase/supabaseBaseQuery";
import type {CreateUserData, IUserTable} from "@/shared/types/user-table.types";
import {createApi} from "@reduxjs/toolkit/query/react";

export const userTableData = createApi({
  reducerPath: "userTableData",
  baseQuery: supabaseBaseQuery,
  endpoints: (build) => ({
    fetchUserTableData: build.query<IUserTable[], void>({
      query: () => ({table: "person", method: "select"}),
    }),
    createUser: build.mutation<IUserTable, CreateUserData>({
      query: (userData) => ({
        table: "person",
        method: "insert",
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          gender: userData.gender,
          email: userData.email,
          category: userData.category,
        },
      }),
    }),
  }),
});

export const {useFetchUserTableDataQuery, useCreateUserMutation} =
  userTableData;
