import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
 import ViewPaste from './components/ViewPaste'
import { Toaster } from 'react-hot-toast'
import Pastes from './components/Pastes'


function App() {
 
  const router=createBrowserRouter([
    {
    path:"/",
    element:<div>
      <Navbar/>
      <Home/>
    </div>
    },
    {
      path:"/pastes",
      element:<div>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:<div>
        <Navbar/>
        <ViewPaste/>
      </div>
    }
  ])
  return (
    <div className='relative'>
      <RouterProvider router={router}/>
      <Toaster position='top-right'/> 
    </div>
  )
}

export default App;
