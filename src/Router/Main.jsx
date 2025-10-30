// Main.js
import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

// Pages
import Home from '../Pages/Home'

import Login from '../Auth/Login'
import Register from '../Auth/Register'

// Components
import Navbar from '../Pages/Navbar'
import Footer from '../Pages/Footer'
import Product from '../Pages/Product'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Dashboard from '../Auth/Admin/Dashboard'
import ProductAdmin from '../Auth/Admin/Productpage'
import Profile from '../Auth/users/Profile'

// Layouts
function MainLayout() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet /> {/* Pages with Navbar render here */}
        
      </div>
      <Footer/>
    </>
  )
}

function Adminlayout(){
  return (
    <div>
      <Outlet/>

    </div>

  );
}

function AuthLayout() {
  return (
    <div>
      <Outlet /> {/* Pages without Navbar render here */}
    </div>
  )
}

function Main() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
           <Route path='/profile' element={<Profile/>}/>
        </Route>

        {/* Routes without Navbar */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
          {/* Add more pages without Navbar here */}
        </Route>



        {/* Admin  */}
        <Route element={<Adminlayout/>}>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/admin/product' element={<ProductAdmin/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default Main
