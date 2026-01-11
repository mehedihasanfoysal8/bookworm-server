import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import AppError from "../../errors/appError";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";
import { User } from "../User/user.model";
import { TUser } from "../User/user.interface";

const registerUser = async (payload: TUser) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User already exists with this email"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
    role: "user",
    isDeleted: false,
  });

  const userObj = user.toObject();

  return userObj;
};

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  console.log({ email, password });

  const user = await User.findOne({ email });
  console.log("user", user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password does not match!");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  registerUser,
};
