import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch"; // Import Switch
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
// Helper function to get initial sorts based on defaults in config
const getInitialSorts = (
  config: SortingCategoryConfig[]
): Record<string, string> => {
  const defaults: Record<string, string> = {};
  config.forEach((category) => {
    const defaultOption = category.options.find((opt) => opt.default);
    if (defaultOption) {
      defaults[category.title] = defaultOption.value;
    }
    // Ensure Archived Posts always has a default ('hide' if possible)
    // This retains the specific logic for Archived Posts if no explicit default is set
    else if (category.title === "Archived Posts") {
      const hideOption = category.options.find((opt) => opt.value === "hide");
      if (hideOption) {
        defaults[category.title] = hideOption.value;
      } else if (category.options.length > 0) {
        // Fallback to the first option if 'hide' isn't present
        defaults[category.title] = category.options[0].value;
      }
    }
  });
  return defaults;
};

export default function SortingComponent({
  config,
  onSortChange,
}: SortingComponentProps) {
  // Get initial sorts using the helper function
  const initialSorts = getInitialSorts(config);

  const [selectedSorts, setSelectedSorts] =
    useState<Record<string, string>>(initialSorts);
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
    setSelectedSorts(initialSorts);
    onSortChange(initialSorts);
    setDropdownOpen(false);
  }, [initialSorts, onSortChange, setDropdownOpen]);

  useEffect(() => {
    onSortChange(selectedSorts);
  }, [selectedSorts, onSortChange]);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer ">
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
  // Define both handlers unconditionally
  const handleValueChange = useCallback(
    (value: string) => {
      onCategorySortChange(config.title, value);
    },
    [config.title, onCategorySortChange]
  );

  const showOption = config.options.find((opt) => opt.value === "show");
  const hideOption = config.options.find((opt) => opt.value === "hide");
  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      const newValue = checked ? showOption?.value : hideOption?.value;
      if (newValue !== undefined) {
        onCategorySortChange(config.title, newValue);
      }
    },
    [config.title, onCategorySortChange, showOption, hideOption]
  );

  if (config.title === "Archived Posts") {
    const isChecked = selectedSortValue === "show";

    return (
      <div className="flex items-center justify-between py-2">
        <Label htmlFor={config.title} className="text-black/40 cursor-pointer">
          {config.title}
        </Label>
        <Switch
          id={config.title}
          checked={isChecked}
          onCheckedChange={handleSwitchChange}
          aria-label={config.title}
        />
      </div>
    );
  } else {
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
}
