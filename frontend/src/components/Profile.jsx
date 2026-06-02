import { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Contact, Mail, Pen, FileText, Download } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const initials = user?.fullname
        ?.split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className='mx-auto my-6 max-w-4xl animate-fade-in px-4'>
                {/* Profile card */}
                <Card className='overflow-hidden'>
                    <div className='h-24 bg-gradient-to-r from-primary via-fuchsia-500 to-indigo-500 sm:h-28' />
                    <div className='px-4 pb-6 sm:px-8'>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                            <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
                                <Avatar className="-mt-12 h-24 w-24 border-4 border-card shadow-md sm:h-28 sm:w-28">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">{initials || 'U'}</AvatarFallback>
                                </Avatar>
                                <div className='pb-1'>
                                    <h1 className='font-display text-2xl font-bold tracking-tight'>{user?.fullname}</h1>
                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio || 'No bio added yet'}</p>
                                </div>
                            </div>
                            <Button onClick={() => setOpen(true)} variant="outline" className='self-start sm:self-auto'>
                                <Pen className='h-4 w-4' /> Edit Profile
                            </Button>
                        </div>

                        <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                            <div className='flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3'>
                                <Mail className='h-4 w-4 shrink-0 text-primary' />
                                <span className='truncate text-sm'>{user?.email}</span>
                            </div>
                            <div className='flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3'>
                                <Contact className='h-4 w-4 shrink-0 text-primary' />
                                <span className='truncate text-sm'>{user?.phoneNumber}</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h2 className='mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>Skills</h2>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills?.length !== 0
                                    ? user?.profile?.skills.map((item, index) => (
                                        <Badge key={index} variant="soft">{item}</Badge>
                                      ))
                                    : <span className='text-sm text-muted-foreground'>No skills added yet</span>}
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h2 className='mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>Resume</h2>
                            {isResume && user?.profile?.resume ? (
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href={user?.profile?.resume}
                                    className='inline-flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary'
                                >
                                    <FileText className='h-4 w-4' />
                                    <span className='max-w-[14rem] truncate'>{user?.profile?.resumeOriginalName}</span>
                                    <Download className='h-4 w-4' />
                                </a>
                            ) : (
                                <span className='text-sm text-muted-foreground'>No resume uploaded</span>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Applied jobs */}
                <Card className='mt-6 p-4 sm:p-6'>
                    <h2 className='mb-4 text-lg font-bold'>Applied Jobs</h2>
                    <AppliedJobTable />
                </Card>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;
