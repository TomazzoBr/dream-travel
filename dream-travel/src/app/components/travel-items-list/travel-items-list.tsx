"use client";

import { TravelItem } from "@/app/lib/types/travel.type";
import TravelItemCard from "../travel-item-card/travel-item-card";

interface TravelItemsListProps {
  travelList: TravelItem[];
}

const TravelItemsList: React.FC<TravelItemsListProps> = ({ travelList }) => {
  const handleEdit = (itemId: string) => {
    console.log("Edit clicked", itemId);
  };

  const handleDelete = (itemId: string) => {
    console.log("Delete clicked", itemId);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Travel Items</h1>
        <div className="space-y-4">
          {travelList.map((item) => (
            <TravelItemCard
              key={item.id}
              itemId={item.id}
              imageSrc={item.photo_url}
              title={item.title}
              description={item.description}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelItemsList;
