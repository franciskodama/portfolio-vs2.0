import { ReactNode } from 'react';

type BalloonProps = {
  children?: ReactNode;
  variant: 'filled' | 'outlined';
  heartShown: boolean;
  color?: string;
  size?: string;
  rotate?: number;
};

const Balloon = ({
  children,
  variant,
  heartShown,
  color = '#ed1c24',
  size = '26em',
  rotate = 0,
}: BalloonProps) => {
  const isFilled = variant === 'filled';
  const show = isFilled ? !heartShown : heartShown;

  return (
    <div
      className={`relative flex items-center justify-center ${
        show ? 'flex' : 'hidden'
      }`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <svg
        className={`absolute top-0 left-0 w-full h-full z-0 ${
          isFilled ? '' : 'text-third'
        }`}
        viewBox='0 0 128 128'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
        style={!isFilled ? { color: color } : undefined}
      >
        <path
          d='M74.5 106.88l5.63-1a2.86 2.86 0 0 0 2.07-4.1a34.64 34.64 0 0 0-7.2-9.62c-.44 2.89-2.16 7.38-3.62 10.8a2.85 2.85 0 0 0 3.12 3.92z'
          fill={isFilled ? color : 'none'}
          stroke={isFilled ? 'none' : 'currentColor'}
          strokeWidth={isFilled ? '0' : '0.5'}
        ></path>
        <path
          d='M25.56 51.54C33.14 83.3 64.22 97.75 75.68 95s32.1-32 25.08-61.43C95.79 12.8 74.93 0 54.16 4.97s-33.57 25.83-28.6 46.6v-.03z'
          fill={isFilled ? color : 'none'}
          stroke={isFilled ? 'none' : 'currentColor'}
          strokeWidth={isFilled ? '0' : '0.5'}
        ></path>
        {/* Shadow/Detail - Darkened via opacity */}
        <path
          d='M73.43 98.11l5.16-1.23c1.63-.39 2.64-2.02 2.25-3.65s-2.02-2.64-3.65-2.25L72 92.21c-1.63.39-2.64 2.02-2.25 3.65s2.02 2.64 3.65 2.25h.03z'
          fill='#c62828'
          fillOpacity={'1'}
          stroke={isFilled ? 'none' : 'currentColor'}
          strokeWidth={isFilled ? '0' : '0.5'}
        ></path>
        {/* Highlight */}
        {/* {isFilled && (
          <path
            d='M78.28 13.44c-4.07-2.48-9.9-4.13-13.2.55c-1.76 2.49-.1 7.15 3.53 8.2c6.14 1.79 7.21 4 8.46 5.79c1.51 2.1 2.94 4.73 5.49 5.14s4-1.51 3.89-5.21c-.02-5.92-3.11-11.4-8.17-14.47z'
            fill='#ffffff'
            opacity='0.3'
          ></path>
        )} */}
      </svg>
      <div className='relative z-10 p-12 pr-16 pb-16 flex flex-col items-center justify-center text-center h-full w-full'>
        {children}
      </div>
    </div>
  );
};

export default Balloon;
