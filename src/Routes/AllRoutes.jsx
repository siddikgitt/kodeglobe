import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../component/Login'
import Navbar from '../component/Navbar'
import Notes from '../component/Notes'
import Signup from '../component/Signup'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/notes' element={<PrivateRoute><Notes/></PrivateRoute>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes