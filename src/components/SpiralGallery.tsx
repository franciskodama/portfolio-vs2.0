'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  caption: string;
}

interface SpiralGalleryProps {
  items: GalleryItem[];
}

const SpiralGallery: React.FC<SpiralGalleryProps> = ({ items: propItems }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);

  // State to track scroll progress
  const scrollState = useRef({ progress: 0 });

  // 1. DUPLICATE DATA: Triple the items for a long ribbon
  const items = useMemo(
    () => [...propItems, ...propItems, ...propItems],
    [propItems]
  );

  // Configuration
  const imgWidth = 90;
  const imgHeight = 90;
  const radius = 370;
  const verticalGap = 80; // 2. INCREASED GAP: Bigger gap between rows
  const slices = 5; // 3. CURVATURE: Number of vertical slices to approximate curve

  // Geometry Math for Slices
  const sliceWidth = imgWidth / slices;
  // Angle for one slice (Chord formula)
  const sliceAngleRad = 2 * Math.asin(sliceWidth / (2 * radius));
  const sliceAngleDeg = sliceAngleRad * (180 / Math.PI);

  // Total angel for one image
  const imageTotalAngleDeg = sliceAngleDeg * slices;

  // Vertical Pitch Math
  const itemsPerTurn = 360 / imageTotalAngleDeg;
  const coilHeight = imgHeight + verticalGap;
  const yStep = coilHeight / itemsPerTurn;

  // Calculate correction for helix slope (how much Y changes per degree of rotation)
  // Total Y change per 360 degrees = coilHeight
  // pixels per degree = coilHeight / 360
  const pixelsPerDeg = coilHeight / 360;

  useEffect(() => {
    if (!spiralRef.current || !containerRef.current) return;

    // Register ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        scrollState.current.progress = self.progress;
      },
    });

    let baseRotation = 0;

    // Animation Loop
    const ticker = gsap.ticker.add(() => {
      // Idle spin
      baseRotation += 0.15;
      // Scroll spin
      const scrollRotation = scrollState.current.progress * 360 * 2;

      // Vertical movement
      const totalSpiralHeight = items.length * yStep;
      // Start/End scroll positions
      const startY = totalSpiralHeight * 0.3;
      const endY = -totalSpiralHeight * 0.7;

      const currentY = startY + (endY - startY) * scrollState.current.progress;

      if (spiralRef.current) {
        gsap.set(spiralRef.current, {
          rotationY: baseRotation - scrollRotation,
          y: currentY,
        });
      }
    });

    return () => {
      gsap.ticker.remove(ticker);
      st.kill();
    };
  }, [items, yStep]);

  return (
    <div
      ref={containerRef}
      // 4. PERSPECTIVE: Set to 600px for immersive FOV
      className='relative w-full h-[150vh] overflow-hidden bg-transparent cursor-grab active:cursor-grabbing'
      style={{ perspective: '600px' }}
    >
      <div
        className='absolute top-1/2 left-1/2 w-0 h-0'
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={spiralRef}
          className='relative w-0 h-0'
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, index) => {
            // Calculate Position of the Image Center
            const angleCenter = index * imageTotalAngleDeg;
            const yPos = index * yStep - (items.length * yStep) / 2;

            // Use require for local assets
            const imgSrc =
              require(`../assets/images/whyme-gallery/why-pic-${item.id}.jpg`)
                .default.src;

            return (
              <CurvedItem
                key={`${item.id}-${index}`}
                imgSrc={imgSrc}
                caption={item.caption}
                yPos={yPos}
                angleCenter={angleCenter}
                radius={radius}
                sliceWidth={sliceWidth}
                sliceAngleDeg={sliceAngleDeg}
                slices={slices}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                pixelsPerDeg={pixelsPerDeg}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 5. CURVED ITEM COMPONENT
// Renders the image as 'slices' strips to approximate a curve
const CurvedItem = ({
  imgSrc,
  caption,
  yPos,
  angleCenter,
  radius,
  sliceWidth,
  sliceAngleDeg,
  slices,
  imgWidth,
  imgHeight,
  pixelsPerDeg,
}: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className='absolute top-0 left-0 hover:z-50'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        // Note: remove yPos from here, distribute it to slices?
        // No, keep base yPos here, add relative offset to slices.
        transform: `translateY(${yPos}px) rotateY(${angleCenter}deg)`,
      }}
    >
      {/* Render Slices to form the curve */}
      {Array.from({ length: slices }).map((_, i) => {
        // Calculate slice offset angle relative to center
        const offsetIdx = i - (slices - 1) / 2;
        const rotateY = offsetIdx * sliceAngleDeg;

        // Background position X for this slice
        const bgX = -i * sliceWidth;

        // Helix correction: Adjust Y based on the rotation angle of this specific slice
        // This makes the slices climb the spiral slope individually
        const yOffset = rotateY * pixelsPerDeg;

        return (
          <div
            key={i}
            className='absolute top-0 left-0 transition-opacity duration-300'
            style={{
              width: `${sliceWidth + 1}px`, // +1px overlap to prevent seams
              height: `${imgHeight}px`,
              marginTop: `-${imgHeight / 2}px`,
              marginLeft: `-${sliceWidth / 2}px`,
              backfaceVisibility: 'visible', // Show the back of the spiral
              // Apply Slope Correction (yOffset)
              transform: `rotateY(${rotateY}deg) translateY(${yOffset}px) translateZ(${radius}px)`,
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: `${imgWidth}px ${imgHeight}px`,
              backgroundPosition: `${bgX}px 0px`,
              // 6. B&W to COLOR: grayscale filter
              filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
            }}
          >
            {/* Optional: Dark overlay for the back side of the ribbon */}
            <div
              className='absolute inset-0 bg-black/80 w-full h-full pointer-events-none'
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            />
          </div>
        );
      })}

      {/* Caption (Floating in front) - Only visible on hover */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `rotateY(0deg) translateZ(${radius + 20}px) translateY(${
            imgHeight / 2 + 20
          }px)`,
          width: '200px',
          left: '-100px',
          textAlign: 'center',
        }}
      >
        <p className='text-[0.6rem] text-bright uppercase font-main-regular tracking-widest bg-black/60 px-2 py-1 rounded inline-block'>
          {caption}
        </p>
      </div>
    </div>
  );
};

export default SpiralGallery;
