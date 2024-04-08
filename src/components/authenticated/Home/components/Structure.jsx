import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Headlines'
import Navbar from './Navbar'

function Structure() {
  return (
	<div>
	  <Navbar/>
	  <span className="">
	  <Outlet/>
	  </span>
	</div>
  )
}

export default Structure
