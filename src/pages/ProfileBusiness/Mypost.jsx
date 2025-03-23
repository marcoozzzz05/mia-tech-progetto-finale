import React from 'react'
import EventCard from '../../components/EventCard/EventCard'

const Mypost = () => {
  return (
    <div className='flex flex-col gap-4 items-center mb-6'>
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  )
}

export default Mypost
