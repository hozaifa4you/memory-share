import { Router } from "express";
import asyncHandler from "express-async-handler";

import memoryCtrls from "@/controllers/memory-ctrls";
import { authentication, readPermission } from "@/middleware/authentication";
import { memoryImageUpload } from "@/middleware/memory-image-upload";

const memoryRoutes = Router();

memoryRoutes
  .route("/create")
  .post(asyncHandler(authentication), asyncHandler(memoryCtrls.createMemory));

memoryRoutes
  .route("/get-all")
  .get(asyncHandler(readPermission), asyncHandler(memoryCtrls.getAllMemories));

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
  .route("/memory-details/:slug")
  .get(asyncHandler(readPermission), asyncHandler(memoryCtrls.memoryDetails));

memoryRoutes
  .route("/delete-photo")
  .delete(
    asyncHandler(authentication),
    asyncHandler(memoryCtrls.deleteMemoryPhoto)
  );

memoryRoutes
  .route("/slug")
  .post(asyncHandler(authentication), asyncHandler(memoryCtrls.slugGenerator));
export default memoryRoutes;
