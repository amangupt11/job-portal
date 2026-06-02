import { useState } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles, TrendingUp } from 'lucide-react';
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
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Decorative backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-20 h-60 w-60 rounded-full bg-fuchsia-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 md:px-10">
        <div className="flex flex-col items-center gap-6">
          <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            India&apos;s No.1 Job Search Platform
          </span>

          <h1 className="animate-fade-up font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Search, Apply &amp; <br className="hidden sm:block" />
            Get Your <span className="text-gradient">Best Job</span>
          </h1>

          <p className="max-w-2xl animate-fade-up text-base text-muted-foreground sm:text-lg" style={{ animationDelay: '60ms' }}>
            Find your dream job effortlessly. Explore thousands of opportunities across
            every industry — tailored to your skills, experience and preferences.
          </p>

          {/* Search */}
          <div className="mt-2 flex w-full max-w-2xl animate-fade-up items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-lg transition-shadow focus-within:shadow-glow" style={{ animationDelay: '120ms' }}>
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Job title, keyword or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
              className="w-full border-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground/70 sm:text-base"
            />
            <Button onClick={searchJobHandler} variant="gradient" size="lg" className="shrink-0 rounded-full px-5 sm:px-8">
              <Search className="h-5 w-5 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-success" /> 10,000+ live jobs</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> 500+ companies</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" /> Free for candidates</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
