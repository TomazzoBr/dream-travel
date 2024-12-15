"use client";

import { TravelItem } from "@/app/lib/types/travel.type";
import TravelItemsList from "../travel-items-list/travel-items-list";
import Header from "../header/header";
import Search from "../search/search";
import Filters from "../filters/filters";
import { useState } from "react";
import { Filter } from "@/app/lib/types/filters.types";

const mockTravelItems: TravelItem[] = [
  {
    id: "1",
    title: "Portugal",
    description:
      "Classic tour of Portugal's vibrant cities and cultural heritage, including Lisbon, Porto, Fatima, and the flamboyant architecture of Sintra.",
    photo_url: "https://via.placeholder.com/300x200",
    introduction: "Discover the best of Portugal!",
    status: "todo",
    itinerary: [
      {
        day: "1",
        location: "Lisbon",
        description: "Explore the capital city.",
      },
      {
        day: "2",
        location: "Porto",
        description: "Wine tasting and river tour.",
      },
    ],
  },
  {
    id: "2",
    title: "Italy",
    description:
      "A journey through Italy’s iconic cities, including Rome, Venice, and Florence, with culinary and cultural experiences.",
    photo_url: "https://via.placeholder.com/300x200",
    introduction: "Experience the beauty of Italy!",
    status: "done",
    itinerary: [
      { day: "1", location: "Rome", description: "Visit the Colosseum." },
      {
        day: "2",
        location: "Venice",
        description: "Gondola ride through canals.",
      },
    ],
  },
];

const filters: Filter[] = [
  { title: "All", value: "all" },
  { title: "Upcoming", value: "todo" },
  { title: "Completed", value: "done" },
];

export default function Landing() {
  const defaultFilter = filters[0];
  const [activeFilter, setActiveFilter] = useState<Filter>(defaultFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItemsSearch, setFilteredItemsSearch] =
    useState(mockTravelItems);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered = mockTravelItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.introduction.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredItemsSearch(filtered);
    setActiveFilter(defaultFilter);
  };

  const handleFilters = (filter: Filter) => {
    setActiveFilter(filter);

    const baseList = searchQuery
      ? mockTravelItems.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.introduction.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : mockTravelItems;

    const filtered = baseList.filter((item) =>
      item.status.toLowerCase().includes(filter.value)
    );

    setFilteredItemsSearch(filtered);
  };
  return (
    <div className="w-full p-6">
      <Header />
      <Search onSearch={handleSearch} />
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={handleFilters}
        setActiveFilter={setActiveFilter}
      />
      <TravelItemsList travelList={filteredItemsSearch} />
    </div>
  );
}
