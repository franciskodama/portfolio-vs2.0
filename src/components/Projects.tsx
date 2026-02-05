import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../data/Data';
import { Parallax } from 'react-scroll-parallax';
import { Star } from 'lucide-react';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    engine.gravity.y = 1;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Calculate slope angle (7.5vw rise over 100vw run = 0.075 slope)
    const slope = 0.075;
    // Negative angle because right side is higher (lower Y value in canvas)
    const angle = -Math.atan(slope);

    // Boundaries
    const floorYOffset = (width / 2) * slope;
    const groundY = height - 10; // Base at bottom

    const ground = Bodies.rectangle(width / 2, groundY, width + 200, 100, {
      isStatic: true,
      angle: angle,
      render: { visible: false },
      friction: 0.1,
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

    // Reset cards style before starting animation (hide them again). Crucial for "restarting" the animation
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
      // const startY = -400; // Start well above
      // or
      // Instead of const startY = -400;
      const startY = -400 - index * 350; // Each card starts 350px higher than the last

      const body = Bodies.rectangle(randomX, startY, 320, 320, {
        restitution: 0.8, // Bouncy
        friction: 0.1, // Slide
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
          <div className='-mt-24'>
            <Parallax opacity={[0, 3]} scale={[1.5, 0.9]}>
              <div className='flex flex-col -rotate-[4.29deg] items-end mr-[20%]'>
                <h2 className='section-title text-7xl w-[8ch] leading-19 font-main-semibold text-right'>
                  selected projects
                </h2>
                <div className='flex items-center gap-2 mt-4 mr-8'>
                  <Star
                    className='w-[20px] h-[20px] mt-1'
                    strokeWidth={1.6}
                    fill='yellow'
                  />
                  <p
                    className='font-semibold text-dark text-[1.2rem] leading-9'
                    style={{ fontFamily: 'var(--font-gloria)' }}
                  >
                    most recent
                  </p>
                </div>
              </div>
            </Parallax>
          </div>

          {/* Container Height */}
          <div ref={containerRef} className='relative w-full h-[55vh]'>
            {sortedProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className='absolute top-40 left-0 opacity-0' // Start hidden until physics takes over
                style={{
                  width: '320px', // Enforce width for physics sync
                  height: '320px',
                  willChange: 'transform',
                }}
              >
                <div className='w-[320px] flex justify-center'>
                  <ProjectCard
                    project={project}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsDrawerOpen(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal rendered outside the physics container to avoid transform issues */}
      <ProjectModal
        project={selectedProject}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};

export default Projects;
