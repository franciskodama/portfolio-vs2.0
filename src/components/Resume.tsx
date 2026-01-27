import { jobs } from '../data/Data';

const Resume = () => {
  return (
    <div className='w-full bg-dark py-20 overflow-hidden'>
      <div className='z-10 max-w-[90%] mx-auto'>
        <div className='flex justify-between items-end mb-32'>
          <h1 className='section-title'>Why Me?</h1>
          <div className='text-right'>
            <h2 className='text-[1.5rem] font-main-semibold uppercase leading-none'>
              Code with a Director’s perspective.
            </h2>
            <p className='text-third text-[1.2rem] font-main-light'>
              I don't just build features; I build business outcomes.
            </p>
          </div>
        </div>

        <div className='flex flex-col'>
          {jobs.map((job) => (
            <div
              key={job.id}
              className='group border-b border-white/10 px-4 py-8 cursor-pointer transition-all hover:bg-white/5'
            >
              <div className='flex items-center justify-between gap-4'>
                <div className='flex flex-row gap-8'>
                  <div className='text-third/50 leading-4.5 group-hover:text-third text-[1rem] font-main-semibold capitalize transition-colors duration-300'>
                    <h4 className='px-1'>{job.companies[0].periodStart}</h4>
                    {job.companies[0].periodEnd === 'TODAY' ? (
                      <h4 className='text-bright text-[0.8rem] bg-third/50 group-hover:text-bright px-1'>
                        {job.companies[0].periodEnd}
                      </h4>
                    ) : (
                      <h4 className='px-1'>{job.companies[0].periodEnd}</h4>
                    )}
                  </div>

                  <div className='flex flex-col gap-2'>
                    <h3 className='text-bright/50 group-hover:text-bright text-[2.4rem] font-main-regular capitalize leading-none transition-colors duration-300'>
                      {job.title}
                    </h3>
                    <h3 className='text-third/50 group-hover:text-third text-[1.2rem] font-main-regular capitalize leading-none transition-colors duration-300'>
                      {job.companies[0].name}
                    </h3>
                  </div>
                  {job.id === 8 && (
                    <p
                      className='w-[12ch] ml-4 text-center text-third font-bold text-[1rem] leading-6 -rotate-15 tracking-widest'
                      style={{ fontFamily: 'var(--font-gloria)' }}
                    >
                      Why become a dev?
                    </p>
                  )}
                </div>

                <h4 className='max-w-140 text-right leading-6 text-bright/50 group-hover:text-bright text-[1rem] font-main-regular capitalize transition-colors duration-300'>
                  {job.skills.map((skill) => skill).join(', ')}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
