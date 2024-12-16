import { BASE_TRIPS_URL } from "@/app/lib/endpoints";

export const getTrips = async () => {
  const response = await fetch(BASE_TRIPS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }

  return response.json();
};

export const saveTrip = async (trip: {
  id: string;
  title: string;
  description: string;
  status: string;
}) => {
  const response = await fetch(BASE_TRIPS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  if (!response.ok) {
    throw new Error("Failed to save trip");
  }

  return response.json();
};

export const deleteTrip = async (id: string) => {
  const response = await fetch(`${BASE_TRIPS_URL}?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete trip");
  }

  return response.json();
};
