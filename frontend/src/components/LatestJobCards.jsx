import PropTypes from 'prop-types';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Briefcase, MapPin } from 'lucide-react';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/description/${job._id}`)}
            className='group flex h-full cursor-pointer flex-col p-5 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg'
        >
            {/* Company Section */}
            <div className='flex items-center gap-3'>
                <Avatar className="h-12 w-12 rounded-xl border border-border">
                    <AvatarImage src={job?.company?.logo} className="rounded-xl object-contain p-1.5" />
                    <AvatarFallback className="rounded-xl bg-primary/10 text-primary"><Briefcase className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div className='min-w-0'>
                    <h1 className='truncate font-semibold'>{job?.company?.name}</h1>
                    <p className='flex items-center gap-1 text-sm text-muted-foreground'><MapPin className="h-3.5 w-3.5" /> India</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div className='mt-4 flex-1'>
                <h1 className='mb-1.5 text-lg font-bold leading-snug transition-colors group-hover:text-primary'>{job?.title}</h1>
                <p className='line-clamp-2 text-sm text-muted-foreground'>{job?.description}</p>
            </div>

            {/* Badges */}
            <div className='mt-4 flex flex-wrap gap-2'>
                <Badge variant="info">{job?.position} Positions</Badge>
                <Badge variant="warning">{job?.jobType}</Badge>
                <Badge variant="soft">{job?.salary} LPA</Badge>
            </div>
        </Card>
    );
};

LatestJobCards.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string.isRequired,
        }),
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        jobType: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
    }).isRequired,
};

export default LatestJobCards;
