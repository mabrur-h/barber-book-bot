import React from 'react';
import { TimeSlot } from '../BarbershopDetails/types';

interface TimeSlotsProps {
  slots: TimeSlot[];
  maxSlots?: number;
  showLabel?: boolean;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ 
  slots, 
  maxSlots = 3,
  showLabel = true
}) => {
  const formatTimeSlot = (slot: TimeSlot) => {
    const date = new Date(slot.datetime);
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
    <div className="flex items-center text-sm">
      {showLabel && (
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
      )}
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
        {slots
          .filter(slot => slot.available)
          .slice(0, maxSlots)
          .map((slot, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 bg-darkGrey/50 rounded text-lightGrey whitespace-nowrap flex-shrink-0"
            >
              {formatTimeSlot(slot)}
            </span>
          ))}
      </div>
    </div>
  );
};

export default TimeSlots;
