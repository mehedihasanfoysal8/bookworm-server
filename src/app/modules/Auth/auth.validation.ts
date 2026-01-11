import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),

    password: z.string().nonempty("Password is required"),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    photo: z.string().optional(),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
};
