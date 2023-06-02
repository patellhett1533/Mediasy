import React, { useEffect } from 'react'
import Navbar from './navbar/Navbar'
import Pannel from './panel/Pannel'
import {
  Routes,
  Route,
  Outlet,
  useNavigate
} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  }, [])
  
  return (
    <div className='home'>
      <Navbar />
      <Outlet />
      <Pannel />
    </div>
  )
}

export default Home