import React from 'react';
import { Service } from '../../types';

interface ServiceSelectorProps {
  services: Service[];
  selectedServices: Service[];
  onSelect: (services: Service[]) => void;
  onContinue: () => void;
  flow: 'fromBarber' | 'fromServices';
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServices,
  onSelect,
  onContinue,
  flow,
}) => {
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  const handleServiceToggle = (service: Service) => {
    const newSelection = selectedServices.some(s => s.id === service.id)
      ? selectedServices.filter(s => s.id !== service.id)
      : [...selectedServices, service];
    onSelect(newSelection);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <div className="p-6 pb-32">
        <h4 className="text-white text-sm font-medium mb-4">Select Services</h4>
        <div className="space-y-2">
          {services.map((service) => {
            const isSelected = selectedServices.some(s => s.id === service.id);
            return (
              <button
                key={service.id}
                onClick={() => handleServiceToggle(service)}
                className={`flex items-center justify-between p-3 rounded-lg transition-all w-full ${
                  isSelected ? 'bg-neonYellow text-dark' : 'bg-dark/50 text-white hover:bg-dark/70'
                }`}
              >
                <div className="flex-1">
                  <h5 className="font-medium">{service.name}</h5>
                  <p className="text-sm opacity-80">{service.duration} min</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${service.price}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedServices.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 border border-darkGrey/30 p-4 bg-darkGrey rounded-lg shadow-lg mx-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-white">
              <span>Total Duration:</span>
              <span>{totalDuration} min</span>
            </div>
            <div className="flex justify-between text-neonYellow font-medium">
              <span>Total Price:</span>
              <span>${totalPrice}</span>
            </div>
          </div>
          
          <button
            onClick={onContinue}
            className="w-full py-3 px-4 bg-neonYellow text-dark font-medium rounded-lg hover:bg-neonYellow/90 transition-colors"
          >
            {flow === 'fromBarber' ? 'Continue to Time Slots' : 'Continue to Select Barber'}
          </button>
        </div>
      )}
    </>
  );
};

export default ServiceSelector;
