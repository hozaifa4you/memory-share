"use client";
import React from "react";

const page = () => {
  return (
    <div>
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => console.log(e.target.files)}
      />
    </div>
  );
};

export default page;
