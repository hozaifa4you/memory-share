import { Router } from "express";
import asyncHandler from "express-async-handler";

import memoryCtrls from "@/controllers/memory-ctrls";
import { authentication } from "@/middleware/authentication";
import { memoryImageUpload } from "@/middleware/memory-image-upload";

const memoryRoutes = Router();

memoryRoutes
  .route("/create")
  .post(asyncHandler(authentication), asyncHandler(memoryCtrls.createMemory));

memoryRoutes.route("/upload").post(
  asyncHandler(authentication),
  asyncHandler(memoryImageUpload.array("memory", 5)),
  asyncHandler((req, res) => {
    res.send(req.files);
  })
);
export default memoryRoutes;
