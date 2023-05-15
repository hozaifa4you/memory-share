"use client";
/* eslint-disable @next/next/no-img-element */
import { ActionIcon, Box, Grid, Image, Text } from "@mantine/core";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { IconTrashX } from "@tabler/icons-react";
import "react-photo-view/dist/react-photo-view.css";

import { MemoryMediaUploadType } from "@/api-config/API";

interface PropTypes {
  images: MemoryMediaUploadType[];
  deletePhoto: (photoName: string) => void;
  isLoading: { isLoading: boolean; id: string };
}

const backend_origin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN as string;

const UploadedImage = ({ images, deletePhoto, isLoading }: PropTypes) => {
  return (
    <PhotoProvider
      toolbarRender={({ rotate, onRotate, onScale, scale }) => {
        return (
          <>
            <svg
              className="PhotoView-Slider__toolbarIcon"
              width="44"
              height="44"
              viewBox="0 0 768 768"
              fill="white"
              onClick={() => onScale(scale + 0.5)}
            >
              <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
            </svg>
            <svg
              className="PhotoView-Slider__toolbarIcon"
              width="44"
              height="44"
              viewBox="0 0 768 768"
              fill="white"
              onClick={() => onScale(scale - 0.5)}
            >
              <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
            </svg>
            <svg
              className="PhotoView-Slider__toolbarIcon"
              onClick={() => onRotate(rotate + 90)}
              width="44"
              height="44"
              fill="white"
              viewBox="0 0 768 768"
            >
              <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
            </svg>
          </>
        );
      }}
      speed={() => 800}
      easing={(type) =>
        type === 2
          ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
          : "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }
      loop
    >
      <Grid>
        {images?.map((image) => (
          <Grid.Col xs={6} key={image.filename}>
            <Box
              sx={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" sx={{ gap: 5, alignItems: "center" }}>
                <PhotoView
                  src={`${backend_origin}/public/memory/${image.filename}`}
                >
                  <Box sx={{ position: "relative", cursor: "pointer" }}>
                    <Image
                      src={`${backend_origin}/public/memory/${image.filename}`}
                      alt={`${image.filename}`}
                      height={50}
                      fit="contain"
                    />
                  </Box>
                </PhotoView>
                <Text color="dimmed">{image.originalname}</Text>
              </Box>
              <ActionIcon
                variant="outline"
                color="red"
                onClick={() => deletePhoto(image.filename)}
                loading={isLoading.isLoading && isLoading.id === image.filename}
              >
                <IconTrashX size={20} />
              </ActionIcon>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </PhotoProvider>
  );
};

export default UploadedImage;
