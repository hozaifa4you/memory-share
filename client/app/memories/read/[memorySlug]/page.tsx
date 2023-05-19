"use client";
import React from "react";
import Head from "next/head";

import { MemoryDetails } from "@/app/components";

interface PropTypes {
  params: { memorySlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { memorySlug } }: PropTypes) {
  const t = memorySlug.split("-").join(" ");
  const title = t.charAt(0).toUpperCase() + t.slice(1);

  return {
    title: title + " | Memory Share",
    description: title,
  };
}

const MemoryRead = ({ params: { memorySlug } }: PropTypes) => {
  return (
    <div>
      <Head>
        <title>{memorySlug}</title>
      </Head>
      {memorySlug && <MemoryDetails slug={memorySlug} />}
    </div>
  );
};

export default MemoryRead;
