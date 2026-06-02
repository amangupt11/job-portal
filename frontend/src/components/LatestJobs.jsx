import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <section className='mx-auto my-16 max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                    <h2 className='font-display text-3xl font-bold tracking-tight sm:text-4xl'>
                        <span className='text-gradient'>Latest &amp; Top</span> Openings
                    </h2>
                    <p className='mt-2 text-muted-foreground'>Hand-picked roles from leading companies, updated daily.</p>
                </div>
                <Button variant="ghost" className="self-start sm:self-auto" onClick={() => navigate('/browse')}>
                    View all <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            {allJobs.length <= 0 ? (
                <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center'>
                    <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                        <Briefcase className='h-7 w-7' />
                    </div>
                    <h3 className='text-lg font-semibold'>No jobs available yet</h3>
                    <p className='mt-1 text-sm text-muted-foreground'>Check back soon — new opportunities are added every day.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default LatestJobs;
