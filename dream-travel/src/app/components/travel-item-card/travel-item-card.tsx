"use client";

import Image from "next/image";
import TripDetailsDialog from "../trip-details-dialog/trip-details-dialog";
import { useState } from "react";
import { TravelItem } from "@/app/lib/types/travel.type";
import styles from "./travel-item-card.module.scss";
import TripModalForm from "../trip-modal-form/trip-modal-form";

interface TravelItemCardProps {
  tripItem: TravelItem;
  onSaveItem: (travelItem: TravelItem) => void;
  onDelete: (travelItemId: string) => void;
}

const TravelItemCard: React.FC<TravelItemCardProps> = ({
  tripItem,
  onSaveItem,
  onDelete,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogEditOpen, setDialogEditOpen] = useState(false);
  const [trip, setTrip] = useState<TravelItem | null>(tripItem);

  const handleMarkAsCompleted = (id: string) => {
    if (trip && trip.id === id) {
      setTrip({ ...trip, status: "done" });
    }
  };

  return (
    <div
      className={`${styles.TravelItemCard} flex flex-row items-start border rounded-lg shadow-sm overflow-hidden rounded-2xl`}
    >
      <div className="w-1/2">
        <Image
          src={tripItem.photo_url}
          alt={tripItem.title}
          className="rounded-tl-lg rounded-bl-lg object-cover object-center"
          width={464}
          height={206}
        />
      </div>

      <div className="w-1/2 h-[206px] flex flex-col justify-between p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {tripItem.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-5">
            {tripItem.description}
          </p>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            onClick={() => setDialogOpen(true)}
            className="text-black-500 underline underline-offset-1 text-sm hover:font-medium"
          >
            See trip details
          </button>
          <div>
            <button
              onClick={() => setDialogEditOpen(true)}
              className="text-black-500 underline underline-offset-1 hover:font-medium text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(tripItem.id)}
              className="text-red-500 underline underline-offset-1 hover:font-medium text-sm ml-4"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {trip && isDialogOpen && (
        <TripDetailsDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          trip={trip}
          onMarkAsCompleted={handleMarkAsCompleted}
        />
      )}

      {trip && isDialogEditOpen && onSaveItem && (
        <TripModalForm
          isOpen={isDialogEditOpen}
          onClose={() => setDialogEditOpen(false)}
          trip={trip}
          onSave={onSaveItem}
        />
      )}
    </div>
  );
};

export default TravelItemCard;
