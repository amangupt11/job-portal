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
    'Android Developer',
    'AI/ML Engineer',
    'DevOps Engineer'
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
        <div className="mx-auto my-14 max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Explore by category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse popular roles and jump straight to relevant openings
            </p>
          </div>
          <Carousel opts={{ align: 'start' }} className="w-full px-6">
            <CarouselContent>
              {category.map((cat, index) => (
                <CarouselItem
                  key={index}
                  className="flex basis-full justify-center sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Button
                    onClick={() => searchJobHandler(cat)}
                    variant="outline"
                    className="w-full max-w-xs rounded-full font-medium hover:bg-primary/10 hover:text-primary"
                  >
                    {cat}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    );
  };

  export default CategoryCarousel;
