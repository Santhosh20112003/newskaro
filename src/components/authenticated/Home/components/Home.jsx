import React from 'react'
import Headlines from './Headlines'
import TrendingSources from './TrendingSources'

function Home() {
  return (
	<div className='bg-gray-50 flex items-start w-full'>
	  <Headlines/>
	  <TrendingSources/>
	</div>
  )
}

export default Home
