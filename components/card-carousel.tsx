'use client'

import React, { useState, useEffect, useRef } from 'react';

interface QuoteCard {
  quote: string;
  author: string;
}

const quoteCards: QuoteCard[] = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { quote: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
];

const CardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quoteCards.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + quoteCards.length) % quoteCards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quoteCards.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto"> {/* Adjust max-w-md as needed */}
      <div
        className="carousel-container overflow-hidden rounded-lg shadow-lg"
        ref={carouselRef}
      >
        <div
          className="carousel-slide transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Smooth transition
        >
          {quoteCards.map((card, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-6 bg-white"  // bg-white for card background
            >
              <div className="border rounded-lg p-8 shadow-md"> {/* Added border and shadow */}
                <p className="text-xl font-medium text-gray-800 mb-4">
                  {card.quote}
                </p>
                <p className="text-gray-600">- {card.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2"> {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;