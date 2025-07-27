import React from 'react';

interface ImageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};
