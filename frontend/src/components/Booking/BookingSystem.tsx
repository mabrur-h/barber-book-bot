import React, { useState } from 'react';
import { Service } from '../BarbershopDetails/types';

interface BookingFormData {
  name: string;
  phone: string;
  notes: string;
}

interface BookingSystemProps {
  shopId: string;
  onBack: () => void;
  selectedServices: Service[];
  selectedBarber: string;
  selectedDate: string;
  selectedTime: string;
}

const BookingSystem: React.FC<BookingSystemProps> = ({ 
  shopId, 
  onBack, 
  selectedServices, 
  selectedBarber,
  selectedDate,
  selectedTime 
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission with all details
    console.log('Booking submitted:', {
      ...formData,
      shopId,
      selectedServices,
      selectedBarber,
      selectedDate,
      selectedTime
    });
  };

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 px-4 py-2 bg-dark/50 text-lightGrey rounded-lg hover:bg-dark/70 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Details</span>
      </button>

      <div className="bg-dark/50 rounded-lg p-6 border border-darkGrey/30">
        <h1 className="text-2xl text-neonYellow font-medium mb-6">Confirm Your Booking</h1>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Booking Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-neonYellow font-medium mb-3">Selected Services</h2>
              <div className="space-y-2">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-dark/50 border border-darkGrey/30 rounded-lg">
                    <div>
                      <h5 className="font-medium text-white">{service.name}</h5>
                      <p className="text-sm text-lightGrey">{service.duration} min</p>
                    </div>
                    <p className="font-medium text-neonYellow">${service.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-neonYellow font-medium mb-3">Appointment Details</h2>
              <div className="space-y-2">
                <div className="p-3 bg-dark/50 border border-darkGrey/30 rounded-lg">
                  <div className="text-sm text-lightGrey">Barber</div>
                  <div className="text-white font-medium">{selectedBarber}</div>
                </div>
                <div className="p-3 bg-dark/50 border border-darkGrey/30 rounded-lg">
                  <div className="text-sm text-lightGrey">Date & Time</div>
                  <div className="text-white font-medium">{selectedDate} at {selectedTime}</div>
                </div>
                <div className="p-3 bg-dark/50 border border-darkGrey/30 rounded-lg">
                  <div className="text-sm text-lightGrey">Total Duration</div>
                  <div className="text-white font-medium">{totalDuration} minutes</div>
                </div>
                <div className="p-3 bg-dark/50 border border-darkGrey/30 rounded-lg">
                  <div className="text-sm text-lightGrey">Total Price</div>
                  <div className="text-neonYellow font-medium">${totalPrice}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-neonYellow font-medium mb-3">Your Contact Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-lightGrey mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark/50 border border-darkGrey/30 rounded-lg text-white placeholder-darkGrey focus:outline-none focus:border-neonYellow transition-colors"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lightGrey mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark/50 border border-darkGrey/30 rounded-lg text-white placeholder-darkGrey focus:outline-none focus:border-neonYellow transition-colors"
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lightGrey mb-1">
                  Additional Notes <span className="text-darkGrey">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark/50 border border-darkGrey/30 rounded-lg text-white placeholder-darkGrey focus:outline-none focus:border-neonYellow transition-colors"
                  rows={3}
                  placeholder="Any special requests or notes for your appointment"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-neonYellow text-dark font-medium rounded-lg hover:bg-neonYellow/90 transition-colors mt-6"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;
