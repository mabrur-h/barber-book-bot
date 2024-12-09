import React from 'react';
import { Barber, Service } from '../../types';

interface BarberSelectorProps {
  barbers: Barber[];
  selectedServices: Service[];
  onSelectBarber: (barber: Barber) => void;
  onBack: () => void;
}

const BarberSelector: React.FC<BarberSelectorProps> = ({
  barbers,
  selectedServices,
  onSelectBarber,
  onBack,
}) => {
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white text-sm font-medium">Select Barber</h4>
        <button 
          onClick={onBack}
          className="text-lightGrey/60 text-xs hover:text-neonYellow transition-colors"
        >
          ← Back to services
        </button>
      </div>

      <div className="flex items-center space-x-2 bg-dark/30 p-3 rounded-lg border border-darkGrey/30">
        <span className="text-lightGrey/60 text-xs">Selected services:</span>
        <div className="flex-1">
          {selectedServices.map((service, index) => (
            <span key={service.id} className="text-neonYellow text-xs">
              {service.name}
              {index < selectedServices.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
        <span className="text-neonYellow text-xs font-medium">
          ${totalPrice}
        </span>
      </div>

      <div className="grid gap-2">
        {barbers.map((barber) => (
          <button
            key={barber.id}
            onClick={() => onSelectBarber(barber)}
            className="flex items-center space-x-3 p-3 rounded-lg border border-darkGrey/30 hover:border-neonYellow/50 bg-dark/30 hover:bg-dark/50 transition-all group"
          >
            <img 
              src={barber.imageUrl} 
              alt={barber.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 text-left">
              <h5 className="text-sm text-white group-hover:text-neonYellow transition-colors">{barber.name}</h5>
              <p className="text-xs text-lightGrey/60">
                {barber.nextAvailableSlots.length} available slots
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BarberSelector;
