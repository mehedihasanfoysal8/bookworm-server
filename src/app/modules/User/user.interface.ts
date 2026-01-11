import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  photo?: string;
  role?: "user" | "admin";
  isDeleted?: boolean;
};

export type UserModel = Model<TUser>;
