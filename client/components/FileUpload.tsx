/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

import { API, MemoryMediaUploadType } from "@/api-config/API";
import { selectLogin } from "@/redux/slices/authSlices";
import { useAppSelector } from "@/redux/hooks";
import { ReduxProvider } from "@/redux/ReduxProvider";

export default function FileUpload() {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector(selectLogin);

  const fileUploader = async (files: FileWithPath[]) => {
    console.log("🚀🚀🚀 files", files);
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

      console.log("🔥🔥🔥 return uploaded data", data);
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
      onReject={(files) => console.log("❌❌❌ rejected files ", files)}
      maxSize={3 * 1024 ** 2}
      maxFiles={5}
      accept={IMAGE_MIME_TYPE}
      loading={loading}
      name="memory"
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
