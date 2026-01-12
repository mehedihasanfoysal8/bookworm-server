import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

// User Route only

router.get("/me", auth("admin", "user"), UserControllers.getMyProfile);

router.patch(
  "/me",
  auth("admin", "user"),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserControllers.updateMyProfile
);

// Admin Route only
router.get("/", auth("admin"), UserControllers.getAllUsers);

router.patch(
  "/:id/role",
  auth("admin"),
  validateRequest(UserValidation.updateUserRoleValidationSchema),
  UserControllers.updateUserRole
);

export const UserRoutes = router;
