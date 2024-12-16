import { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import styles from "./trip-modal.module.scss";
import { Itinerary, TravelItem } from "@/app/lib/types/travel.type";

interface TripModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  trip?: TravelItem;
  onSave: (updatedTrip: TravelItem) => void;
}

const TripModalForm: React.FC<TripModalFormProps> = ({
  isOpen,
  onClose,
  trip,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    { day: "", location: "", description: "" },
  ]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trip) {
      setTitle(trip.title);
      setIntroduction(trip.introduction);
      setDescription(trip.description);
      setImage(trip.photo_url);
      setItineraries(trip.itinerary);
    } else {
      setFormDefaultState();
    }
    setError(null);
  }, [trip]);

  const setFormDefaultState = () => {
    setTitle("");
    setIntroduction("");
    setDescription("");
    setImage("");
    setItineraries([{ day: "", location: "", description: "" }]);
  };

  const handleAddItinerary = () => {
    setItineraries([
      ...itineraries,
      { day: "", location: "", description: "" },
    ]);
  };

  const handleItineraryChange = (
    index: number,
    field: keyof Itinerary,
    value: string
  ) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[index][field] = value;
    setItineraries(updatedItineraries);
  };

  const validateForm = () => {
    if (!title || !introduction || !description || !image) {
      setError("Please fill out all fields.");
      return false;
    }

    if (
      itineraries.some(
        (itinerary) =>
          !itinerary.day || !itinerary.location || !itinerary.description
      )
    ) {
      setError("Please complete all itinerary fields.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updatedTrip: TravelItem = {
      id: trip?.id ?? "",
      title,
      introduction,
      description,
      status: trip?.status ?? "todo",
      photo_url: image,
      itinerary: itineraries,
    };

    onSave(updatedTrip);
    setFormDefaultState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white h-[90%] w-11/12 max-w-2xl p-6 rounded-lg shadow-lg overflow-scroll">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-black font-semibold">
            {trip ? "Edit Trip" : "Create Trip"}
          </h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-600">
            &times;
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Italy"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="introduction"
              className="block text-sm font-medium text-black"
            >
              Introduction (max. 240 characters)
            </label>
            <input
              type="text"
              id="introduction"
              className="w-full px-4 py-2 border rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="From Rome to Venice..."
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Discover the wonders of the Roman empire..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-black"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              className="w-full px-4 py-2 border rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <div className="flex flex-row justify-between mb-2">
              <label
                htmlFor="itinerary"
                className="block text-sm font-medium text-black"
              >
                Day by day itinerary
              </label>
              <GoPlusCircle
                className="cursor-pointer"
                fill="black"
                onClick={handleAddItinerary}
              />
            </div>

            {itineraries.map((itinerary, index) => (
              <div
                key={index}
                className={`${styles.TripModal__itinerary} border rounded-2xl p-4 space-y-2 mb-4`}
              >
                <div className="flex items-center gap-2">
                  <select
                    className="px-4 py-2 border rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
                    value={itinerary.day}
                    onChange={(e) =>
                      handleItineraryChange(index, "day", e.target.value)
                    }
                  >
                    <option value="">Day</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Location"
                    value={itinerary.location}
                    onChange={(e) =>
                      handleItineraryChange(index, "location", e.target.value)
                    }
                  />
                </div>
                <textarea
                  className="w-full px-4 py-2 border rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Description"
                  rows={2}
                  value={itinerary.description}
                  onChange={(e) =>
                    handleItineraryChange(index, "description", e.target.value)
                  }
                ></textarea>
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            className={`w-[160px] h-[60px] bg-black text-white px-4 py-2 rounded-full text-sm font-medium`}
            type="submit"
          >
            Save
          </button>{" "}
        </form>
      </div>
    </div>
  );
};

export default TripModalForm;
