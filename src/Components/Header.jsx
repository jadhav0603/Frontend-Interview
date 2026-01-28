import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between'> 
        <div className='flex items-center'>
            <img className='w-[5vw]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS0wbWINmaQ5JI1lR2T4iFih3VH1A3BL0SVg&s' alt='logo' />
            <h1 className='w-fit font-semibold lg:text-4xl md:text-2xl'> CA MONK</h1>
        </div>

        <Button onClick={()=>navigate('/add-blog')} variant="ghost">Add Blogs</Button>
    </div>
  )
}

export default Header