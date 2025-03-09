"use client";
import { useCallback, useState } from "react";
import SortingComponent from "./SortingComp";

const fakeSortingConfig: {
  title: string;
  options: { label: string; value: string; default?: boolean }[];
}[] = [
  {
    title: "Date",
    options: [
      { label: "Newest first", value: "newest", default: true },
      { label: "Oldest first", value: "oldest" },
    ],
  },
  {
    title: "Project Name",
    options: [
      { label: "A -> Z", value: "az" },
      { label: "Z -> A", value: "za" },
    ],
  },
];

const Notifications = () => {
  const [currentSorts, setCurrentSorts] = useState<Record<string, string>>({});

  const handleSortChange = useCallback((sorts: Record<string, string>) => {
    setCurrentSorts(sorts);
  }, []);

  console.log(currentSorts);
  return (
    <div className="h-screen w-full   flex items-center justify-center bg-gray-50">
      <SortingComponent
        config={fakeSortingConfig}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default Notifications;
