import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { thunkLogin } from '../../redux/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useModal } from '../../context/Modal';
import './SplashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  const handleDemoLogin = () => {
    dispatch(thunkLogin({ email: 'demo@demo.io', password: 'password' }))
      .then(() => {
        navigate('/dashboard');
      });
  };

  const openLoginModal = () => {
    setModalContent(<LoginFormModal onClose={closeModal} />);
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal onClose={closeModal} />);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="splash-container">
      <img src="/logo.png" alt="BoundTogether Logo" className="logo" />
      <div className="header">
        <h2>&quot;Start trading books today!&quot;</h2>
      </div>
      <div className="buttons">
        <button onClick={openSignupModal} className="btn" type="button">Sign Up</button>
        <button onClick={openLoginModal} className="btn" type="button">Log In</button>
        <button onClick={handleDemoLogin} className="btn demo-btn" type="button">
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
