import React, { useState } from 'react';
import BarbershopCard from './BarbershopCard';

interface Barbershop {
  id: string;
  name: string;
  rating: number;
  address: string;
  contact: string;
  workingHours: string;
  description: string;
  imageUrl: string;
  services: string[];
  priceRange: string;
  bgColor: string;
  textColor: string;
}

interface BarbershopListProps {
  onShopSelect: (shopId: string) => void;
}

const BarbershopList: React.FC<BarbershopListProps> = ({ onShopSelect }) => {
  const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API call later
  const barbershops: Barbershop[] = [
    {
      id: '1',
      name: "Modern Cuts",
      rating: 4.5,
      address: "123 Main St",
      contact: "+1 234-567-8900",
      workingHours: "Mon-Sat: 9AM-7PM",
      description: "Premium barbershop with experienced staff",
      imageUrl: "https://frisorbarbershop.com/images/b-promo/world/1promo.jpg",
      services: ["Haircut", "Beard Trim", "Shave"],
      priceRange: "$$",
      bgColor: 'bg-dark',
      textColor: 'text-lightGrey',
    },
    {
      id: '2',
      name: "Modern Cuts",
      rating: 4.5,
      address: "123 Main St",
      contact: "+1 234-567-8900",
      workingHours: "Mon-Sat: 9AM-7PM",
      description: "Premium barbershop with experienced staff",
      imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/c8pIvAfIeXnRGlSTTWmvEw/348s.jpg",
      services: ["Haircut", "Beard Trim", "Shave"],
      priceRange: "$$",
      bgColor: 'bg-dark',
      textColor: 'text-lightGrey',
    },
    {
      id: '3',
      name: "New Cuts",
      rating: 3.6,
      address: "123 Main St",
      contact: "+1 234-567-8900",
      workingHours: "Mon-Sat: 9AM-7PM",
      description: "Premium barbershop with experienced staff",
      imageUrl: "https://insights.ibx.com/wp-content/uploads/2023/06/kym-barbershop.jpg",
      services: ["Haircut", "Beard Trim", "Shave"],
      priceRange: "$$",
      bgColor: 'bg-dark',
      textColor: 'text-lightGrey',
    },
    // Add more mock data here
  ];

  const filteredBarbershops = barbershops
    .filter(shop => 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // For price sorting, we'll use a simple comparison of the first number in priceRange
      const getFirstPrice = (range: string) => parseInt(range.match(/\d+/)?.[0] || '0');
      return getFirstPrice(a.priceRange) - getFirstPrice(b.priceRange);
    });

  return (
    <div className="h-full bg-dark">
      <div className="p-6">
        <div className="flex flex-row items-center gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-2 flex items-center text-neonYellow">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 bg-darkGrey border border-darkGrey/50 rounded-lg text-sm text-lightGrey placeholder-lightGrey/50 focus:outline-none focus:ring-1 focus:ring-neonYellow/50 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative shrink-0 w-[120px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'price')}
              className="w-full appearance-none pl-3 pr-8 py-1.5 bg-darkGrey border border-darkGrey/50 rounded-lg text-sm text-lightGrey focus:outline-none focus:ring-1 focus:ring-neonYellow/50 focus:border-transparent cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="price">Price</option>
            </select>
            <span className="absolute inset-y-0 right-2 flex items-center text-neonYellow pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredBarbershops.map((shop) => (
            <BarbershopCard
              key={shop.id}
              barbershop={shop}
              onClick={() => onShopSelect(shop.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopList;
