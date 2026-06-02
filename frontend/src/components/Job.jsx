import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Bookmark, Briefcase, MapPin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
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

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <Card className="flex h-full flex-col p-5 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Badge variant="ghost" className="font-medium">
          {daysAgo === 0 ? 'Posted today' : `${daysAgo} days ago`}
        </Badge>
        <Button
          variant={saved ? 'secondary' : 'outline'}
          className="rounded-full"
          size="icon"
          onClick={toggleSave}
          aria-label={saved ? 'Remove from saved' : 'Save for later'}
        >
          <Bookmark
            className={`h-4 w-4 transition-colors ${saved ? 'fill-primary text-primary' : ''}`}
          />
        </Button>
      </div>

      {/* Company Info */}
      <div className="my-4 flex items-center gap-3">
        <Avatar className="h-12 w-12 rounded-xl border border-border">
          <AvatarImage src={job?.company?.logo} className="rounded-xl object-contain p-1.5" />
          <AvatarFallback className="rounded-xl bg-primary/10 text-primary"><Briefcase className="h-5 w-5" /></AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="truncate font-semibold">{job?.company?.name}</h1>
          <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="flex-1">
        <h1 className="mb-1.5 text-lg font-bold leading-snug">{job?.title}</h1>
        <p className="line-clamp-3 text-sm text-muted-foreground">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="info">{job?.position} Positions</Badge>
        <Badge variant="warning">{job?.jobType}</Badge>
        <Badge variant="soft">{job?.salary} LPA</Badge>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full"
        >
          Details
        </Button>
        <Button
          variant="gradient"
          className="w-full"
          onClick={toggleSave}
        >
          {saved ? 'Unsave' : 'Save For Later'}
        </Button>
      </div>
    </Card>
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
