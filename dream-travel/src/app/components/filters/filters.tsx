"use client";

import React from "react";
import styles from "./filters.module.scss";
import { Filter } from "@/app/lib/types/filters.types";

type FilterButtonsProps = {
  filters: Filter[];
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  setActiveFilter: (filter: Filter) => void;
};

const Filters: React.FC<FilterButtonsProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  setActiveFilter,
}) => {
  const handleFilterClick = (filter: Filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${styles.FiltersContainer} flex items-center justify-center gap-2 border rounded-full overflow-hidden p-2`}
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterClick(filter)}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${
              activeFilter.value === filter.value
                ? "bg-gray-100 text-black"
                : "bg-white text-gray-600"
            }`}
          >
            {filter.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
