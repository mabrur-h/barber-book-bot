import React from 'react';
import Rating from '../../shared/Rating';
import TimeSlots from '../../shared/TimeSlots';
import { Barber } from '../types';

interface BarberCardProps {
  barber: Barber;
  onClick?: () => void;
}

const BarberCard: React.FC<BarberCardProps> = ({ barber, onClick }) => {
  return (
    <div 
      className="flex items-center p-3 bg-darkGrey/30 rounded-lg cursor-pointer hover:bg-darkGrey/50 transition-all"
      onClick={onClick}
    >
      <img 
        src={barber.imageUrl} 
        alt={barber.name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />
      <div className="ml-3 min-w-0 flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-white font-medium truncate mr-3">{barber.name}</h4>
          <div className="flex-shrink-0">
            <Rating rating={barber.rating} reviewCount={barber.reviewCount} />
          </div>
        </div>
        <TimeSlots slots={barber.nextAvailableSlots} />
      </div>
    </div>
  );
};

export default BarberCard;
