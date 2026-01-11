import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: JwtPayload,
  secret: Secret,
  expiresIn: any
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};
