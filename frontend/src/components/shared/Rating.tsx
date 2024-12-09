import React from 'react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount, className = '' }) => {
  return (
    <div className={`flex items-center whitespace-nowrap ${className}`}>
      <span className="text-neonYellow mr-1">★</span>
      <span className="text-lightGrey text-sm">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-lightGrey/60 text-sm ml-1">({reviewCount})</span>
      )}
    </div>
  );
};

export default Rating;
