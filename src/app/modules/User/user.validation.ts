import { z } from "zod";

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    photo: z.string().url("Photo must be a valid URL").optional(),
  }),
});

const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum(["admin", "user"]),
  }),
});

export const UserValidation = {
  updateProfileValidationSchema,
  updateUserRoleValidationSchema,
};
