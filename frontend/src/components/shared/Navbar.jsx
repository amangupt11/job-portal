import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useState } from 'react'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const menuItems = user && user.role === 'recruiter'
    ? (
      <>
        <li><Link to="/admin/companies">Companies</Link></li>
        <li><Link to="/admin/jobs">Jobs</Link></li>
      </>
    ) : (
      <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Find</Link></li>
        <li><Link to="/browse">Jobs</Link></li>
      </>
    );

  return (
    <div className='bg-white border-b shadow-sm'>
      <div className='flex items-center justify-between px-4 md:px-6 lg:px-8 mx-auto max-w-7xl h-16'>
        <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
        <button
          className='md:hidden p-2'
          onClick={() => setIsMobileOpen(prev => !prev)}
        >
          <Menu size={24} />
        </button>
        <div className='hidden md:flex items-center gap-10'>
          <ul className='flex font-medium items-center gap-5'>
            {menuItems}
          </ul>
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 sm:w-80">
                <div className='flex gap-2'>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  {user.role === 'student' && (
                    <div className='flex items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      {isMobileOpen && (
        <div className='md:hidden px-4 py-2 border-t bg-white animate-slide-down'>
          <ul className='flex flex-col font-medium gap-3 mb-3'>
            {menuItems}
          </ul>

          {!user ? (
            <div className='flex flex-col gap-2'>
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {user.role === 'student' && (
                <Button variant="outline" asChild>
                  <Link to="/profile">View Profile</Link>
                </Button>
              )}
              <Button variant="destructive" onClick={logoutHandler}>Logout</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar;
