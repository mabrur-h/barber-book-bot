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
      prev.find(s => s.name === service.name)
        ? prev.filter(s => s.name !== service.name)
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
              key={service.name}
              onClick={() => {
                toggleService(service);
              }}
              className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                selectedServices.find(s => s.name === service.name)
                  ? 'bg-neonYellow text-dark'
                  : 'bg-darkGrey/50 text-lightGrey hover:bg-darkGrey'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  selectedServices.find(s => s.name === service.name)
                    ? 'border-dark bg-dark'
                    : 'border-lightGrey group-hover:border-neonYellow'
                }`}>
                  {selectedServices.find(s => s.name === service.name) && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
        <div className="fixed bottom-6 left-6 right-6 bg-dark rounded-lg p-4 shadow-lg border border-darkGrey/30">
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
