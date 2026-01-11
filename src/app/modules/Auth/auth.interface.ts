export type TLoginUser = {
  email: string;
  password: string;
};

export type TJWTPayload = {
  userId: string;
  email: string;
  role: "user" | "admin";
};
