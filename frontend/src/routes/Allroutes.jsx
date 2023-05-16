import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Signup } from '../component/Signup'
import { Login } from '../component/Login'
import { Admin } from '../component/Admin'
import { Navbar } from '../component/Navbar'
import { User } from '../component/User'
import {About} from '../component/About'
import {Contact} from '../component/Contact'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/user' element={<User/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/navbar' element={<Navbar/>}></Route>
          
        </Routes>
    </div>
  )
}
