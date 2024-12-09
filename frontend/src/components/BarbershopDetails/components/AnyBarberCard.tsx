import React from 'react';
import { Barber } from '../types';

interface AnyBarberCardProps {
  barbers: Barber[];
  onClick?: (barber: Barber) => void;
}

const AnyBarberCard: React.FC<AnyBarberCardProps> = ({ barbers, onClick }) => {
  // Find the earliest available slot among all barbers
  const earliestSlot = barbers
    .flatMap(b => b.nextAvailableSlots)
    .filter(slot => slot.available)
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())[0];

  const formatTimeSlot = (datetime: string) => {
    const date = new Date(datetime);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    const time = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    if (isToday) {
      return `Today, ${time}`;
    } else if (isTomorrow) {
      return `Tomorrow, ${time}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  return (
    <div 
      className="flex items-center p-3 bg-darkGrey/30 rounded-lg cursor-pointer hover:bg-darkGrey/50 transition-all"
      onClick={() => onClick && onClick(barbers[0])}
    >
      <div className="w-12 h-12 bg-darkGrey rounded-full flex items-center justify-center text-neonYellow flex-shrink-0">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <div className="ml-3 min-w-0 flex-1">
        <h4 className="text-white font-medium truncate mb-1">Any Available Barber</h4>
        {earliestSlot && (
          <div className="flex items-center text-sm">
            <div className="text-lightGrey/60 mr-2 flex-shrink-0">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <span className="text-lightGrey">
              {formatTimeSlot(earliestSlot.datetime)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnyBarberCard;
