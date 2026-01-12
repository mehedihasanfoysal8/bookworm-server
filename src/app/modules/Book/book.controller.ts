import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (_req, res) => {
  const result = await BookServices.getAllBooks();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Books fetched successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookServices.updateBook(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BookServices.deleteBook(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Book deleted successfully",
    data: null,
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
