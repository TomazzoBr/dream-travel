export type TravelItem = {
  id: string;
  title: string;
  description: string;
  photo_url: string;
  introduction: string;
  status: "todo" | "done";
  itinerary: Itinerary[];
};

export type Itinerary = {
  day: string;
  location: string;
  description: string;
};
