import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import ViewPaste from './components/ViewPaste'
import { Toaster } from 'react-hot-toast'
import Pastes from './components/Pastes'
 import LoginSignupPage from './pages/LoginSignupPage'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

   

   const router = createBrowserRouter([
    {
      path: "/signup",
      element: 
       <div>
         <Navbar    />
         <LoginSignupPage type="register"  />
       </div>
       
    },
    {
      path: "/login",
      element: 
       <div>
         <Navbar    />
         <LoginSignupPage type="login"  />
       </div>
       
    },
    {
      path: "/",
      element: 
       <ProtectedRoute>
          
         <Navbar/>
         <Home />
        
       </ProtectedRoute>
       
    },
    {
      path: "/pastes",
      element:  
      <ProtectedRoute>
            <Navbar   />
            <Pastes />
      </ProtectedRoute>
      
     
    },
    {
      path: "/pastes/:id",
      element: <ProtectedRoute>
        <Navbar     />
        <ViewPaste />
      </ProtectedRoute>
    }
  ])
  return (
    <div className='relative' >

      <RouterProvider router={router}  />
      <Toaster position='top-right' />
    </div>
  )
}

export default App;
