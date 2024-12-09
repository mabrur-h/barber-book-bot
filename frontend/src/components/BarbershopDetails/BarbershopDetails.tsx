import React, { useState } from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import Rating from '../shared/Rating';
import BarberCard from './components/BarberCard';
import AnyBarberCard from './components/AnyBarberCard';
import ContactInfo from './components/ContactInfo';
import ServicesOverview from './components/ServicesOverview';
import BookingModal from './components/BookingModal/BookingModal';
import { Service, Barber, Review, BarbershopDetailsProps } from './types';

const BarbershopDetails: React.FC<BarbershopDetailsProps> = ({ shopId, onBack, onBooking }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'services' | 'reviews' | 'barbers'>('info');
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [bookingFlow, setBookingFlow] = useState<'fromBarber' | 'fromServices'>('fromServices');

  const handleServiceClick = (service: Service) => {
    setSelectedServices([service]);
  };

  const handleMultiServiceBook = (services: Service[]) => {
    setSelectedServices(services);
    setBookingFlow('fromServices');
    setIsBookingModalOpen(true);
  };

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
    setBookingFlow('fromBarber');
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = () => {
    setIsBookingModalOpen(false);
    setSelectedServices([]);
    setSelectedBarber(null);
    onBooking?.();
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedServices([]);
    setSelectedBarber(null);
  };

  // Mock data - replace with actual API calls later
  const services: Service[] = [
    {
      id: '1',
      name: 'Classic Haircut',
      price: 30,
      duration: 30,
      bgColor: 'bg-dark',
      textColor: 'text-lightGrey',
    },
    {
      id: '2',
      name: 'Beard Trim',
      price: 15,
      duration: 30,
      bgColor: 'bg-dark',
      textColor: 'text-lightGrey',
    },
    {
      id: '3',
      name: 'Premium Haircut',
      price: 50,
      duration: 50,
      bgColor: 'bg-dark',
      textColor: 'text-lightGrey',
    },
  ];

  const barbersList: Barber[] = [
    {
      id: '1',
      name: 'John Doe',
      specialties: ['Classic Cuts', 'Beard Trimming'],
      imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      rating: 4.8,
      reviewCount: 127,
      nextAvailableSlots: [
        { datetime: '2024-12-09T14:47:31+05:00', available: true },
        { datetime: '2024-12-09T15:30:00+05:00', available: true },
        { datetime: '2024-12-09T16:00:00+05:00', available: true },
      ],
    },
    {
      id: '2',
      name: 'Jane Smith',
      specialties: ['Hair Coloring', 'Styling'],
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4.9,
      reviewCount: 89,
      nextAvailableSlots: [
        { datetime: '2024-12-09T14:00:00+05:00', available: true },
        { datetime: '2024-12-09T14:30:00+05:00', available: true },
      ],
    },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Mike Johnson',
      rating: 5,
      comment: 'Great service! Very professional and friendly staff.',
      date: '2023-12-01',
      barberName: 'John Doe',
    },
    {
      id: '2',
      userName: 'Sarah Williams',
      rating: 4,
      comment: 'Good haircut, but had to wait a bit longer than expected.',
      date: '2023-11-28',
      barberName: 'Jane Smith',
    },
  ];

  const images = [
    'https://frisorbarbershop.com/images/b-promo/world/1promo.jpg',
    'https://s3-media0.fl.yelpcdn.com/bphoto/c8pIvAfIeXnRGlSTTWmvEw/348s.jpg',
    'https://insights.ibx.com/wp-content/uploads/2023/06/kym-barbershop.jpg',
  ];

  return (
    <div className="h-full bg-dark p-6">
      <button
        onClick={onBack}
        className="text-lightGrey hover:text-white mb-4 flex items-center"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="rounded-xl backdrop-blur-sm">
        {/* Tab Navigation */}
        <nav className="flex flex-wrap p-2 border-b border-darkGrey/30">
          <button
            className={`px-4 py-2 my-1 mx-1 text-sm font-medium transition-all duration-200 flex-1 rounded-tl-lg rounded-bl-lg ${
              activeTab === 'info'
                ? 'bg-neonYellow text-dark shadow-lg shadow-neonYellow/20'
                : 'bg-darkGrey/50 text-lightGrey hover:bg-darkGrey hover:text-lightGrey/90'
            }`}
            onClick={() => setActiveTab('info')}
            aria-current={activeTab === 'info' ? 'page' : undefined}
          >
            Info
          </button>
          <button
            className={`px-4 py-2 my-1 mx-1 text-sm font-medium transition-all duration-200 flex-1 ${
              activeTab === 'services'
                ? 'bg-neonYellow text-dark shadow-lg shadow-neonYellow/20'
                : 'bg-darkGrey/50 text-lightGrey hover:bg-darkGrey hover:text-lightGrey/90'
            }`}
            onClick={() => setActiveTab('services')}
            aria-current={activeTab === 'services' ? 'page' : undefined}
          >
            Services
          </button>
          {barbersList.length > 0 && (
            <button
              className={`px-4 py-2 my-1 mx-1 text-sm font-medium transition-all duration-200 flex-1 ${
                activeTab === 'barbers'
                  ? 'bg-neonYellow text-dark shadow-lg shadow-neonYellow/20'
                  : 'bg-darkGrey/50 text-lightGrey hover:bg-darkGrey hover:text-lightGrey/90'
              }`}
              onClick={() => setActiveTab('barbers')}
              aria-current={activeTab === 'barbers' ? 'page' : undefined}
            >
              Barbers
            </button>
          )}
          <button
            className={`px-4 py-2 my-1 mx-1 text-sm font-medium transition-all duration-200 flex-1 rounded-tr-lg rounded-br-lg ${
              activeTab === 'reviews'
                ? 'bg-neonYellow text-dark shadow-lg shadow-neonYellow/20'
                : 'bg-darkGrey/50 text-lightGrey hover:bg-darkGrey hover:text-lightGrey/90'
            }`}
            onClick={() => setActiveTab('reviews')}
            aria-current={activeTab === 'reviews' ? 'page' : undefined}
          >
            Reviews
          </button>
        </nav>
      </div>

      {/* Details Card */}
      <div className="bg-darkGrey/50 rounded-xl backdrop-blur-sm h-[calc(100vh-240px)]">
        {/* Header - Always visible */}
        <div className="p-6 border-b border-darkGrey/30">
          <h1 className="text-2xl font-bold text-neonYellow mb-2">Modern Cuts</h1>
          <div className="flex items-center text-lightGrey/80">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            123 Main St
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar h-[calc(100%-120px)]">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <ImageSlider images={images} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Barbers Section */}
                <div className="bg-dark/50 rounded-lg p-4 md:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-neonYellow font-medium">Our Barbers</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {barbersList.length > 1 && (
                      <AnyBarberCard barbers={barbersList} onClick={onBooking} />
                    )}
                    <BarberCard 
                      barber={barbersList[0]} 
                      onClick={() => {
                        setSelectedBarber(barbersList[0]);
                        setIsBookingModalOpen(true);
                      }}
                    />
                    {barbersList.length > 1 && (
                      <button
                        className="w-full mt-2 py-2 text-xs text-center text-neonYellow/80 hover:text-neonYellow transition-all bg-darkGrey/10 hover:bg-darkGrey/30 rounded-lg border border-neonYellow/30 hover:border-neonYellow/50"
                        onClick={() => setActiveTab('barbers')}
                      >
                        View all barbers ({barbersList.length})
                      </button>
                    )}
                  </div>
                </div>

                <ContactInfo 
                  phone="+1 234-567-8900"
                  workingHours="Mon-Sat: 9AM-7PM"
                />
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <ServicesOverview 
              services={services}
              onServiceClick={handleServiceClick}
              onBookMultiple={handleMultiServiceBook}
            />
          )}

          {activeTab === 'barbers' && (
            <div className="space-y-4 overflow-y-auto custom-scrollbar">
              {selectedServices.length > 0 && (
                <div className="bg-dark/50 rounded-lg p-4 mb-4">
                  <h3 className="text-neonYellow font-medium mb-2">Selected Services</h3>
                  <div className="space-y-2">
                    {selectedServices.map(service => (
                      <div key={service.id} className="flex justify-between items-center text-lightGrey">
                        <span>{service.name}</span>
                        <span>${service.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-darkGrey/30 pt-2 mt-2">
                      <div className="flex justify-between items-center text-neonYellow">
                        <span>Total</span>
                        <span>${selectedServices.reduce((sum, service) => sum + service.price, 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-dark/50 rounded-lg p-4">
                <h3 className="text-neonYellow font-medium mb-4">Available Barbers</h3>
                <div className="space-y-4">
                  <AnyBarberCard barbers={barbersList} onClick={handleBarberSelect} />
                  {barbersList.map((barber) => (
                    <BarberCard 
                      key={barber.id} 
                      barber={barber}
                      onClick={() => handleBarberSelect(barber)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-dark/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{review.userName}</h4>
                      <p className="text-xs text-lightGrey mt-0.5">
                        Served by {review.barberName}
                      </p>
                    </div>
                    <Rating rating={review.rating} />
                  </div>
                  <p className="text-sm text-lightGrey/90">{review.comment}</p>
                  <p className="text-xs text-lightGrey/60 mt-2">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isBookingModalOpen && (
        <BookingModal
          services={services}
          barbers={barbersList}
          flow={bookingFlow}
          initialBarber={bookingFlow === 'fromBarber' ? selectedBarber : null}
          initialServices={bookingFlow === 'fromServices' ? selectedServices : []}
          onClose={handleCloseBooking}
          onBook={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default BarbershopDetails;
