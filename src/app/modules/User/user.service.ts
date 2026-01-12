import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "./user.model";
import { TUserRole } from "./user.interface";

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

const getAllUsers = async () => {
  const users = await User.find({ isDeleted: false }).select(
    "name email role photo"
  );

  return users;
};

const updateUserRole = async (userId: string, role: TUserRole) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  user.role = role;
  await user.save();

  return {
    id: user._id,
    role: user.role,
  };
};

export const UserServices = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserRole,
};
