import { TravelItem } from "../lib/types/travel.type";

export const MOCK_TRAVEL_ITEMS: TravelItem[] = [
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
