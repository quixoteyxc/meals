import React from "react";
import { Button } from "@/components/ui/Button";
import { GoldStarSVG } from "@/assets/svg/GoldStar";

interface ProductCardProps {
  id: string;
  name: string;
  thumb: string;
  additionalInfo: string[];
  onInfoClick?: (id: string) => Promise<void>;
  action?: (id: string) => void;
  isFavourite?: boolean;
  actionText: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  thumb,
  additionalInfo,
  onInfoClick,
  action,
  isFavourite,
  actionText,
}) => {
  return (
    <div className="rounded-lg shadow-lg p-4 w-60 text-center relative">
      <img
        src={thumb}
        alt={id}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      {additionalInfo.map((info, index) => (
        <p key={index} className="text-sm text-gray-600">
          {info}
        </p>
      ))}
      <div className="flex gap-4 w-full mt-4">
        {isFavourite && (
          <GoldStarSVG width={20} className="absolute top-0 left-0" />
        )}
        <Button
          onClick={() => {
            onInfoClick?.(id);
          }}
          className="w-1/2"
        >
          Info
        </Button>
        <Button
          onClick={() => {
            action?.(id);
          }}
          className="w-1/2"
        >
          {actionText}
        </Button>
      </div>
    </div>
  );
};
