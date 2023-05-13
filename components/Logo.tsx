"use client";
import React from "react";
import { Box, Title, useMantineTheme } from "@mantine/core";
import { IconBrand4chan } from "@tabler/icons-react";

const Logo = () => {
  const theme = useMantineTheme();

  return (
    <Box display="flex" style={{ alignItems: "center", gap: 3 }}>
      <IconBrand4chan color={theme.fn.primaryColor()} size={30} />
      <Title
        order={3}
        color={theme.fn.primaryColor()}
        sx={{ fontWeight: "lighter", fontFamily: "Abril Fatface" }}
      >
        Memories
      </Title>
    </Box>
  );
};

export default Logo;
