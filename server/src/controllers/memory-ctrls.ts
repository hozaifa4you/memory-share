import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

class MemoriesControllers {
  // TODO: create memory
  async createMemory(req: Request, res: Response) {
    const bodyData = req.body;

    const { body, slug, title, images, place } = z
      .object({
        slug: z.string({ required_error: "⚠️ Slug is required 🔥" }).trim(),
        title: z
          .string({ required_error: "⚠️ Title is required 🔥" })
          .max(100, "⚠️ Title is too long 🔥")
          .trim(),
        body: z.string({ required_error: "⚠️ body is required 🔥" }).trim(),
        images: z.string().array().optional(),
        place: z
          .object({
            street: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            country: z.string().optional(),
            zip: z.number().optional(),
          })
          .optional(),
      })
      .parse(bodyData);

    const memory = await prisma.memory.create({
      data: {
        user: { connect: { id: "645da107cb879d3f2e84228f" } },
        body,
        slug,
        title,
        images,
        place: { create: { ...place } },
      },
      include: { place: true, user: true, comments: true },
    });

    res.status(201).json(memory);
  }
}

export default new MemoriesControllers();
