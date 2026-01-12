import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getMyProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getMyProfile(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateMyProfile(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const result = await UserServices.updateUserRole(id as string, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User role updated successfully",
    data: result,
  });
});

export const UserControllers = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserRole,
};
