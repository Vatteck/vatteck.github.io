import React from 'react';

interface AtlasLogoProps {
  className?: string;
  size?: number;
  withGlow?: boolean;
}

export const AtlasLogo: React.FC<AtlasLogoProps> = ({ className = '', size = 120, withGlow = false }) => {
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background soft red halo if glow is enabled */}
      {withGlow && (
        <div className="absolute inset-0 rounded-[22%] bg-atlas-red-bright/35 blur-xl pointer-events-none transition-all duration-1000 animate-pulse" />
      )}

      <img
        src="https://raw.githubusercontent.com/Vatteck/Atlas/refs/heads/master/atlas/view/resources/img/logo.svg"
        alt="Atlas Brand Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain rounded-[22%] drop-shadow-xl select-none"
        style={{ width: size, height: size }}
      />
    </div>
  );
};
