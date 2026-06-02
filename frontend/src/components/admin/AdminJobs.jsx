/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className='mx-auto my-10 max-w-6xl animate-fade-in px-4 sm:px-6 lg:px-8'>
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Job Postings</h1>
          <p className="text-sm text-muted-foreground">Create, edit and review applicants for your roles.</p>
        </div>

        <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Filter by name, role"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate("/admin/jobs/create")} variant="gradient" className="w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Add Job
          </Button>
        </div>

        <Card className="overflow-hidden">
          <AdminJobsTable />
        </Card>
      </div>
    </div>
  );
};

export default AdminJobs;
