// app/components/SlideIndicator.tsx

interface SlideIndicatorProps {
  count: number;
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
  className?: string; // Optional prop for custom positioning
}

export default function SlideIndicator({
  count,
  currentIndex,
  onIndicatorClick,
  className = '',
}: SlideIndicatorProps) {
  return (
    <div className={`flex space-x-3 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick(index)}
          className={`w-12 h-1.5 rounded-full transition-colors duration-300 cursor-pointer ${
            index === currentIndex
              ? 'bg-[#25237b]' // Active bar
              : 'bg-[#8b0303] hover:bg-white/70' // Inactive bar
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}