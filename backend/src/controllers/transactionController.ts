import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";

export const deposit = async (req: Request, res: Response) => {
  try {
    const { email, amount } = req.body;
    const { status, ...result } = await transactionService.deposit(
      email,
      amount
    );
    return res.status(status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
