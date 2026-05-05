import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../data/Data';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { scroller } from 'react-scroll';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cardSize, setCardSize] = useState(270);
  const [groundYOffset, setGroundYOffset] = useState(45);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Update URL helper
  const updateProjectUrl = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('project', slug);
    } else {
      params.delete('project');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Sync state with URL on load and URL changes
  useEffect(() => {
    const projectSlug = searchParams.get('project');
    const sectionParam = searchParams.get('section');

    if (projectSlug) {
      const project = projects.find((p) => p.slug === projectSlug);
      if (project) {
        setSelectedProject(project);
        setIsDrawerOpen(true);

        // Scroll to projects section when a project is opened via link
        scroller.scrollTo('projects', {
          duration: 800,
          delay: 200,
          smooth: 'easeInOutQuart',
          offset: -100,
        });
      }
    } else if (sectionParam === 'projects') {
      scroller.scrollTo('projects', {
        duration: 800,
        delay: 200,
        smooth: 'easeInOutQuart',
        offset: -100,
      });
    } else {
      setIsDrawerOpen(false);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setCardSize(isMobile ? 150 : 270);
      setGroundYOffset(isMobile ? 36 : -1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const groundY = height + groundYOffset; // Base at bottom

    const ground = Bodies.rectangle(width / 2, groundY, width + 200, 100, {
      isStatic: true,
      angle: angle,
      render: { visible: false },
      friction: 0.1,
    });

    const wallHeight = height * 15; // Height to hold cards falling from the top
    const wallY = height / 2 - wallHeight / 3; // Shifted up to cover the startY of all cards

    const leftWall = Bodies.rectangle(-50, wallY, 100, wallHeight, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Bodies.rectangle(width + 50, wallY, 100, wallHeight, {
      isStatic: true,
      render: { visible: false },
    });

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

      // Dynamic Body size
      const body = Bodies.rectangle(randomX, startY, cardSize, cardSize, {
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
          cardEl.style.transform = `translate(${x - cardSize / 2}px, ${
            y - cardSize / 2
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
  }, [isMounted, inView, cardSize, groundYOffset]);

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
            <div className='flex flex-col items-center gap-12 md-custom:flex-row md-custom:justify-between -rotate-[4.29deg] mt-8 md-custom:mt-[18%] mx-4 md-custom:mx-24'>
              <h2 className='text-6xl text-center mt-24 md:-mt-[3.4em] md-custom:text-right w-full md-custom:w-[8ch] md:leading-16 font-main-semibold'>
                selected projects
              </h2>

              <div className='flex flex-col items-center text-center gap-6 w-full md-custom:w-[30ch] md-custom:mr-18 md-custom:items-start md-custom:text-left'>
                <p className='font-main-bold text-dark w-[16ch] md-custom:w-full text-3xl leading-9'>
                  VISION. ARCHITECTURE. EXECUTION.
                  <span className='font-main-heavy text-third'>
                    <br />
                    ALL BY ONE HAND.
                  </span>
                </p>
                <p className='font-main-light text-dark text-lg leading-8 w-[32ch]'>
                  These are not just case studies. They are functional assets I
                  ideated, designed, and fully coded. I believe the strongest
                  Technical Product Leads are those who have built the trenches
                  they now lead.
                </p>
              </div>
            </div>
          </div>

          {/* Container Height */}
          <div
            ref={containerRef}
            className='relative w-full h-[50vh] md:h-[24vh]'
          >
            {sortedProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className='absolute top-40 left-0 opacity-0' // Start hidden until physics takes over
                style={{
                  width: `${cardSize}px`,
                  height: `${cardSize}px`,
                  willChange: 'transform',
                }}
              >
                <div
                  style={{ width: `${cardSize}px` }}
                  className='flex justify-center'
                >
                  <ProjectCard
                    project={project}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsDrawerOpen(true);
                      updateProjectUrl(project.slug);
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
        onOpenChange={(open) => {
          setIsDrawerOpen(open);
          if (!open) {
            updateProjectUrl(null);
          }
        }}
      />
    </div>
  );
};

export default Projects;
