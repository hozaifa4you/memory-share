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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
require("module-alias/register");
// import userRoutes from "@/routes/user-routes";
const user_routes_1 = __importDefault(require("@/routes/user-routes"));
const memory_routes_1 = __importDefault(require("@/routes/memory-routes"));
const error_middleware_1 = require("@/middleware/error-middleware");
// config
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const frontend_origin = process.env.FRONTEND_ORIGIN;
const backend_origin = process.env.BACKEND_ORIGIN;
const app = (0, express_1.default)();
// middleware
const middleware = [
    (0, morgan_1.default)("dev"),
    (0, cors_1.default)({ origin: frontend_origin, credentials: true }),
    express_1.default.json({ limit: "3mb" }),
    express_1.default.urlencoded({ limit: "3mb", extended: false }),
];
app.use(middleware);
// static path
const dirname = path_1.default.resolve();
app.use("/public", express_1.default.static(path_1.default.join(dirname, "/public")));
// TODO: end points
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/memories", memory_routes_1.default);
// error
app.use([error_middleware_1.notFound, error_middleware_1.errorHandler]);
// listen
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is listening on: ${backend_origin}`);
}));
