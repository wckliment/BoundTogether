import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";  // Import useLocation
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();  // Get the current location

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Determine if we are on the Splash page
  const hideNavigation = location.pathname === '/';

  return (
    <>
      <ModalProvider>
        {!hideNavigation && <Navigation />} {/* Hide Navigation on the Splash page */}
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
