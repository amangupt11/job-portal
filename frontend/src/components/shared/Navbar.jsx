import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { ThemeToggle } from '../ui/theme-toggle'
import { Briefcase, LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
  const location = useLocation();
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

  const links = user && user.role === 'recruiter'
    ? [
        { to: '/admin/companies', label: 'Companies' },
        { to: '/admin/jobs', label: 'Jobs' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/jobs', label: 'Find Jobs' },
        { to: '/browse', label: 'Browse' },
      ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const navLink = (link, onClick) => (
    <Link
      key={link.to}
      to={link.to}
      onClick={onClick}
      className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive(link.to)
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {link.label}
      {isActive(link.to) && (
        <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
      )}
    </Link>
  );

  const initials = user?.fullname
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/70 glass'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8'>
        <Link to="/" className='flex items-center gap-2'>
          <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground shadow-sm'>
            <Briefcase className='h-5 w-5' />
          </span>
          <h1 className='text-xl font-bold tracking-tight font-display'>
            Job<span className='text-gradient'>Portal</span>
          </h1>
        </Link>

        {/* Desktop nav */}
        <div className='hidden items-center gap-2 md:flex'>
          <nav className='flex items-center gap-1'>
            {links.map((l) => navLink(l))}
          </nav>
          <div className='mx-2 h-6 w-px bg-border' />
          <ThemeToggle />
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient">Sign up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="ml-1 cursor-pointer ring-2 ring-transparent transition hover:ring-primary/30">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">{initials || 'U'}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-2" align="end">
                <div className='flex items-center gap-3 rounded-lg p-2'>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">{initials || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className='min-w-0'>
                    <h4 className='truncate font-semibold'>{user?.fullname}</h4>
                    <p className='truncate text-sm text-muted-foreground'>{user?.profile?.bio || user?.email}</p>
                  </div>
                </div>
                <div className='my-1 h-px bg-border' />
                <div className='flex flex-col text-muted-foreground'>
                  {user.role === 'student' && (
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/profile"><User2 className="h-4 w-4" /> View Profile</Link>
                    </Button>
                  )}
                  <Button onClick={logoutHandler} variant="ghost" className="justify-start text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile controls */}
        <div className='flex items-center gap-1 md:hidden'>
          <ThemeToggle />
          <button
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition hover:bg-accent'
            onClick={() => setIsMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className='animate-slide-down border-t border-border/70 bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden'>
          <nav className='flex flex-col gap-1'>
            {links.map((l) => navLink(l, () => setIsMobileOpen(false)))}
          </nav>
          <div className='my-3 h-px bg-border' />
          {!user ? (
            <div className='flex flex-col gap-2'>
              <Link to="/login" onClick={() => setIsMobileOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileOpen(false)}>
                <Button variant="gradient" className="w-full">Sign up</Button>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {user.role === 'student' && (
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile" onClick={() => setIsMobileOpen(false)}>View Profile</Link>
                </Button>
              )}
              <Button variant="destructive" className="w-full" onClick={logoutHandler}>Logout</Button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar;
