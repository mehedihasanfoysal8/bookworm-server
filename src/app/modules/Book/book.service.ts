import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Book } from "./book.model";
import { IBook } from "./book.interface";

const createBook = async (payload: IBook) => {
  const book = await Book.create(payload);
  return book;
};

const getAllBooks = async () => {
  return Book.find().sort({ createdAt: -1 });
};

const updateBook = async (id: string, payload: Partial<IBook>) => {
  const book = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }

  return book;
};

const deleteBook = async (id: string) => {
  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }

  return null;
};

export const BookServices = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
