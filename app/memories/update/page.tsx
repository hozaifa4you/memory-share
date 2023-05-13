"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

const UpdateMemory = () => {
  const { user } = useAppSelector((state) => state.authentication);
  console.log("❌❌❌ update page user", user);

  return <div>Update page</div>;
};

export default UpdateMemory;
