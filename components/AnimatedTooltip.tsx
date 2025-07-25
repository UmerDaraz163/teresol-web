import React from 'react';
import TypeWriter from './TypeWriter'; 
import '../app/styles/homepage.css'; 

interface AnimatedTooltipProps {
  markerColor: string;
  countryName: string;
  tooltipText: string;
  hoverKey: number;
  setHoverKey: React.Dispatch<React.SetStateAction<number>>;
}

const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  markerColor,
  countryName,
  tooltipText,
  hoverKey,
  setHoverKey,
}) => {

  const borderColor = markerColor;
  const textColor = markerColor;
  const shadowColor = `${markerColor.replace(')', '/0.2)').replace('rgb', 'rgba')}`;
  
  return (
    <div
      onMouseEnter={() => setHoverKey(prev => prev + 1)}
      className={`
        tooltip-box
        group-hover:opacity-100 group-hover:translate-y-0
        transform opacity-0 -translate-y-2
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700
        text-white px-4 py-3 rounded-lg
        border-l-4
        w-fit max-w-xs
        text-xs sm:text-sm
        backdrop-blur-md
        relative
        overflow-hidden
        before:content-['']
        before:absolute
        before:top-0 before:left-0
        before:w-full before:h-0.5
        before:tooltip-top-border
        after:content-['']
        after:absolute
        after:bottom-0 after:right-0
        after:w-2 after:h-2
        after:border-r after:border-b
        after:opacity-70
      `}
      style={{
        borderLeftColor: borderColor,
        boxShadow: `0 10px 15px -3px ${shadowColor}`,
      }}
    >
      <strong 
        className="font-semibold drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]" 
        style={{ color: textColor }}
      >
        {countryName}:
      </strong>{" "}
      <TypeWriter
        key={hoverKey}
        text={tooltipText}
        speed={30}
        className="text-gray-100"
      />
      {/* Animated dots for waiting state */}
      {hoverKey === 0 && (
        <span className="inline-flex space-x-0.5 ml-1">
          {[...Array(3)].map((_, i) => (
            <span 
              key={i}
              className="inline-block w-1.5 h-1.5 rounded-full tooltip-loading-dot"
              style={{
                backgroundColor: `${markerColor.replace(')', '/0.8)').replace('rgb', 'rgba')}`,
                animationDelay: `${i * 0.16}s`
              }}
            />
          ))}
        </span>
      )}
    </div>
  );
};

export default AnimatedTooltip;