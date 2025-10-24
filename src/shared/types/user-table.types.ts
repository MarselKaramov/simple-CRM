export interface IUserTable {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  category: "A" | "B" | "C" | "D";
  toInfo: string;
}

export type CreateUserData = Pick<
  IUserTable,
  "first_name" | "last_name" | "email" | "category" | "gender"
>;
