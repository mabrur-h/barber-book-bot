import React from 'react';

interface Barbershop {
  id: string;
  name: string;
  rating: number;
  address: string;
  contact: string;
  workingHours: string;
  description: string;
  imageUrl: string;
}

interface BarbershopCardProps {
  barbershop: Barbershop;
  onClick: () => void;
}

const BarbershopCard: React.FC<BarbershopCardProps> = ({
  barbershop,
  onClick,
}) => {
  const { name, rating, description, imageUrl } = barbershop;
  
  return (
    <div
      className="group bg-dark/90 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-darkGrey/50 hover:border-neonYellow/80 hover:-translate-y-0.5 h-[180px] flex flex-col"
      onClick={onClick}
    >
      <div className="h-[130px] relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{
            objectPosition: '50% 25%'
          }}
        />
        <div className="absolute top-2 right-2 bg-darkGrey/60 backdrop-blur-[2px] px-1.5 py-0.5 rounded-md flex items-center">
          <span className="text-neonYellow mr-0.5 text-[10px]">★</span>
          <span className="text-lightGrey text-[10px] font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-2 text-start flex-1">
        <h3 className="font-medium text-neonYellow text-xs mb-0.5 truncate">
          {name}
        </h3>
        <p className="text-lightGrey text-[10px] line-clamp-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BarbershopCard;
