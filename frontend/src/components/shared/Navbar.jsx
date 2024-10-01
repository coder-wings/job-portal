import React from 'react'
import { Link } from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'


function Navbar() {
    const user = false;
    return (
        <div className='bg-white' >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16' >
                <div>
                    <h1 className='text-2xl font-bold' >Job<span className='text-[#F83002]' >Portal</span></h1>
                </div>
                <div className='flex items-center gap-12' >
                    <ul className='flex font-medium item-center gap-5' >
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>

                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2' >
                                <Link to="/login" >
                                    <Button variant="outline" className="rounded">Login</Button>
                                </Link>
                                <Link to="/signup" >
                                    <Button className="bg-[#6a3bc2] hover:bg-[#480cb7] rounded" >Signup</Button>
                                </Link>
                            </div>
                        )
                            : (
                                <Popover>
                                    <PopoverTrigger>
                                        <Avatar className="cursor-pointer" >
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            {/* <AvatarFallback>CN</AvatarFallback> */}
                                        </Avatar>

                                    </PopoverTrigger>
                                    <PopoverContent className="w-80" >
                                        <div className='flex gap-4 space-y-2' >
                                            <Avatar className="cursor-pointer" >
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                {/* <AvatarFallback>CN</AvatarFallback> */}
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium' >Rahul Katiyar</h4>
                                                <p className='text-sm text-muted-foreground' >Lorem ipsum dolor sit amet.</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-grey-600' >
                                            <div className='flex w-fit items-center gap-2 cursor-pointer' >
                                                <User2 />
                                                <Button variant="link" >View Profile</Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer' >
                                                <LogOut />
                                                <Button variant="link" >Logout</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar