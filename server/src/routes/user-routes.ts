import { Router } from "express";
import asyncHandler from "express-async-handler";

import userCtrls from "@/controllers/user-ctrls";

const userRoutes = Router();

userRoutes
  .route("/")
  .get(asyncHandler(userCtrls.getAllUsers))
  .post(asyncHandler(userCtrls.createNewUser));

export default userRoutes;
