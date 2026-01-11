import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import AppError from "../errors/appError";
import handleZodError from "../errors/handleZodErrors";
import handleDuplicateError from "../errors/handleDuplicateErrors";
import handleCastError from "../errors/handleCastErrors";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: any = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";
  let errorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // Zod Error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Mongoose duplicate error
  else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Mongoose cast error
  else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // AppError
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
