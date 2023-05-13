import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import fs from "fs";

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

  // TODO: delete photo
  async deleteMemoryPhoto(req: Request, res: Response, next: NextFunction) {
    const photoName = req.params.photoName;

    if (!photoName) {
      res.status(404);
      throw new Error("⚠️ Photo name not found! 🔥");
    }

    fs.stat(`./public/memory/${photoName}`, function (err, state) {
      if (err) return next(err);
      else {
        console.log("🐼🐼🐼 delete photo state: ", state);
        fs.unlink(`./public/memory/${photoName}`, function (err) {
          if (err) return next(err);
          else {
            res.status(200).json({ success: true, photoName });
          }
        });
      }
    });
  }
}

export default new MemoriesControllers();
