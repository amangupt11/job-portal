import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { SearchX } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
          return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
              job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
              job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
              job.experienceLevel.toLowerCase().includes(searchedQuery.toLowerCase())

      });
      setFilterJobs(filteredJobs);
  }
     else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Find your next role</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filterJobs.length} opportunities matching your search</p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full lg:w-72 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <FilterCard />
            </div>
          </aside>

          {filterJobs.length <= 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <SearchX className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold">No opportunities found</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Try adjusting your filters or search keywords to see more results.</p>
            </div>
          ) : (
            <div className="h-[calc(100vh-11rem)] flex-1 overflow-y-auto pb-6 pr-1">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filterJobs.map((job, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
