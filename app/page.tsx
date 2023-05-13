"use client";
import { Text } from "@mantine/core";

import { useAppSelector } from "@/redux/hooks";
import {} from "@/redux/store";

export default function Home() {
  const { user } = useAppSelector((state) => state.authentication);
  console.log("🔥🔥🔥 main page user: ", user);

  return (
    <main>
      <Text color="orange">Hello World</Text>
    </main>
  );
}
