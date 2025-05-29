import express from "express";
import * as authController from "../controllers/authController";
import { validate } from "../middleware/validateMiddleware";
import registerValidation from "../validations/registerValidation";

const router = express.Router();

router.post("/login", authController.login);
router.post(
  "/register",
  validate(registerValidation, "body"),
  authController.register
);

export default router;
