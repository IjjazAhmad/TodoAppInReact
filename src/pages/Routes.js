import React from 'react'


import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './Auth'

import Dashboard from './Dashboard'
import Frontend from './Frontend'
import PrivateRoute from '../components/PrivateRoute'
import { useAuthContext } from './Contexts/AuthContext'

export default function CustomRoutes() {
  const { isAuth } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path='/*' element={<PrivateRoute Component={Frontend} />} />
        <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
        <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
      </Routes>
    </>
  )
}
