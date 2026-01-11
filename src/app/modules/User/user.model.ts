import mongoose, { model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new mongoose.Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<TUser>("User", userSchema);
