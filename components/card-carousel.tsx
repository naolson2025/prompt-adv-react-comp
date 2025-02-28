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
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
];

const CardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quoteCards.length);
    }, 5000); // Change interval as needed

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + quoteCards.length) % quoteCards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quoteCards.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg"> {/* Overflow hidden for carousel effect */}
        <div
          className="flex transition-transform duration-500 ease-in-out" // Smooth transition
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Dynamic positioning
          ref={carouselRef}
        >
          {quoteCards.map((card, index) => (
            <div key={index} className="w-full shrink-0 p-6 bg-white"> {/* shrink-0 prevents cards from shrinking */}
              <div className="text-xl font-bold mb-2">{card.quote}</div>
              <div className="text-gray-600">- {card.author}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2"> {/* Navigation buttons */}
        <button onClick={handlePrev} className="bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1">&lt;</button>
        <button onClick={handleNext} className="bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1">&gt;</button>
      </div>
    </div>
  );
};

export default CardCarousel;