import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-bold text-lg sm:text-xl">{singleJob?.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge className="text-blue-700 font-bold" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`w-full sm:w-auto rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6 text-base sm:text-lg">
                Job Description
            </h1>

            <div className="my-4 text-sm sm:text-base space-y-2">
                <p><span className="font-bold">Role:</span> <span className="pl-2 text-gray-800">{singleJob?.title}</span></p>
                <p><span className="font-bold">Location:</span> <span className="pl-2 text-gray-800">{singleJob?.location}</span></p>
                <p><span className="font-bold">Description:</span> <span className="pl-2 text-gray-800">{singleJob?.description}</span></p>
                <p><span className="font-bold">Requirements:</span> <span className="pl-2 text-gray-800">{singleJob?.requirements}</span></p>
                <p><span className="font-bold">Experience:</span> <span className="pl-2 text-gray-800">{singleJob?.experienceLevel} yrs</span></p>
                <p><span className="font-bold">Salary:</span> <span className="pl-2 text-gray-800">{singleJob?.salary} LPA</span></p>
                <p><span className="font-bold">Total Applicants:</span> <span className="pl-2 text-gray-800">{singleJob?.applications?.length}</span></p>
                <p><span className="font-bold">Posted Date:</span> <span className="pl-2 text-gray-800">{singleJob?.createdAt?.split("T")[0]}</span></p>
            </div>
        </div>
    );
};

export default JobDescription;
