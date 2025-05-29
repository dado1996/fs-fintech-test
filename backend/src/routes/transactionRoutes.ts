import express from "express";
import authenticate from "../middleware/authMiddleware";
import * as transactionController from "../controllers/transactionController";
import { validate } from "../middleware/validateMiddleware";
import {
  depositSchema,
  transferSchema,
} from "../validations/transactionValidation";

const router = express.Router();

router.post(
  "/deposit",
  authenticate,
  validate(depositSchema, "body"),
  transactionController.deposit
);
router.post(
  "/transfer",
  authenticate,
  validate(transferSchema, "body"),
  transactionController.transfer
);

export default router;
