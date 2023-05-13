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
    const files = req.files;
    if (files?.length === 0) {
      res.status(500);
      throw new Error("⚠️ files not found! ❌");
    }

    res.status(200).json(files);
  })
);

memoryRoutes
  .route("/delete-photo")
  .post(
    asyncHandler(authentication),
    asyncHandler(memoryCtrls.deleteMemoryPhoto)
  );
export default memoryRoutes;
