import mongoose from "mongoose";
import { TGenericErrorResponse } from "./error.types";

const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid ID",
    errorSources: [
      {
        path: error.path,
        message: error.message,
      },
    ],
  };
};

export default handleCastError;
