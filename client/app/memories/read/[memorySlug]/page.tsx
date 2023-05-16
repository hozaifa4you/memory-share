import React from "react";

interface PropTypes {
  params: { memorySlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { memorySlug } }: PropTypes) {
  // console.log("😍😍😍 metadata", memorySlug);

  return {
    title: memorySlug + "| Memory Share",
    description: {
      name: "description",
      content: memorySlug.toString(),
    },
  };
}

const MemoryRead = ({ params: { memorySlug } }: PropTypes) => {
  console.log(memorySlug);

  return <div>{memorySlug}</div>;
};

export default MemoryRead;
