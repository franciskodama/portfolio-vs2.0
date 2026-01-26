import { useId } from 'react';

export const ArrowCurved = ({ className }: { className?: string }) => {
  const uniqueId = useId();
  // Ensure the ID is safe for URL references by removing colons if present
  const markerId = `arrowhead-${uniqueId.replace(/:/g, '')}`;

  return (
    <svg viewBox='0 0 120 120' className={className}>
      <defs>
        <marker
          id={markerId}
          markerWidth='10'
          markerHeight='10'
          refX='9'
          refY='3'
          orient='auto'
          markerUnits='strokeWidth'
        >
          <path d='M0,0 L0,6 L9,3 z' fill='currentColor' />
        </marker>
      </defs>
      <path
        d='M 10 50 Q 60 100 110 20'
        fill='none'
        stroke='currentColor'
        strokeWidth='3'
        markerEnd={`url(#${markerId})`}
        strokeLinecap='round'
      />
    </svg>
  );
};
