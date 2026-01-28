import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Card from './Card'

const Blogs = () => {
    
    const handleFetch = async()=>{
        const response = await axios.get('http://localhost:3001/blogs')
        console.log(response.data)
        return response.data
    }
    
    const {isPending,isError, data, error} = useQuery({queryKey: ['blogs'],queryFn:handleFetch})

    if(isPending){
        return <span>L O A D I N G . . . .</span>
    }

    if(isError){
        return <span>ERROR : {error.message}</span>
    }

  return (
    <div>
        {
            data.map((ele,i)=>(
                <Card data={ele} />
            ))
        }
    </div>
  )
}

export default Blogs