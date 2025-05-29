import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validate = (
  schema: Joi.ObjectSchema,
  dataType: "body" | "query" | "params"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[dataType];
    const { error } = schema.validate(data);
    if (error) {
      return res
        .status(400)
        .json({
          message: "Error on validation",
          error: error.details.map((item) => item.message),
        });
    }

    next();
  };
};
