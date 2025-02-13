'use client'

import React, { useState, useEffect, useRef } from 'react';

interface Quote {
  text: string;
  author: string;
}

const QuoteCarousel: React.FC = () => {
  const quotes: Quote[] = [
    {
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
    },
    {
      text: "Believe you can and you're halfway there.",
      author: 'Theodore Roosevelt',
    },
    {
      text: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
    },
    {
      text: 'Strive not to be a success, but rather to be of value.',
      author: 'Albert Einstein',
    },
    {
      text: 'The only limit to our realization of tomorrow will be our doubts of today.',
      author: 'Franklin D. Roosevelt',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 5000); // Change quote every 5 seconds
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, quotes.length]);

  const goToNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const goToPrev = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length
    );
  };

  const goToSlide = (index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-96 md:h-64 lg:h-80 bg-gray-100">
      {' '}
      {/* Adjust height as needed */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {quotes.map((quote, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 px-4 md:px-8 lg:px-16"
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10 h-full flex flex-col justify-center items-center">
                    {' '}
                    {/* Added flex and justify-center */}
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 text-center">
                      {quote.text}
                    </p>
                    <p className="text-md md:text-lg lg:text-xl italic text-gray-600 mt-4 text-center">
                      - {quote.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 md:px-8 lg:px-16">
              <button
                onClick={goToPrev}
                className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full w-3 h-3 ${
                    currentIndex === index
                      ? 'bg-gray-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCarousel;
