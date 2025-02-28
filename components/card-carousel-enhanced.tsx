'use client'

import React, { useState, useEffect, useRef } from 'react';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
];

const QuoteCarouselEnhanced: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[400px] w-full md:w-3/4 mx-auto overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div
        className="carousel-container relative h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ref={carouselRef}
      >
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="carousel-slide absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center text-center px-8"
            style={{ left: `${index * 100}%` }}
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 max-w-2xl"> {/* Added backdrop blur and rounded bg */}
              <p className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">{quote.text}</p> {/* Added text shadow */}
              <p className="text-xl md:text-2xl font-medium text-gray-200">- {quote.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            className={`rounded-full w-3 h-3 ${currentIndex === index ? 'bg-white' : 'bg-gray-300 hover:bg-white'} transition-colors duration-300`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteCarouselEnhanced;