"use client";

import TravelItemsList from "../travel-items-list/travel-items-list";
import Header from "../header/header";
import Search from "../search/search";
import Filters from "../filters/filters";
import { useEffect, useState } from "react";
import { Filter } from "@/app/lib/types/filters.types";
import { getTrips } from "@/services/tripService";
import { TravelItem } from "@/app/lib/types/travel.type";
import TripModalForm from "../trip-modal-form/trip-modal-form";
import { v4 as uuidv4 } from "uuid";

const filters: Filter[] = [
  { title: "All", value: "all" },
  { title: "Upcoming", value: "todo" },
  { title: "Completed", value: "done" },
];

export default function Landing() {
  const defaultFilter = filters[0];
  const [isDialogCreateItemOpen, setIsDialogCreateItemOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>(defaultFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [tripsItems, setTripsItems] = useState<TravelItem[]>([]);
  const [filteredItemsSearch, setFilteredItemsSearch] = useState<TravelItem[]>(
    []
  );

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const storedTrips = localStorage.getItem("trips");

        if (storedTrips) {
          const parsedTrips = JSON.parse(storedTrips);
          setTripsItems(parsedTrips);
          setFilteredItemsSearch(parsedTrips);
        } else {
          const data = await getTrips();
          setTripsItems(data);
          setFilteredItemsSearch(data);
          localStorage.setItem("trips", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleSaveTrip = (trip: TravelItem) => {
    let updatedTrips;

    if (trip.id) {
      updatedTrips = tripsItems.map((existingTrip) =>
        existingTrip.id === trip.id ? trip : existingTrip
      );
    } else {
      const newTrip = { ...trip, id: uuidv4() };
      updatedTrips = [...tripsItems, newTrip];
    }

    setTripsItems(updatedTrips);
    setFilteredItemsSearch(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  const handleDeleteTrip = (id: string) => {
    const updatedTrips = tripsItems.filter((trip) => trip.id !== id);
    setTripsItems(updatedTrips);
    setFilteredItemsSearch(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered = tripsItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.introduction.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredItemsSearch(filtered);
    setActiveFilter(defaultFilter);
  };

  const handleFilters = (filter: Filter) => {
    if (filter.value === "all" && !searchQuery) {
      setFilteredItemsSearch(tripsItems);
      return;
    }

    const baseList = searchQuery
      ? tripsItems.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.introduction.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : tripsItems;

    const filtered = baseList.filter((item) =>
      item.status.toLowerCase().includes(filter.value)
    );

    setActiveFilter(filter);
    setFilteredItemsSearch(filtered);
  };
  return (
    <div className="w-full p-6">
      <Header setIsDialogCreateItemOpen={setIsDialogCreateItemOpen} />
      <Search onSearch={handleSearch} />
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={handleFilters}
        setActiveFilter={setActiveFilter}
      />
      <TravelItemsList
        travelList={filteredItemsSearch}
        handleSaveItem={handleSaveTrip}
        handleDeleteItem={handleDeleteTrip}
      />
      <TripModalForm
        isOpen={isDialogCreateItemOpen}
        onClose={() => setIsDialogCreateItemOpen(false)}
        onSave={handleSaveTrip}
      />
    </div>
  );
}
