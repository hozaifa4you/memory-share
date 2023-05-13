"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
class MemoriesControllers {
    // TODO: create memory
    createMemory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyData = req.body;
            const { body, slug, title, images, place } = zod_1.z
                .object({
                slug: zod_1.z.string({ required_error: "⚠️ Slug is required 🔥" }).trim(),
                title: zod_1.z
                    .string({ required_error: "⚠️ Title is required 🔥" })
                    .max(100, "⚠️ Title is too long 🔥")
                    .trim(),
                body: zod_1.z.string({ required_error: "⚠️ body is required 🔥" }).trim(),
                images: zod_1.z.string().array().optional(),
                place: zod_1.z
                    .object({
                    street: zod_1.z.string().optional(),
                    city: zod_1.z.string().optional(),
                    state: zod_1.z.string().optional(),
                    country: zod_1.z.string().optional(),
                    zip: zod_1.z.number().optional(),
                })
                    .optional(),
            })
                .parse(bodyData);
            const memory = yield prisma.memory.create({
                data: {
                    user: { connect: { id: "645da107cb879d3f2e84228f" } },
                    body,
                    slug,
                    title,
                    images,
                    place: { create: Object.assign({}, place) },
                },
                include: { place: true, user: true, comments: true },
            });
            res.status(201).json(memory);
        });
    }
}
exports.default = new MemoriesControllers();
