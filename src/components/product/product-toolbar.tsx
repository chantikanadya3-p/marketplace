"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Check,
  ChevronDown,
  Grid2X2,
  Grid3X3,
  List,
} from "lucide-react";

export type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "rating"
  | "name";

export type ViewMode =
  | "three-columns"
  | "two-columns"
  | "list";

interface ProductToolbarProps {
  resultCount: number;
  totalCount: number;
  categoryLabel: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  onSortChange: (sort: SortOption) => void;
  onViewChange: (view: ViewMode) => void;
}

const sortOptions: Array<{
  label: string;
  value: SortOption;
}> = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Highest Rating",
    value: "rating",
  },
  {
    label: "Name: A-Z",
    value: "name",
  },
];

interface ViewButtonsProps {
  viewMode: ViewMode;
  onViewChange: (view: ViewMode) => void;
  showList?: boolean;
}

function ViewButtons({
  viewMode,
  onViewChange,
  showList = false,
}: ViewButtonsProps) {
  return (
    <div className="flex h-9 overflow-hidden rounded-md border border-slate-200">
      <button
        type="button"
        onClick={() =>
          onViewChange("three-columns")
        }
        aria-label="Grid view"
        className={`flex h-9 w-9 items-center justify-center border-r border-slate-200 ${
          viewMode === "three-columns"
            ? "bg-[#F1F5F9] text-[#17365f]"
            : "bg-white text-slate-500"
        }`}
      >
        <Grid3X3 size={15} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        onClick={() =>
          onViewChange("two-columns")
        }
        aria-label="Two-column view"
        className={`flex h-9 w-9 items-center justify-center ${
          showList
            ? "border-r border-slate-200"
            : ""
        } ${
          viewMode === "two-columns"
            ? "bg-[#F1F5F9] text-[#17365f]"
            : "bg-white text-slate-500"
        }`}
      >
        <Grid2X2 size={15} strokeWidth={1.8} />
      </button>

      {showList && (
        <button
          type="button"
          onClick={() => onViewChange("list")}
          aria-label="List view"
          className={`flex h-9 w-9 items-center justify-center ${
            viewMode === "list"
              ? "bg-[#F1F5F9] text-[#17365f]"
              : "bg-white text-slate-500"
          }`}
        >
          <List size={15} strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}

export default function ProductToolbar({
  categoryLabel,
  sortBy,
  viewMode,
  onSortChange,
  onViewChange,
}: ProductToolbarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleSortChange = (value: SortOption) => {
    onSortChange(value);
    setIsSortOpen(false);
  };

  return (
  <div className="mb-6 lg:mb-8">
    <div className="flex h-9 items-center justify-between">
      <h2 className="text-base font-semibold text-slate-900 lg:text-lg">
        <span className="lg:hidden">
          {categoryLabel}
        </span>

        <span className="hidden lg:inline">
          Products
        </span>
      </h2>

      <div className="hidden items-center gap-5 lg:flex">
        <div ref={sortRef} className="relative">
          <button
            type="button"
            onClick={() =>
              setIsSortOpen((current) => !current)
            }
            aria-expanded={isSortOpen}
            className="flex h-9 items-center gap-2 text-sm font-medium text-slate-800"
          >
            Sort by

            <ChevronDown
              size={15}
              className={`transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 top-11 z-30 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {sortOptions.map((option) => {
                const isSelected =
                  sortBy === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handleSortChange(option.value)
                    }
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                      isSelected
                        ? "bg-slate-100 font-medium text-[#17365f]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}

                    {isSelected && (
                      <Check size={15} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <ViewButtons
          viewMode={viewMode}
          onViewChange={onViewChange}
          showList
        />
      </div>
    </div>

    <div className="mt-3 flex items-center justify-between lg:hidden">
      <div
        ref={sortRef}
        className="relative"
      >
        <button
          type="button"
          onClick={() =>
            setIsSortOpen((current) => !current)
          }
          aria-expanded={isSortOpen}
          className="flex h-9 items-center gap-2 text-xs font-medium text-slate-800"
        >
          Sort by

          <ChevronDown
            size={14}
            className={`transition-transform ${
              isSortOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isSortOpen && (
          <div className="absolute left-0 top-10 z-30 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {sortOptions.map((option) => {
              const isSelected =
                sortBy === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    handleSortChange(option.value)
                  }
                  className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-xs ${
                    isSelected
                      ? "bg-slate-100 font-medium text-[#17365f]"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option.label}

                  {isSelected && (
                    <Check size={14} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ViewButtons
        viewMode={viewMode}
        onViewChange={onViewChange}
      />
    </div>
  </div>
);
}