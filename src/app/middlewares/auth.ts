import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errors/appError";
import config from "../config";

const auth = (...roles: ("admin" | "user")[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Not authenticated");
    }

    try {
      const decoded = jwt.verify(token, config.jwt_access_token as string) as {
        userId: string;
        email: string;
        role: "admin" | "user";
      };

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "No permission");
      }

      next();
    } catch {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
    }
  };
};

export default auth;
