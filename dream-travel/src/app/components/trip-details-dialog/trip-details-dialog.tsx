import { TravelItem } from "@/app/lib/types/travel.type";
import { FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";

type TripDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  trip: TravelItem;
  onMarkAsCompleted: (id: string) => void;
};

export default function TripDetailsDialog({
  open,
  onClose,
  trip,
  onMarkAsCompleted,
}: TripDetailsDialogProps) {
  const [imageSrc, setImageSrc] = useState(
    "https://via.placeholder.com/300x200"
  );

  useEffect(() => {
    if (trip?.photo_url && isValidUrl(trip.photo_url)) {
      setImageSrc(trip.photo_url);
    }
  }, [trip?.photo_url]);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!open) return null;

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="h-[90%] bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-scroll">
        <div className="relative">
          <Image
            src={imageSrc}
            alt={trip.title}
            className="w-full h-48 object-cover"
            width={640}
            height={250}
          />
          <button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
            onClick={onClose}
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{trip.title}</h2>
          <button
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${
              trip.status === "done"
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            onClick={() => onMarkAsCompleted(trip.id)}
            disabled={trip.status === "done"}
          >
            <FaCheckCircle className="mr-2" />
            {trip.status === "done" ? "Completed" : "Mark as Completed"}
          </button>

          <p className="text-gray-700 mt-4">{trip.description}</p>
          <p className="text-gray-600 mt-2">{trip.introduction}</p>
          {trip.itinerary.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
              <ul className="space-y-4">
                {trip.itinerary.map((item, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center"></div>
                    <div>
                      <h4 className="font-medium">
                        {`Day ${item.day}: `}
                        {item.location}
                      </h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
