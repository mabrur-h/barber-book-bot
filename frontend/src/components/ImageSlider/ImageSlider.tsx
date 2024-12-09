import React, { useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true
  });

  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden group" {...handlers}>
      {/* Images */}
      <div
        className="absolute w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="absolute flex h-full" style={{ width: `${images.length * 100}%` }}>
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-full"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div style={{ gap: '3px' }} className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              height: '3px',
              width: currentIndex === index ? '6px' : '3px',
              backgroundColor: `rgba(255, 255, 255, ${currentIndex === index ? '0.8' : '0.4'})`,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              if (currentIndex !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={e => {
              if (currentIndex !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
