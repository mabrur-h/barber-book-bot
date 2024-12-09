import React from 'react';
import { Barber } from '../../types';

interface ModalHeaderProps {
  barber: Barber;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ barber, onClose }) => {
  return (
    <div className="p-4 border-b border-dark/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={barber.imageUrl} 
            alt={barber.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="text-neonYellow font-medium">{barber.name}</h3>
            <div className="text-xs text-lightGrey mt-0.5">
              {barber.specialties.join(' • ')}
            </div>
          </div>
        </div>
        <button 
          className="text-lightGrey hover:text-white p-1"
          onClick={onClose}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
