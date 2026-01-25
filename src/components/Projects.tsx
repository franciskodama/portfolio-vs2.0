// #d1ea13 yellow

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import ProjectCard from './ProjectCard';
import { ArrowCurved } from './icons/ArrowCurved';
import { projects } from '../data/Data';
import { Parallax } from 'react-scroll-parallax';
import { Undo } from 'lucide-react';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Sort projects by year ascending (newest last)
  const sortedProjects = [...projects].sort(
    (a, b) => Number(a.year) - Number(b.year)
  );

  const [inView, setInView] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Intersection Observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            // Uncomment to reset when leaving view
            setInView(false);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current || !inView) return;

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

    // Reset cards style before starting animation (hide them again)
    // This is crucial for "restarting" the animation
    cardElements.forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'none';
      }
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

    // Stagger drop timers
    const timers: NodeJS.Timeout[] = [];
    sortedProjects.forEach((_, i) => {
      const timer = setTimeout(() => {
        // Check if still mounted and in view before adding body
        if (containerRef.current && inView) {
          addBody(i);
        }
      }, i * 400); // 400ms delay between drops
      timers.push(timer);
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
      timers.forEach((t) => clearTimeout(t)); // Clear timeouts to prevent bodies adding after unmount/scroll away
    };
  }, [isMounted, inView]);

  return (
    <div className='api-external relative'>
      <section
        className='section bg-bright text-dark py-12 pb-40 w-full 
        [clip-path:polygon(0_0,100%_0,100%_calc(100%-7.5vw),0_100%)]
        md-custom:py-18 md-custom:pb-56 lg-custom:py-16 lg-custom:pb-44'
        id='projects'
      >
        <div className='container mx-auto lg-custom:w-full'>
          <div className='relative -mt-24'>
            <Parallax opacity={[0, 3]} scale={[1.5, 0.9]}>
              <h2 className='section-title text-7xl w-[8ch] -rotate-[4.29deg] leading-19 font-main-semibold text-right ml-auto mr-[20%]'>
                selected projects
              </h2>
            </Parallax>
            <div className='absolute top-45 right-120 w-20 h-20 rotate-50'>
              <ArrowCurved className='w-full h-full text-third mt-2' />
            </div>
            <p
              className='absolute top-40 right-60 font-semibold text-third text-[1.5rem] leading-9 -rotate-[4.29deg] translate-x-2'
              style={{ fontFamily: 'var(--font-gloria)' }}
            >
              <span className='text-[1.2rem]'>Most recommended:</span>
              <br />- Monkey Business
              <br />- Handyfor.me
              <br />- Trezo.app
            </p>
          </div>

          <div
            // Container Height
            ref={containerRef}
            className='relative w-full h-[55vh]'
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
