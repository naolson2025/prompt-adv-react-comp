'use client'


import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Optional positioning
  className?: string; // Optional additional styling
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top', className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    const adjustPosition = () => {
      if (tooltipRef.current && triggerRef.current) {
        const tooltip = tooltipRef.current;
        const trigger = triggerRef.current;
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top = triggerRect.top;
        let left = triggerRect.left;

        switch (position) {
          case 'top':
            top = triggerRect.top - tooltipRect.height - 8; // 8px margin
            left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
            break;
          case 'bottom':
            top = triggerRect.bottom + 8;
            left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
            break;
          case 'left':
            top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
            left = triggerRect.left - tooltipRect.width - 8;
            break;
          case 'right':
            top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
            left = triggerRect.right + 8;
            break;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;


        // Basic boundary check (improve as needed)
        if (top < 0) tooltip.style.top = '0px';  //Prevent tooltip from going off-screen
        if (left < 0) tooltip.style.left = '0px';
        if (left + tooltipRect.width > window.innerWidth) tooltip.style.left = `${window.innerWidth - tooltipRect.width}px`;
      }
    };

    if (showTooltip) {
      adjustPosition(); // Initial position

      window.addEventListener('resize', adjustPosition); // Adjust on resize
    } else {
      window.removeEventListener('resize', adjustPosition);
    }

    return () => window.removeEventListener('resize', adjustPosition); // Cleanup
  }, [showTooltip, position]);


  return (
    <div
      className="relative inline-block" // Needed for absolute positioning of tooltip
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={triggerRef}
    >
      {children}
      {showTooltip && (
        <div
          ref={tooltipRef}
          className={`absolute z-10 px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-90 transition-opacity duration-300 ${className}
            ${position === 'top' && '-translate-y-full mb-2'}
            ${position === 'bottom' && 'mt-2'}
            ${position === 'left' && '-translate-x-full mr-2'}
            ${position === 'right' && 'ml-2'}
          `}
          style={{ // Inline styles for dynamic positioning.  Consider CSS variables if you want to theme.
            pointerEvents: 'none', // Prevent tooltip from blocking mouse events on the trigger
          }}
        >
          {text}
          {/* Optional: Add an arrow with tailwind using a pseudo-element */}
          <div className={`absolute bg-gray-900 rotate-45 -z-10 ${position === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' : ''} ${position === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''} ${position === 'left' ? 'right-0 top-1/2 -translate-y-1/2 -translate-x-1/2' : ''} ${position === 'right' ? 'left-0 top-1/2 -translate-y-1/2 translate-x-1/2' : ''}`} style={{ width: '8px', height: '8px' }}></div>

        </div>
      )}
    </div>
  );
};

export default Tooltip;