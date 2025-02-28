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

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  onSelect,
  placeholder = 'Select an option',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filterOptions = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredOptions(filtered);
    };

    filterOptions();
  }, [searchTerm, options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(true); // Open dropdown on input change
  };

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value);
    setSearchTerm(option.label); // Display selected label in input
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and unmount

  return (
    <div className="relative w-64" ref={dropdownRef}> {/* Added ref here */}
      <input
        type="text"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)} // Open on input click as well
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
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

export default SearchableDropdown;