'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';


interface QuoteCard {
  quote: string;
  author: string;
}

const quotes: QuoteCard[] = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
];

const QuoteCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);


  return (
    <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
      <div className="carousel-item w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-xl font-bold mb-4">{quotes[currentIndex].quote}</p>
            <p className="text-gray-500">- {quotes[currentIndex].author}</p>
          </div>
        </div>
      </div>

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button className="btn btn-circle" onClick={prevCard}>
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button className="btn btn-circle" onClick={nextCard}>
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default QuoteCarousel;