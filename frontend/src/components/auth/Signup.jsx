import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/reducers/auth/authSlice'
import { Loader2 } from 'lucide-react';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector((store)=>store.auth);
  const [input, setInput] = useState({
    "fullname":"",
    "email":"",
    "phoneNumber":"",
    "password":"",
    "role":"",
    "file":""
  });

  const changeEventHandler = (e)=>{
    setInput({...input, [e.target.name]: e.target.value});
  }
  const changeFilehandler = (e)=>{
    setInput({...input, file: e.target.files ?.[0]})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file)
    }

    try{
      dispatch(setLoading(true));
      const result = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials: true
      });
      if(result.data.success){
        navigate('/login')
        toast.success(result.data.message);
      }
    }catch(error){
      console.log("ok>>", error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false));
    }
  }
    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center max-w-7xl mx-auto' >
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5' >SignUp</h1>
                    <div className='mb-2' >
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="katiyar"
                            className="placeholder:italic placeholder:text-slate-400"
                            value={input.fullname}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='mb-2' >
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="katiyar@gmail.com"
                            className="placeholder:italic placeholder:text-slate-400"
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='mb-2' >
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            placeholder="8564905417"
                            className="placeholder:italic placeholder:text-slate-400"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='mb-2' >
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex items-center justify-between' >
                        <RadioGroup defaultValue="student" className="flex items-center gap-4 my-5" >
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="student"
                                    value="student"
                                    className="cursor-pointer"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="recruiter"
                                    value="recuiter"
                                    className="cursor-pointer"
                                    checked={input.role === "recuiter"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2' >
                            <Label>Profile</Label>
                            <Input
                            type="file"
                            name="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={changeFilehandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-black text-white rounded" ><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>:<Button type="submit" variant="primary" className="w-full my-4 bg-black text-white rounded" >Signup</Button>
                    }
                    {/* <Button type="submit" variant="primary" className ="w-full my-4 bg-black text-white rounded" >Signup</Button> */}
                    <span className='text-sm' >Aleady have an account? <Link to="/login" className='text-blue-600 mx-2' >Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup