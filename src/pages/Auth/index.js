import React from 'react'
import Login from './Login'
import { Route ,Routes } from 'react-router-dom'

export default function index() {
  return (
    <Routes>
      <Route path='login' element={<Login/>} />
      <Route path='*' element={<h1>404</h1>} />
    </Routes>
  )
}
