import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import * as admin from "firebase-admin";
import User from "../models/user";
import { createToken } from "../util/token";

interface RegisterDTO {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export const login = async (email: string, password: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      status: 404,
      message: "Invalid credentials",
    };
  }

  const [salt, key] = user.password.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");

  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  if (!match) {
    return {
      status: 401,
      message: "Invalid credentials",
    };
  }

  const token = createToken({ name: user.name, email: user.email });
  return {
    status: 200,
    data: {
      token,
      email,
      balance: user.balance,
    },
  };
};

export const register = async ({
  name,
  email,
  phone,
  password,
}: RegisterDTO) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return {
      status: 400,
      message: "Email already registered",
    };
  }

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");

  const result = await User.create({
    name,
    email,
    phone: phone || "",
    password: `${salt}:${hashedPassword}`,
    balance: 0.0,
  });

  return {
    status: 201,
    message: "User created",
  };
};
