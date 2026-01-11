import bcrypt from "bcryptjs";
import config from "../config";
import { User } from "../modules/User/user.model";

const superAdmin = async () => {
  const adminEmail = "admin@gmail.com";

  const admin = await User.findOne({ email: adminEmail });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(
      "admin123",
      Number(config.bcrypt_salt_rounds)
    );

    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isDeleted: false,
    });

    console.log("Admin created");
  } else {
    console.log("ℹAdmin already exists");
  }
};

export default superAdmin;
