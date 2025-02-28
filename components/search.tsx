'use client'

import React, { useState, useEffect, useRef } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchableDropdownProps> = ({ options, onSelect, placeholder = 'Select an option' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filterOptions = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = options.filter((option) => option.label.toLowerCase().includes(lowerCaseSearchTerm));
      setFilteredOptions(filtered);
      setHighlightedIndex(-1);
    };

    filterOptions();
  }, [searchTerm, options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value);
    setSearchTerm(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleFocusOut = (event: FocusEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('focusout', handleFocusOut);
    }

    return () => {
      inputRef.current?.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, filteredOptions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      handleOptionClick(filteredOptions[highlightedIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <div className="relative"> {/* Added wrapper for input and icon */}
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Added padding for icon
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"> {/* Dropdown icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto mt-1" role="listbox"> {/* Added margin top */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${highlightedIndex === index ? 'bg-blue-200' : ''}`}
                onClick={() => handleOptionClick(option)}
                role="option"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No options found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;