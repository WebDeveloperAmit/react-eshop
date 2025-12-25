import React from 'react';
import { useLocation } from 'react-router-dom';
import InnerNavbar from '../InnerNavbar';
import Navbar from '../Navbar';
import Topbar from '../Topbar';

const Header = () => {
  const location = useLocation();
  return (
    <>
    <Topbar />
    {location.pathname === '/' ? <Navbar /> : <InnerNavbar />}
    </>
  )
}

export default Header