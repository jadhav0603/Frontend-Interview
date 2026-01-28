import React, { useState } from 'react'
import DetailedCard from './SelectedCard';

const Card = ({ data,onSelect,isSelected }) => {

  return (
  
      <div
        className = {`text-sm lg:text-lg p-3 mr-3 rounded-2xl  transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${isSelected ? "scale-105 bg-blue-100 border border-l-8 border-blue-300 shadow-xl" : "scale-100 border border-gray-300 bg-gray-100 hover:bg-gray-200" }`}
        onClick={()=>onSelect()}
      >
        <div className='flex justify-between text-sm '>
          <p>{data.category}</p>
          <div>
            <p className="text-right">{data.date.split('T')[1].split('.')[0]}</p>
            <p>{data.date.split('T')[0]}</p>
          </div>
        </div>
        <p className='flex font-semibold'> {data.title} </p>
        <p className='flex text-left'> {data.description} </p>

      </div>
  )
}

export default Card