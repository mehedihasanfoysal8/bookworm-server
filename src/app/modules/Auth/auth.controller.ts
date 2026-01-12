import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: null,
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = req.user;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User info fetched",
    data: user,
  });
});

const logoutUser = catchAsync(async (_req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Logged out successfully",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
};
