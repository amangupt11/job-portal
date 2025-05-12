import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSaved(savedJobs.includes(job._id));
  }, [job._id]);

  // Toggle save/unsave
  const toggleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');

    if (saved) {
      const updated = savedJobs.filter(id => id !== job._id);
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      setSaved(false);
      toast.success('Removed from saved');
    } else {
      savedJobs.push(job._id);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setSaved(true);
      toast.success('Saved for later');
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col justify-between h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={toggleSave}
        >
          <Bookmark
            className={`w-4 h-4 sm:w-5 sm:h-5 ${saved ? 'fill-[#7209b7] text-[#7209b7]' : ''}`}
          />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-3">
        <Button className="p-4 sm:p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-base sm:text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-base sm:text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button
          className="bg-[#7209b7] w-full sm:w-auto"
          onClick={toggleSave}
        >
          {saved ? 'Unsave' : 'Save For Later'}
        </Button>
      </div>
    </div>
  );
};

Job.propTypes = {
  job: PropTypes.shape({
    createdAt: PropTypes.string,
    company: PropTypes.shape({
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.string,
    jobType: PropTypes.string,
    salary: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Job;
