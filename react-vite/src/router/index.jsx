import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import SplashPage from '../components/SplashPage/SplashPage';
import PersonalLibrary from '../components/PersonalLibrary/PersonalLibrary';
import BookExplorer from '../components/BookExplorer/BookExplorer'; 
import ExchangeRequest from '../components/ExchangeRequest/ExchangeRequest';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "library",
        element: <PersonalLibrary />,
      },
      {
        path: "explorer",
        element: <BookExplorer />,
      },
      {
        path: "exchange-requests",
        element: <ExchangeRequest />,
      },
    ],
  },
]);
