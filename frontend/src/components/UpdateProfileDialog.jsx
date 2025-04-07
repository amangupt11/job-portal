/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)
  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map((skill) => skill) || '',
    file: user?.profile?.resume || '',
  })
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)
    if (input.file) {
      formData.append('file', input.file)
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-sm sm:max-w-md"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { label: 'Name', name: 'fullname', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Number', name: 'phoneNumber', type: 'text' },
              { label: 'Bio', name: 'bio', type: 'text' },
              { label: 'Skills', name: 'skills', type: 'text' },
              {
                label: 'Resume',
                name: 'file',
                type: 'file',
                accept: 'application/pdf',
              },
            ].map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4"
              >
                <Label
                  htmlFor={field.name}
                  className="text-left sm:text-right capitalize"
                >
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  accept={field.accept}
                  value={
                    field.type !== 'file' ? input[field.name] || '' : undefined
                  }
                  onChange={
                    field.type !== 'file'
                      ? changeEventHandler
                      : fileChangeHandler
                  }
                  className="sm:col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
