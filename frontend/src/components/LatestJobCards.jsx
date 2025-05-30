import PropTypes from 'prop-types';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-all hover:shadow-2xl'
        >
            {/* Company Section */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 my-2'>
                <Button className="p-4" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div className='mt-3'>
                <h1 className='font-bold text-lg mb-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
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
