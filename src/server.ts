import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";
import superAdmin from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log("DB connection successful");

    superAdmin();

    server = app.listen(config.port || 5001, () => {
      console.log(
        `Bookworm server running on port 🚀': ${config.port || 5001}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
