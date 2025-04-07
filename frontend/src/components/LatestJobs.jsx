import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-3xl sm:text-4xl font-bold text-center sm:text-left'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Opening Jobs
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8'>
                {
                    allJobs.length <= 0 
                        ? <span className='col-span-full text-center'>No Job Available</span> 
                        : allJobs?.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                          ))
                }
            </div>
        </div>
    );
};

export default LatestJobs;
