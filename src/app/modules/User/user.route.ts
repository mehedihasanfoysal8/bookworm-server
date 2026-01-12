import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/me", auth("admin", "user"), UserControllers.getMyProfile);

router.patch(
  "/me",
  auth("admin", "user"),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserControllers.updateMyProfile
);

export const UserRoutes = router;
