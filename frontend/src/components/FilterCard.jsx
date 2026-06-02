/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { SlidersHorizontal } from 'lucide-react';
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
    <Card className="w-full p-5">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-base font-bold">
          <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
        </h1>
        {selectedValue && (
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={() => setSelectedValue('')}>
            Clear
          </Button>
        )}
      </div>
      <div className="h-px w-full bg-border" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="gap-0">
        {filterData.map((data, index) => (
          <div key={`filter-${index}`} className="border-b border-border/70 py-4 last:border-0">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{data.filterType}</h2>
            <div className="flex flex-col gap-2.5">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={`item-${index}-${idx}`} className="flex items-center space-x-2.5">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="cursor-pointer text-sm font-normal text-foreground/90">{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
};

export default FilterCard;
