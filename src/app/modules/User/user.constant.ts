export const USER_ROLE = {
  superAdmin: "superAdmin",
  admin: "admin",
  user: "user",
} as const;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo?: string;
  role: "user" | "admin";
  isDeleted: boolean;
}

export const UserSearchableFields = ["firstName", "lastName", "email"];
