import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { thunkLogin } from '../../redux/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useModal } from '../../context/Modal';
import './SplashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent, closeModal } = useModal();
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  const handleDemoLogin = async () => {
    const credentials = { email: 'demo@aa.io', password: 'password' };
    console.log("Attempting to log in as Demo User with credentials:", credentials);

    const errorMessages = await dispatch(thunkLogin(credentials));

    if (!errorMessages) {
      console.log("Demo user login successful, navigating to /library");
      navigate('/library');
    } else {
      console.error("Demo user login failed:", errorMessages);
    }
  };

  const openLoginModal = () => {
    setModalContent(<LoginFormModal onClose={closeModal} />);
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal onClose={closeModal} />);
  };

  if (isAuthenticated) {
    return <Navigate to="/library" />;
  }

  return (
    <div className="splash-container">
      {/* New large BoundTogether title */}
      <h1 className="title">BoundTogether</h1>

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
        <p>BOUNDTOGETHER is your platform for trading books with others. Manage your personal library, browse, and exchange books with ease.</p>
      </div>
    </div>
  );
};

export default SplashPage;
