import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.JWT_SECRET!;

export const createToken = (data: object): string => {
  return jwt.sign(data, PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
};
