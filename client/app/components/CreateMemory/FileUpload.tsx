/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

import { API, MemoryMediaUploadType } from "@/api-config/API";
import { LoginUserTypes } from "@/api-config/API";

interface PropTypes {
  user: LoginUserTypes;
  setImages: Dispatch<SetStateAction<MemoryMediaUploadType[]>>;
  imagesLength: number;
}

export default function FileUpload({
  user,
  setImages,
  imagesLength,
}: PropTypes) {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);

  const fileUploader = async (files: FileWithPath[]) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("memory", file);
      }

      const { data } = await API.post<MemoryMediaUploadType[]>(
        "/api/v1/memories/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setImages(data);
      notifications.show({
        title: "🚀 Memory Creation Information 🎉",
        message: `${data.length} images uploaded`,
        color: "indigo",
      });
    } catch (error: any) {
      let err_message;
      if (error instanceof AxiosError) {
        err_message = error.response?.data.message;
      } else {
        err_message = error.message;
      }
      notifications.show({
        title: "🚀 Authentication Alert 🔥",
        message: err_message,
        color: "yellow",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropzone
      onDrop={fileUploader}
      onReject={(files) =>
        notifications.show({
          title: "⚠️ Memory creation Information🔥",
          message: `Only five images can be uploaded but got ${files.length}`,
          color: "yellow",
        })
      }
      maxSize={3 * 1024 ** 2}
      maxFiles={5}
      accept={IMAGE_MIME_TYPE}
      loading={loading}
      name="memory"
      disabled={imagesLength >= 5}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 3mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
