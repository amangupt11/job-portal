import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Briefcase, CalendarDays, CheckCircle2, IndianRupee, MapPin, Users } from 'lucide-react';

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

    const meta = [
        { icon: MapPin, label: 'Location', value: singleJob?.location },
        { icon: Briefcase, label: 'Job Type', value: singleJob?.jobType },
        { icon: IndianRupee, label: 'Salary', value: singleJob?.salary ? `${singleJob.salary} LPA` : '—' },
        { icon: Users, label: 'Positions', value: singleJob?.position },
        { icon: CheckCircle2, label: 'Experience', value: singleJob?.experienceLevel },
        { icon: CalendarDays, label: 'Posted', value: singleJob?.createdAt?.split('T')[0] },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="mx-auto my-8 max-w-7xl animate-fade-in px-4 sm:px-6 lg:px-8">
                {/* Header card */}
                <Card className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 rounded-2xl border border-border">
                                <AvatarImage src={singleJob?.company?.logo} className="rounded-2xl object-contain p-2" />
                                <AvatarFallback className="rounded-2xl bg-primary/10 text-primary"><Briefcase className="h-7 w-7" /></AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{singleJob?.title}</h1>
                                <p className="mt-1 text-muted-foreground">{singleJob?.company?.name}</p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <Badge variant="info">{singleJob?.position} Positions</Badge>
                                    <Badge variant="warning">{singleJob?.jobType}</Badge>
                                    <Badge variant="soft">{singleJob?.salary} LPA</Badge>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            variant={isApplied ? 'secondary' : 'gradient'}
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            {isApplied ? (<><CheckCircle2 className="h-5 w-5" /> Already Applied</>) : 'Apply Now'}
                        </Button>
                    </div>
                </Card>

                {/* Body grid */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="p-6 sm:p-8 lg:col-span-2">
                        <h2 className="border-b border-border pb-4 text-lg font-bold">Job Description</h2>
                        <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                            <div>
                                <h3 className="font-semibold text-foreground">Role</h3>
                                <p className="text-muted-foreground">{singleJob?.title}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">About this role</h3>
                                <p className="text-muted-foreground">{singleJob?.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Requirements</h3>
                                <p className="text-muted-foreground">{Array.isArray(singleJob?.requirements) ? singleJob.requirements.join(', ') : singleJob?.requirements}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="h-fit p-6 sm:p-8">
                        <h2 className="text-lg font-bold">Overview</h2>
                        <dl className="mt-4 space-y-4">
                            {meta.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <div className="min-w-0">
                                        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
                                        <dd className="truncate font-medium">{value ?? '—'}</dd>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Users className="h-4 w-4" />
                                </span>
                                <div className="min-w-0">
                                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Total Applicants</dt>
                                    <dd className="truncate font-medium">{singleJob?.applications?.length ?? 0}</dd>
                                </div>
                            </div>
                        </dl>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
