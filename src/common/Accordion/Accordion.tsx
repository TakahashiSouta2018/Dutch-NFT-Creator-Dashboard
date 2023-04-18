import React, { useState, useCallback } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { IChevronDown } from '../Icons';

const Accordion: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ children, className, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback((e: Event) => {
    e.stopPropagation();
    setIsOpen(false);
  }, []);
  const ref = useDetectClickOutside({ onTriggered: handleClose });

  return (
    <div
      className={`z-20 relative flex items-center gap-2 px-3 py-2 ${className}`}
      ref={ref}
    >
      <div
        className="text-sm flex-grow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </div>
      {isOpen && (
        <div className="absolute z-100 opacity-100 top-[45px] left-0 bg-gray-100 border-2 w-[500px] p-5 rounded-lg shadow">
          {children}
        </div>
      )}
      <IChevronDown />
    </div>
  );
};

export default Accordion;
