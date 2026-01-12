import { z } from "zod";

const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    genre: z.string().min(1),
    description: z.string().optional(),
    coverImage: z.string().url(),
  }),
});

export const BookValidation = {
  createBookSchema,
};
