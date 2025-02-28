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

const SearchableDropdownEnhanced: React.FC<SearchableDropdownProps> = ({ options, onSelect, placeholder = 'Select an option' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // For keyboard navigation
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filterOptions = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = options.filter((option) => option.label.toLowerCase().includes(lowerCaseSearchTerm));
      setFilteredOptions(filtered);
      setHighlightedIndex(-1); // Reset highlight on filter
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
    setHighlightedIndex(-1); // Reset highlight
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleFocusOut = (event: FocusEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1); // Reset highlight
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('focusout', handleFocusOut);
      inputRef.current?.focus();
    }

    return () => {
      inputRef.current?.removeEventListener('focusout', handleFocusOut);
    };
  }, []);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault(); // Prevent cursor from moving in the input
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
      <input
        type="text"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyDown} // Add keydown handler
        ref={inputRef}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto" role="listbox">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${highlightedIndex === index ? 'bg-blue-200' : ''}`} // Highlighted style
              onClick={() => handleOptionClick(option)}
              role="option"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isOpen && filteredOptions.length === 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg px-3 py-2">
          No options found.
        </div>
      )}
    </div>
  );
};

export default SearchableDropdownEnhanced;

// Example usage (remains the same)