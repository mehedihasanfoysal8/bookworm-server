import { TGenericErrorResponse } from "./error.types";

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const field: any = Object.keys(error.keyValue)[0];

  return {
    statusCode: 409,
    message: "Duplicate key error",
    errorSources: [
      {
        path: field,
        message: `${field} already exists`,
      },
    ],
  };
};

export default handleDuplicateError;
