/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [allJobs]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Search Results</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {allJobs.length} {allJobs.length === 1 ? "job" : "jobs"} found
          </p>
        </div>

        {allJobs.length <= 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold">No results found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">We couldn&apos;t find any jobs matching your search. Try a different keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allJobs.map((job, index) => (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                key={job?._id}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
