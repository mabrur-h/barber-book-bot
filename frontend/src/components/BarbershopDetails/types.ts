export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  bgColor: string;
  textColor: string;
}

export interface TimeSlot {
  datetime: string; // ISO string
  available: boolean;
}

export interface Barber {
  id: string;
  name: string;
  specialties: string[];
  imageUrl: string;
  rating: number;
  reviewCount: number;
  nextAvailableSlots: TimeSlot[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  barberName: string;
}

export interface BarbershopDetailsProps {
  shopId: string;
  onBack: () => void;
  onBooking: () => void;
}
