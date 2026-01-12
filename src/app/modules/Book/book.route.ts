import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookControllers } from "./book.controller";
import { BookValidation } from "./book.validation";

const router = express.Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(BookValidation.createBookSchema),
  BookControllers.createBook
);

router.get("/", auth("admin"), BookControllers.getAllBooks);

router.patch("/:id", auth("admin"), BookControllers.updateBook);
router.delete("/:id", auth("admin"), BookControllers.deleteBook);

export const BookRoutes = router;
