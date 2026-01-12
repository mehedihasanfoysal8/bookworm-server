import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "./user.model";

const getMyProfile = async (userId: string) => {
  const user = await User.findById(userId).select("name email role photo");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const updateMyProfile = async (
  userId: string,
  payload: { name?: string; photo?: string }
) => {
  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  }).select("name email role photo");

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return updatedUser;
};

export const UserServices = {
  getMyProfile,
  updateMyProfile,
};
