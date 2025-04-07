import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="text-center px-4 sm:px-6 md:px-10">
      <div className="flex flex-col gap-5 my-10 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          Job Search Website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Best Jobs</span>
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg px-2 sm:px-10 md:px-20">
          Find your dream job effortlessly! Explore thousands of job opportunities across various industries, tailored to your skills and preferences.
        </p>
        <div className="flex w-full sm:w-[90%] md:w-[70%] lg:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm sm:text-base px-2 py-2 bg-transparent"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] px-4 py-2"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
