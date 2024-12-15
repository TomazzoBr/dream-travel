"use client";

import Image from "next/image";

interface TravelItemCardProps {
  itemId: string;
  imageSrc: string;
  title: string;
  description: string;
  onEdit: (itemId: string) => void;
  onDelete: (itemId: string) => void;
}

const TravelItemCard: React.FC<TravelItemCardProps> = ({
  itemId,
  imageSrc,
  title,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-start border rounded-lg shadow-sm p-4 space-x-4">
      <div className="w-1/3">
        <Image
          src={imageSrc}
          alt={title}
          className="rounded-lg object-cover"
          width={300}
          height={200}
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <a
          href="#"
          className="text-blue-500 text-sm font-medium hover:underline mt-2 block"
        >
          See trip details
        </a>

        <div className="flex space-x-4 mt-2">
          <button
            onClick={() => onEdit(itemId)}
            className="text-blue-500 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(itemId)}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelItemCard;
