import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import lodash from "lodash";

const prisma = new PrismaClient();
const jwt_secret = process.env.JWT_SECRET as string;
const jwt_expire_in = process.env.JWT_EXPIRE_IN as string;

class UserControllers {
  // TODO: get all users
  async getAllUsers(req: Request, res: Response) {
    res.send("You are welcomed");
  }

  // TODO: create new user
  async createNewUser(req: Request, res: Response) {
    const body = req.body;

    const { email, name, password, username } = await z
      .object({
        name: z.string({ required_error: "❌ Name is required ⚠️" }).trim(),
        username: z
          .string({ required_error: "❌ Unique username is required ⚠️" })
          .toLowerCase()
          .trim(),
        email: z
          .string({ required_error: "❌ Email Address is required ⚠️" })
          .email({ message: "❌ Invalid Email Address ⚠️" })
          .toLowerCase()
          .trim(),

        password: z.string({ required_error: "❌ Password is required ⚠️" }),
      })
      .parse(body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400);
      throw new Error("❌ User already exist ⚠️");
    }

    const hashPass = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, username, email, password: hashPass },
    });

    res.status(201).json(lodash.omit(user, "password"));
  }

  // TODO: login user
  async login(req: Request, res: Response) {
    const body = req.body;

    const { password, email, phone, username } = z
      .object({
        username: z.string().trim().optional(),
        email: z
          .string()
          .email({ message: "❌ Invalid Email Address ⚠️" })
          .trim(),
        phone: z.string().trim().optional(),
        password: z
          .string({ required_error: "❌ Password is required ⚠️" })
          .min(7, "❌ Password is too short ⚠️")
          .max(32, "❌ Password is too long ⚠️"),
      })
      .parse(body);

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }, { username }],
      },
    });

    if (!user) {
      res.status(404);
      throw new Error("❌ Invalid credentials ⚠️");
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      res.status(404);
      throw new Error("❌ Invalid credentials ⚠️");
    }

    const token = jwt.sign(
      lodash.omit(user, ["password", "address", "memories", "Comment"]),
      jwt_secret,
      { expiresIn: jwt_expire_in }
    );

    res.status(200).json({
      token,
      ...lodash.omit(user, ["password", "address", "memories", "Comment"]),
    });
  }
}

export default new UserControllers();
