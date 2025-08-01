import React, { useState, useLayoutEffect, useRef } from 'react';
// import TypeWriter from './TypeWriter'; 

interface MarkerData {
  name: string;
  position: {
    top: string;
    left: string;
  };
  color: string;
  text: string;
}

interface MapMarkerProps {
  marker: MarkerData;
}

const MapMarker: React.FC<MapMarkerProps> = ({ marker }) => {
  const [hoverKey, setHoverKey] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [arrowStyle, setArrowStyle] = useState({ left: '50%' });

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const buffer = 16; 

      let newTransform = 'translateX(-50%)';
      let newArrowLeft = '50%';
      if (rect.right > viewportWidth - buffer) {
        const overflowAmount = rect.right - viewportWidth + buffer;
        newTransform = `translateX(calc(-50% - ${overflowAmount}px))`;
        newArrowLeft = `calc(50% + ${overflowAmount}px)`;
      }
      else if (rect.left < buffer) {
        const overflowAmount = buffer - rect.left;
        newTransform = `translateX(calc(-50% + ${overflowAmount}px))`;
        newArrowLeft = `calc(50% - ${overflowAmount}px)`;
      }
      
      tooltip.style.transform = newTransform;
      setArrowStyle({ left: newArrowLeft });
    }
  }, [hoverKey]); 

  return (
    <div
      className="absolute group cursor-pointer"
      style={marker.position}
      onMouseEnter={() => setHoverKey(prev => prev + 1)}
    >
      <div className="w-4 h-4 relative">
        <div className="w-full h-full rounded-full animate-ping" style={{ backgroundColor: marker.color }}></div>
        <div className="w-full h-full rounded-full absolute top-0 left-0 border-2 border-white" style={{ backgroundColor: marker.color }}></div>
      </div>

      {/* The Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bottom-full left-1/2 mb-3 w-max max-w-xs sm:max-w-sm z-20
                   opacity-0 group-hover:opacity-100 pointer-events-none
                   transition-opacity duration-300"
      >
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl text-sm relative">
          <div className="flex items-start space-x-2">
            {/* <i className="ri-information-line text-xl" style={{ color: marker.color }} /> */}
            <div>
              <strong className="block">{marker.name}</strong>
              {/* <TypeWriter key={hoverKey} text={marker.text} speed={30} /> */}
            </div>
          </div>
          {/* Tooltip Arrow: Its position is now dynamic */}
          <div
            className="absolute top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900 transform -translate-x-1/2"
            style={arrowStyle}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MapMarker;