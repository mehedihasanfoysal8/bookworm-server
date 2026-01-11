import { ZodError } from "zod";
import { TGenericErrorResponse } from "./error.types";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
