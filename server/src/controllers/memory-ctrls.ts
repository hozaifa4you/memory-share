import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import fs from "fs";
import slug from "slug";
import crypto from "crypto";

const prisma = new PrismaClient();

class MemoriesControllers {
  // TODO: create memory
  async createMemory(req: Request, res: Response) {
    const bodyData = req.body;

    const { body, slug, title, images, place, category, tags } = z
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
            zip: z.string().optional(),
          })
          .optional(),
        tags: z.string({ required_error: "⚠️ Tags name is required 🔥" }),
        category: z.string({ required_error: "⚠️ category is required 🔥" }),
      })
      .parse(bodyData);

    const tagsArr = tags.split(",");

    const memory = await prisma.memory.create({
      data: {
        user: { connect: { id: "645da107cb879d3f2e84228f" } },
        body,
        slug,
        title,
        images,
        category,
        tags: tagsArr,
        place: { create: { ...place } },
      },
      include: {
        place: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            userType: true,
            email: true,
            avatar: true,
          },
        },
        comments: true,
      },
    });

    res.status(201).json(memory);
  }

  // TODO: delete photo
  async deleteMemoryPhoto(req: Request, res: Response, next: NextFunction) {
    const photoName = req.query.photoName;

    if (!photoName) {
      res.status(404);
      throw new Error("⚠️ Photo name not found! 🔥");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.stat(`./public/memory/${photoName}`, function (err, state) {
      if (err) return next(err);
      else {
        fs.unlink(`./public/memory/${photoName}`, function (err) {
          if (err) return next(err);
          else {
            res.status(200).json({ success: true, photoName });
          }
        });
      }
    });
  }

  // TODO: slug generator
  async slugGenerator(req: Request, res: Response) {
    const slugBody = req.body.slug;

    if (!slug) {
      res.status(500);
      throw new Error("⚠️ Slug not found 🐼");
    }
    let generatedSlug = slug(slugBody, "-");

    const isExistingSlug = await prisma.memory.findFirst({
      where: { slug: generatedSlug },
    });

    if (isExistingSlug) {
      generatedSlug =
        generatedSlug + "-" + crypto.randomBytes(5).toString("hex");
    }

    res.status(201).json({ success: true, slug: generatedSlug });
  }
}

export default new MemoriesControllers();
