import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';

// blackbox code
// const location = useLocation();
// const from = location.state?.from?.pathname || '/';
// navigate(from, { replace: true });  // After successful login



function AuthLogin() {
  return (
    <div>AuthLogin</div>
  )
}

export default AuthLogin;