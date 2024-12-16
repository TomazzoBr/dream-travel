"use client";

import { TravelItem } from "@/app/lib/types/travel.type";
import TravelItemCard from "../travel-item-card/travel-item-card";

interface TravelItemsListProps {
  travelList: TravelItem[];
  handleSaveItem: (travelItem: TravelItem) => void;
  handleDeleteItem: (travelItemId: string) => void;
}

const TravelItemsList: React.FC<TravelItemsListProps> = ({
  travelList,
  handleSaveItem,
  handleDeleteItem,
}) => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Travel Items</h1>
        <div className="space-y-4">
          {travelList.map((item) => (
            <TravelItemCard
              key={item.id}
              tripItem={item}
              onSaveItem={handleSaveItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelItemsList;
