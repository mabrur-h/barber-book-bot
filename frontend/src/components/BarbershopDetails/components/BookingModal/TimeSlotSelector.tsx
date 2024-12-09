import React from 'react';
import { Barber, Service, TimeSlot } from '../../types';

interface TimeSlotSelectorProps {
  barber: Barber;
  slots: TimeSlot[];
  selectedServices: Service[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  onBack: () => void;
  onBook: () => void;
}

interface GroupedSlots {
  [key: string]: TimeSlot[];
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  barber,
  slots,
  selectedServices,
  selectedTime,
  onTimeSelect,
  onBack,
  onBook,
}) => {
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  const groupSlotsByDate = (slots: TimeSlot[]): GroupedSlots => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return slots
      .filter(slot => slot.available)
      .reduce((groups: GroupedSlots, slot) => {
        const date = new Date(slot.datetime);
        let key = '';

        if (date.toDateString() === now.toDateString()) {
          key = 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
          key = 'Tomorrow';
        } else {
          key = date.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });
        }

        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(slot);
        return groups;
      }, {});
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const groupedSlots = groupSlotsByDate(slots);
  const hasNoSlots = Object.keys(groupedSlots).length === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white text-sm font-medium">Select Time</h4>
        <button 
          onClick={onBack}
          className="text-lightGrey/60 text-xs hover:text-neonYellow transition-colors"
        >
          ← Back to barber
        </button>
      </div>

      <div className="flex items-center space-x-3 p-3 rounded-lg border border-darkGrey/30 bg-dark/30">
        <img
          src={barber.imageUrl}
          alt={barber.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h5 className="text-white text-sm font-medium">{barber.name}</h5>
          <div className="text-lightGrey/60 text-xs">
            {selectedServices.map((service, index) => (
              <span key={service.id}>
                {service.name}
                {index < selectedServices.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
        <span className="text-neonYellow text-sm font-medium">
          ${totalPrice}
        </span>
      </div>

      {hasNoSlots ? (
        <div className="text-lightGrey/60 text-sm text-center py-4">
          No available slots at the moment.
        </div>
      ) : (
        Object.entries(groupedSlots).map(([date, dateSlots]) => (
          <div key={date} className="space-y-2">
            <h5 className="text-neonYellow text-xs font-medium">{date}</h5>
            <div className="grid grid-cols-2 gap-2">
              {dateSlots.map((slot, index) => (
                <button
                  key={`${date}-${index}`}
                  onClick={() => onTimeSelect(slot.datetime)}
                  className={`p-3 rounded-lg border text-center ${
                    selectedTime === slot.datetime
                      ? 'border-neonYellow bg-dark/50 text-neonYellow'
                      : 'border-darkGrey/30 bg-dark/30 text-white hover:border-neonYellow/50 hover:bg-dark/50'
                  } transition-all text-sm`}
                >
                  {formatDateTime(slot.datetime)}
                </button>
              ))}
            </div>
          </div>
        ))
      )}

      {selectedTime && (
        <button
          onClick={onBook}
          className="w-full bg-neonYellow text-dark font-medium py-2 rounded-lg mt-4 hover:bg-neonYellow/90 transition-colors"
        >
          Book Appointment
        </button>
      )}
    </div>
  );
};

export default TimeSlotSelector;
