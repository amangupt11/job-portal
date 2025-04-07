import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from './ui/carousel';
  import { Button } from './ui/button';
  import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { setSearchedQuery } from '@/redux/jobSlice';
  
  const category = [
    'Frontend Developer',
    'Backend Developer',
    'Data Science',
    'UI/UX Developer',
    'Graphic Designer',
    'FullStack Developer',
  ];
  
  const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate('/browse');
    };
  
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <Carousel className="w-full max-w-6xl mx-auto my-10">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex justify-center"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full w-full max-w-xs"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  };
  
  export default CategoryCarousel;
  