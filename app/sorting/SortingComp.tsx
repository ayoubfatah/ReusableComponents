import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState, useCallback, useEffect } from "react";

type SortingOption = {
  label: string;
  value: string;
  default?: boolean;
};

type SortingCategoryConfig = {
  title: string;
  options: SortingOption[];
};

type SortingComponentProps = {
  config: SortingCategoryConfig[];
  onSortChange: (selectedSorts: Record<string, string>) => void;
};
export default function SortingComponent({
  config,
  onSortChange,
}: SortingComponentProps) {
  const [selectedSorts, setSelectedSorts] = useState<Record<string, string>>(
    {}
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCategorySortChange = useCallback(
    (categoryTitle: string, sortValue: string) => {
      setSelectedSorts((prevSorts) => ({
        ...prevSorts,
        [categoryTitle]: sortValue,
      }));
    },
    []
  );

  const handleClearSort = useCallback(() => {
    setSelectedSorts({});
    onSortChange({});
    setDropdownOpen(false);
  }, [onSortChange, setDropdownOpen]);

  useEffect(() => {
    onSortChange(selectedSorts);
  }, [selectedSorts, onSortChange]);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer ">
          <div className="w-6 h-6">
            <img src="/images/sortByIcon.svg" alt="" />
          </div>
          <button className="cursor-pointer text-[#697077] font-medium text-lg tracking-[-0.02em]">
            Sort by
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] shadow-sm absolute right-[-42px] py-4 px-4 ">
        <h1 className="mb-2">Sort by </h1>

        {config.map((sortCategory) => (
          <SortingCategory
            key={sortCategory.title}
            config={sortCategory}
            onCategorySortChange={handleCategorySortChange}
            selectedSortValue={selectedSorts[sortCategory.title]}
          />
        ))}

        <button
          onClick={handleClearSort}
          className="underline  text-black/40 mt-2 cursor-pointer"
        >
          Clear
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SortingCategory({
  config,
  onCategorySortChange,
  selectedSortValue,
}: {
  config: SortingCategoryConfig;
  onCategorySortChange: (categoryTitle: string, sortValue: string) => void;
  selectedSortValue: string | undefined;
}) {
  const handleValueChange = useCallback(
    (value: string) => {
      onCategorySortChange(config.title, value);
    },
    [config.title, onCategorySortChange]
  );

  const defaultConfigValue = config.options.find((c) => c.default)?.value;

  return (
    <div>
      <span className="text-black/40">{config.title}</span>
      <RadioGroup
        defaultValue={defaultConfigValue}
        className="items-center py-2 cursor-pointer"
        onValueChange={handleValueChange}
        value={selectedSortValue}
      >
        {config.options.map((option) => (
          <div key={option.value} className="flex items-center ">
            <RadioGroupItem
              value={option.value}
              id={`${config.title}-${option.value}`}
            />
            <Label
              className="text-[16px]  cursor-pointer pl-1"
              htmlFor={`${config.title}-${option.value}`}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
