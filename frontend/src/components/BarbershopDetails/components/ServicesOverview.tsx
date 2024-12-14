import React, { useState } from 'react';
import { Service } from '../types';

interface ServicesOverviewProps {
  services: Service[];
  onBookMultiple?: (selectedServices: Service[]) => void;
  onServiceClick: (service: Service) => void;
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({ services, onBookMultiple, onServiceClick }) => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleService = (service: Service) => {
    setSelectedServices(prev => 
      prev.find(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  return (
    <div className="space-y-6">
      <div className="bg-dark/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-neonYellow font-medium">Services Overview</h3>
        </div>
        <div className="space-y-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                toggleService(service);
              }}
              className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                selectedServices.find(s => s.id === service.id)
                  ? 'bg-neonYellow text-dark'
                  : 'bg-darkGrey/50 text-lightGrey hover:bg-darkGrey'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  selectedServices.find(s => s.id === service.id)
                    ? 'border-dark'
                    : 'border-lightGrey group-hover:border-neonYellow'
                }`}>
                  {selectedServices.find(s => s.id === service.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <h4 className="font-medium">{service.name}</h4>
                  <div className="text-sm opacity-80">
                    {service.duration} min
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium">${service.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedServices.length > 0 && (
        <div className="bottom-6 left-6 right-6 bg-dark rounded-lg p-4 shadow-lg border border-darkGrey/30">
          <div className="flex justify-between items-center mb-3">
            <div className="text-lightGrey">
              <div>Selected: {selectedServices.length} services</div>
              <div className="text-sm opacity-80">Total duration: {totalDuration} min</div>
            </div>
            <div className="text-neonYellow font-medium text-lg">
              ${totalPrice}
            </div>
          </div>
          <button
            onClick={() => onBookMultiple?.(selectedServices)}
            className="w-full py-3 bg-neonYellow text-dark rounded-lg font-medium hover:bg-neonYellow/90 transition-colors"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesOverview;
