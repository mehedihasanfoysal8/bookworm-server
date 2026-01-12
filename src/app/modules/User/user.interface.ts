import { Model } from "mongoose";
export type TUserRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  photo?: string;
  role: TUserRole;
  isDeleted?: boolean;
};

export type UserModel = Model<TUser>;
