import React from 'react';

interface ContactInfoProps {
  phone: string;
  workingHours: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ phone, workingHours }) => {
  return (
    <div className="bg-dark/50 rounded-lg p-4">
      <h3 className="text-neonYellow font-medium mb-3">Contact Information</h3>
      <div className="space-y-2 text-lightGrey">
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone}
        </p>
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {workingHours}
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
