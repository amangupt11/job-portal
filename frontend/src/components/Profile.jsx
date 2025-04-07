import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 px-4 py-6 sm:p-8'>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <div className='text-right'>
                        <Button onClick={() => setOpen(true)} variant="outline">
                            <Pen className='h-4 w-4' />
                        </Button>
                    </div>
                </div>

                <div className='my-5 space-y-3'>
                    <div className='flex items-center gap-3'>
                        <Mail className='w-4 h-4' />
                        <span className='text-sm break-words'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact className='w-4 h-4' />
                        <span className='text-sm break-words'>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='font-semibold mb-1'>Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills.length !== 0 
                                ? user?.profile?.skills.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                  ))
                                : <span className='text-sm text-gray-500'>NA</span>
                        }
                    </div>
                </div>

                <div className='mt-5'>
                    <Label className="text-md font-bold block mb-1">Resume</Label>
                    {
                        isResume 
                            ? <a 
                                target='_blank' 
                                rel='noreferrer' 
                                href={user?.profile?.resume} 
                                className='text-blue-500 hover:underline break-all text-sm'>
                                {user?.profile?.resumeOriginalName}
                              </a> 
                            : <span className='text-sm text-gray-500'>NA</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-8 py-6'>
                <h1 className='font-bold text-lg mb-4'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;
