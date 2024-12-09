import { useState } from 'react';
import BarbershopList from './components/BarbershopList/BarbershopList';
import BarbershopDetails from './components/BarbershopDetails/BarbershopDetails';
import BookingSystem from './components/Booking/BookingSystem';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'list' | 'details' | 'booking'>('list');
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  const handleViewChange = (view: 'list' | 'details' | 'booking', shopId?: string) => {
    setCurrentView(view);
    if (shopId) {
      setSelectedShopId(shopId);
    }
  };

  return (
    <div className="min-h-screen w-full bg-dark flex flex-col">
      <header className="bg-darkGrey/80 shadow-lg backdrop-blur-sm w-full">
        <div className="w-full px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neonYellow">Barber Booking</h1>
        </div>
      </header>
      <main className="flex-1 w-full">
        {currentView === 'list' && (
          <BarbershopList onShopSelect={(shopId) => handleViewChange('details', shopId)} />
        )}
        {currentView === 'details' && selectedShopId && (
          <BarbershopDetails 
            shopId={selectedShopId} 
            onBack={() => handleViewChange('list')}
            onBooking={() => handleViewChange('booking')}
          />
        )}
        {currentView === 'booking' && selectedShopId && (
          <BookingSystem 
            shopId={selectedShopId}
            onBack={() => handleViewChange('details')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
