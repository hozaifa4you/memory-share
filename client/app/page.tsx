"use client";
import { Text } from "@mantine/core";

import { useAppSelector } from "@/redux/hooks";

export const metadata = {
  title: "Memories | Share your outstanding memories",
  description: "Share your memories across the globe with thousand of people",
};

export default function Home() {
  const { user } = useAppSelector((state) => state.authentication);
  console.log("🔥🔥🔥 main page user: ", user);

  return (
    <main>
      <Text color="orange">Hello World</Text>
    </main>
  );
}
