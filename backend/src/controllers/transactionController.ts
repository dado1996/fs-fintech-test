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

export const transfer = async (req: Request, res: Response) => {
  try {
    const { deliverer, recipient, amount } = req.body;
    console.log(req.user);
    if (deliverer !== (req.user! as { name: string; email: string }).email) {
      return res
        .status(400)
        .json({ message: "The transaction cannot be completed" });
    }
    const { status, ...result } = await transactionService.transfer(
      deliverer,
      recipient,
      amount
    );
    return res.status(status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
