import React from 'react';
import { Barber, Service } from '../../types';
import TimeSlotSelector from './TimeSlotSelector';
import ServiceSelector from './ServiceSelector';
import BarberSelector from './BarberSelector';
import ModalHeader from './ModalHeader';

interface BookingModalProps {
  barbers: Barber[];
  services: Service[];
  flow: 'fromBarber' | 'fromServices';
  initialBarber?: Barber | null;
  initialServices?: Service[];
  onClose: () => void;
  onBook: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  barbers,
  services,
  flow,
  initialBarber,
  initialServices,
  onClose,
  onBook,
}) => {
  // Set initial step based on the flow
  const [step, setStep] = React.useState<'services' | 'barber' | 'time'>(
    flow === 'fromBarber' ? 'services' : 'barber'
  );
  const [selectedServices, setSelectedServices] = React.useState<Service[]>(initialServices || []);
  const [selectedBarber, setSelectedBarber] = React.useState<Barber | null>(initialBarber || null);
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);

  const handleClose = () => {
    setStep(flow === 'fromBarber' ? 'services' : 'barber');
    setSelectedServices([]);
    setSelectedBarber(null);
    setSelectedSlot(null);
    onClose();
  };

  const handleServiceSelect = (services: Service[]) => {
    setSelectedServices(services);
  };

  const handleServiceContinue = () => {
    if (flow === 'fromBarber') {
      setStep('time');
    } else {
      setStep('barber');
    }
  };

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
    setStep('time');
  };

  const handleTimeSelect = (datetime: string) => {
    setSelectedSlot(datetime);
  };

  const handleBack = () => {
    if (step === 'time') {
      if (flow === 'fromBarber') {
        setStep('services');
      } else {
        setStep('barber');
      }
      setSelectedSlot(null);
    } else if (step === 'barber') {
      setStep('services');
      setSelectedBarber(null);
    } else {
      handleClose();
    }
  };

  const handleBook = () => {
    if (!selectedBarber || !selectedSlot || selectedServices.length === 0) return;
    
    // Here you would typically make an API call to book the appointment
    onBook();
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-darkGrey rounded-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-4 border-b border-darkGrey/30">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">Book Appointment</h3>
            <button
              onClick={handleClose}
              className="text-lightGrey/60 hover:text-neonYellow transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4">
          {step === 'services' && (
            <ServiceSelector
              services={services}
              onSelect={handleServiceSelect}
              selectedServices={selectedServices}
              onContinue={handleServiceContinue}
              flow={flow}
            />
          )}
          
          {step === 'barber' && (
            <BarberSelector
              barbers={barbers}
              selectedServices={selectedServices}
              onSelectBarber={handleBarberSelect}
              onBack={handleBack}
            />
          )}
          
          {step === 'time' && selectedBarber && (
            <TimeSlotSelector
              barber={selectedBarber}
              slots={selectedBarber.nextAvailableSlots}
              selectedServices={selectedServices}
              onTimeSelect={handleTimeSelect}
              selectedTime={selectedSlot}
              onBack={handleBack}
              onBook={handleBook}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
