import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String, required: true },
  },
  { timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);
