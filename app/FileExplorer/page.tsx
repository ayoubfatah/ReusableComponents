import React from "react";
import FileStructure from "./FileTreeNode";

export default function page() {
  return (
    <main className="h-screen w-full flex flex-col items-center pt-10">
      <FileStructure />
    </main>
  );
}
