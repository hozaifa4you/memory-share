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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const prisma = new client_1.PrismaClient();
const jwt_secret = process.env.JWT_SECRET;
const jwt_expire_in = process.env.JWT_EXPIRE_IN;
class UserControllers {
    // TODO: get all users
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("You are welcomed");
        });
    }
    // TODO: create new user
    createNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const { email, name, password, username } = yield zod_1.z
                .object({
                name: zod_1.z.string({ required_error: "❌ Name is required ⚠️" }).trim(),
                username: zod_1.z
                    .string({ required_error: "❌ Unique username is required ⚠️" })
                    .toLowerCase()
                    .trim(),
                email: zod_1.z
                    .string({ required_error: "❌ Email Address is required ⚠️" })
                    .email({ message: "❌ Invalid Email Address ⚠️" })
                    .toLowerCase()
                    .trim(),
                password: zod_1.z.string({ required_error: "❌ Password is required ⚠️" }),
            })
                .parse(body);
            const existingUser = yield prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }],
                },
            });
            if (existingUser) {
                res.status(400);
                throw new Error("❌ User already exist ⚠️");
            }
            const hashPass = yield bcryptjs_1.default.hash(password, 12);
            const user = yield prisma.user.create({
                data: { name, username, email, password: hashPass },
            });
            res.status(201).json(lodash_1.default.omit(user, "password"));
        });
    }
    // TODO: login user
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const { password, email, phone, username } = zod_1.z
                .object({
                username: zod_1.z.string().trim().optional(),
                email: zod_1.z
                    .string()
                    .email({ message: "❌ Invalid Email Address ⚠️" })
                    .trim(),
                phone: zod_1.z.string().trim().optional(),
                password: zod_1.z
                    .string({ required_error: "❌ Password is required ⚠️" })
                    .min(7, "❌ Password is too short ⚠️")
                    .max(32, "❌ Password is too long ⚠️"),
            })
                .parse(body);
            const user = yield prisma.user.findFirst({
                where: {
                    OR: [{ email }, { phone }, { username }],
                },
            });
            if (!user) {
                res.status(404);
                throw new Error("❌ Invalid credentials ⚠️");
            }
            const isPassCorrect = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPassCorrect) {
                res.status(404);
                throw new Error("❌ Invalid credentials ⚠️");
            }
            const token = jsonwebtoken_1.default.sign(lodash_1.default.omit(user, [
                "password",
                "address",
                "memories",
                "Comment",
                "addressId",
                "address",
            ]), jwt_secret, { expiresIn: jwt_expire_in });
            res.status(200).json(Object.assign({ token }, lodash_1.default.omit(user, ["password", "address", "memories", "Comment"])));
        });
    }
}
exports.default = new UserControllers();
