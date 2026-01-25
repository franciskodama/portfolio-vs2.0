// #d1ea13 yellow

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import ProjectCard from './ProjectCard';
import { projects } from '../data/Data';
import { Parallax } from 'react-scroll-parallax';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Sort projects by year ascending (newest last)
  const sortedProjects = [...projects].sort(
    (a, b) => Number(a.year) - Number(b.year)
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Runner = Matter.Runner,
      Composite = Matter.Composite;

    const engine = Engine.create();
    const world = engine.world;
    // Set higher gravity for more weight
    engine.gravity.y = 1;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Calculate slope angle (7.5vw rise over 100vw run = 0.075 slope)
    // Negative angle because right side is higher (lower Y value in canvas)
    const slope = 0.075;
    const angle = -Math.atan(slope);

    // Create boundaries
    // Ground needs to be angled.
    // We adjust Y position to ensure the lowest point (left) is visible within the container
    // The left edge is lower (higher Y) than the center by (width/2)*sin(angle) roughly?
    // Simpler: Center Y at height. Left side is at height + (w/2)*tan(alpha).
    // We want left side to be at ~height - 20 (buffer).
    // So Center Y = height - 20 - (width/2)*slope.

    // Actually, let's keep it simple and position it so it looks like the "floor"
    // matching the clip path which is at the visual bottom.
    // The relative container height is 50vh.

    const floorYOffset = (width / 2) * slope;
    const groundY = height - 10; // Base at bottom

    const ground = Bodies.rectangle(width / 2, groundY, width + 200, 100, {
      isStatic: true,
      angle: angle,
      render: { visible: false },
      friction: 0.1, // Allow sliding
    });

    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Bodies.rectangle(
      width + 50,
      height / 2,
      100,
      height * 2,
      {
        isStatic: true,
        render: { visible: false },
      }
    );

    World.add(world, [ground, leftWall, rightWall]);

    // Create card bodies
    const bodies: Matter.Body[] = [];
    const cardElements = cardsRef.current;

    sortedProjects.forEach((_, index) => {
      const cardEl = cardElements[index];
      if (!cardEl) return;

      // Use a consistent size or measure the element
      const cardWidth = 270; // Approximation of md-custom width
      const cardHeight = 350; // Approximation including text

      // Staggered creation handled by setTimeout inside, or we create them all far up
      // User wants chronological order (newest first), falling one by one.
    });

    // Helper to add a body
    const addBody = (index: number) => {
      const cardEl = cardElements[index];
      if (!cardEl) return;

      const randomX = Math.random() * (width - 100) + 50;
      const startY = -400; // Start well above

      const body = Bodies.rectangle(randomX, startY, 270, 300, {
        restitution: 0.9, // Bouncy like rubber
        friction: 0.005,
        frictionAir: 0.02,
        density: 0.001,
        angle: (Math.random() - 0.5) * 0.5, // Slight random rotation
        label: `card-${index}`,
      });

      // Apply initial random force/velocity
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0,
      });

      World.add(world, body);
      bodies[index] = body;
    };

    // Stagger drop
    sortedProjects.forEach((_, i) => {
      setTimeout(() => {
        addBody(i);
      }, i * 400); // 400ms delay between drops
    });

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync DOM with Physics
    let animationFrameId: number;
    const update = () => {
      bodies.forEach((body, index) => {
        const cardEl = cardElements[index];
        if (body && cardEl) {
          const { x, y } = body.position;
          const rotation = body.angle;
          cardEl.style.transform = `translate(${x - 135}px, ${
            y - 150
          }px) rotate(${rotation}rad)`;
          // -135 and -150 to center the origin (half of approximately 270x300) to the body position
          // Assuming cardEl is absolutely positioned at 0,0
          cardEl.style.opacity = '1';
        }
      });
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
    };
  }, [isMounted]);

  return (
    <div className='api-external relative'>
      <section
        className='section bg-bright text-dark py-32 pb-40 w-full 
        [clip-path:polygon(0_0,100%_0,100%_calc(100%-7.5vw),0_100%)]
        md-custom:py-48 md-custom:pb-56 lg-custom:py-56 lg-custom:pb-44'
        id='projects'
      >
        <div className='container mx-auto lg-custom:w-full'>
          <Parallax opacity={[0, 3]} scale={[1.5, 0.9]}>
            <h2 className='section-title w-[8ch] leading-12 font-main-semibold text-left'>
              selected projects
            </h2>
          </Parallax>

          <div
            ref={containerRef}
            className='relative w-full h-[65vh]'
            // Made container taller (150vh) to allow falling space.
            // Removed flex/justify-center because we are using absolute positioning now.
          >
            {sortedProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className='absolute top-0 left-0 opacity-0' // Start hidden until physics takes over
                style={{
                  width: '270px', // Enforce width for physics sync
                  // height: '350px', // Let height be auto
                  willChange: 'transform',
                }}
              >
                <div className='w-[270px] flex justify-center'>
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
