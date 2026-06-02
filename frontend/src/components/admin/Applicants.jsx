/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Card } from '../ui/card'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { Button } from '../ui/button'
import { ArrowLeft, Users } from 'lucide-react'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className='mx-auto my-10 max-w-7xl animate-fade-in px-4 sm:px-6 lg:px-8'>
        <div className="mb-6 flex items-center gap-4">
          <Button type="button" onClick={() => navigate("/admin/jobs")} variant="outline" size="icon" aria-label="Back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className='flex items-center gap-2 font-display text-2xl font-bold tracking-tight'>
              <Users className="h-6 w-6 text-primary" />
              Applicants
            </h1>
            <p className="text-sm text-muted-foreground">{applicants?.applications?.length || 0} candidate(s) applied</p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <ApplicantsTable />
        </Card>
      </div>
    </div>
  );
}

export default Applicants;
