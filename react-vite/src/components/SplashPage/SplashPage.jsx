import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { thunkLogin } from '../../redux/session';
import './SplashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  const handleDemoLogin = () => {
    dispatch(thunkLogin({ email: 'demo@demo.io', password: 'password' }))
      .then(() => {
        navigate('/dashboard');
      });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="splash-container">
      <div className="header">
        <img src="/logo.png" alt="BoundTogether Logo" className="logo" /> {/* Logo reference */}
        <h2>&quot;Start trading books today!&quot;</h2>
      </div>
      <div className="buttons">
        <button onClick={() => navigate('/signup')} className="btn">Sign Up</button>
        <button onClick={() => navigate('/login')} className="btn">Log In</button>
        <button onClick={handleDemoLogin} className="btn demo-btn">
          Log In as Demo User
        </button>
      </div>
      <div className="description">
        <p>BoundTogether is your platform for trading books with others. Manage your personal library, browse, and exchange books with ease.</p>
      </div>
    </div>
  );
};

export default SplashPage;
