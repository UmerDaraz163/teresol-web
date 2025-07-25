import React, { useState, useLayoutEffect, useRef } from 'react';
import TypeWriter from './TypeWriter';
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

  const [localHoverKey, setLocalHoverKey] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // adjust tooltip position ==> after visible
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      // to center the tooltip
      tooltip.style.transform = 'translateX(-50%)';

      if (rect.right > viewportWidth) {
        const overflowAmount = rect.right - viewportWidth + 16;
        tooltip.style.transform = `translateX(calc(-50% - ${overflowAmount}px))`;
      }
      else if (rect.left < 0) {
        const overflowAmount = Math.abs(rect.left) + 16; 
        tooltip.style.transform = `translateX(calc(-50% + ${overflowAmount}px))`;
      }
    }
  }, [localHoverKey]);

  return (

    <div
      className="absolute group cursor-pointer"
      style={marker.position}
      onMouseEnter={() => setLocalHoverKey(prev => prev + 1)}
    >
      {/* The visible marker dot */}
      <div className="w-4 h-4">
        <div className="w-full h-full rounded-full animate-ping" style={{ backgroundColor: marker.color }}></div>
        <div className="w-full h-full rounded-full absolute top-0 left-0" style={{ backgroundColor: marker.color }}></div>
      </div>

      <div
        ref={tooltipRef}
        className="absolute bottom-full left-1/2 mb-3 w-max max-w-xs sm:max-w-sm z-20
                   opacity-0 group-hover:opacity-100 pointer-events-none
                   transition-opacity duration-300"
        style={{ transform: 'translateX(-50%)' }} 
      >
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl text-sm">
          <div className="flex items-start space-x-2">
            <i className="ri-information-line text-xl" style={{ color: marker.color }} />
            <div>
              <strong className="block">{marker.name}</strong>
              <TypeWriter key={localHoverKey} text={marker.text} speed={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapMarker;