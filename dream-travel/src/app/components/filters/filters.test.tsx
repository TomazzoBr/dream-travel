import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Filter } from "@/app/lib/types/filters.types";
import Filters from "./filters";

describe("Filters Component", () => {
  const mockFilters: Filter[] = [
    { value: "all", title: "All" },
    { value: "completed", title: "Completed" },
    { value: "pending", title: "Pending" },
  ];

  const mockOnFilterChange = jest.fn();
  const mockSetActiveFilter = jest.fn();

  const renderComponent = (activeFilter: Filter) => {
    render(
      <Filters
        filters={mockFilters}
        activeFilter={activeFilter}
        onFilterChange={mockOnFilterChange}
        setActiveFilter={mockSetActiveFilter}
      />
    );
  };

  it("should render all the filter buttons", () => {
    renderComponent(mockFilters[0]);
    const allFilters = screen.getAllByTestId("filter-item");

    expect(allFilters.length).toBe(mockFilters.length);
  });

  it("highlights the active filter button", () => {
    const activeFilter = mockFilters[1];
    renderComponent(activeFilter);

    const activeButton = screen.getByText("Completed");
    const inactiveButton = screen.getByText("All");

    expect(activeButton).toHaveClass("bg-gray-100 text-black");
    expect(inactiveButton).toHaveClass("bg-white text-gray-600");
  });

  it("calls setActiveFilter and onFilterChange when a button is clicked", () => {
    const activeFilter = mockFilters[0];
    renderComponent(activeFilter);

    const button = screen.getByText(mockFilters[1].title);
    fireEvent.click(button);

    expect(mockSetActiveFilter).toHaveBeenCalledWith(mockFilters[1]);
    expect(mockOnFilterChange).toHaveBeenCalledWith(mockFilters[1]);
  });
});
