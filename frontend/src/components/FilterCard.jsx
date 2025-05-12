/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Bangalore', 'Hyderabad', 'Pune', 'Gurugram', 'Chennai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer', 'Data Science engineer', 'AI/ML engineer'],
  },
  {
    filterType: 'Experience',
    array: ['Fresher', '0 - 2 Years', '2 - 5 Years', '5 -10 Years', '10+ Years'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-sm">
      <h1 className="font-bold text-lg mb-4">Filter Jobs</h1>
      <hr className="mb-4" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={`filter-${index}`} className="mb-6">
            <h1 className="font-semibold text-base sm:text-lg mb-2">{data.filterType}</h1>
            <div className="flex flex-col gap-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={`item-${index}-${idx}`} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-sm sm:text-base">{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
