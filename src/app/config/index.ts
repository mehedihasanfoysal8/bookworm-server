import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  origins: process.env.ORIGINS,
  database_url: process.env.Database_Url,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_access_expires_in_customer: process.env.JWT_ACCESS_EXPIRES_IN_Customer,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
