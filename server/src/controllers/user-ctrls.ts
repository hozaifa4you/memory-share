import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class UserControllers {
  // TODO: get all users
  async getAllUsers(req: Request, res: Response) {
    res.send("You are welcomed");
  }

  // create new user
  async createNewUser(req: Request, res: Response) {
    const body = req.body;

    const { email, name, password, phone, username } = await z
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
        phone: z.string().trim().optional(),
        password: z.string({ required_error: "❌ Password is required ⚠️" }),
      })
      .parse(body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username, email, phone }],
      },
    });

    if (existingUser) {
      res.status(400);
      throw new Error("❌ User already exist ⚠️");
    }

    const hashPass = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, username, email, password: hashPass, phone },
    });

    res.status(201).json({ success: true, user });
  }
}

export default new UserControllers();
