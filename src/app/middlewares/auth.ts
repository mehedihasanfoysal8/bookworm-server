import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errors/appError";
import config from "../config";
import { TJWTPayload } from "../modules/Auth/auth.interface";

const auth =
  (...requiredRoles: ("user" | "admin")[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_token as string
      ) as TJWTPayload;

      req.user = decoded;

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You have no permission to access this route"
        );
      }

      next();
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
    }
  };

export default auth;
