import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Logger from "./components/Logger";
import NotImplemented from "./components/NotImplemented";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import MyRepBroFit from "./components/MyRepBroFit";
import "./components/css/Footer.css";

function App() {
  const [showFooter, setShowFooter] = useState(true);
  const [footerButton, setFooterButton] = useState(true);
  const [isBlocking] = useState(true); // Block navigation state
  const location = useLocation();

  const toggleFooter = () => {
    setShowFooter(!showFooter);
    if (!showFooter) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth', // Makes the scrolling smooth
        });
      }, 0); // Timeout ensures state update happens before scroll
    }
  };

  // Handle browser unload (page refresh or close)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isBlocking) {
        const message = "Are you sure you want to leave, bro? Your sets will not be saved unless you saved them!";
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isBlocking]);

  // Handle in-app navigation (back/forward button or route change)
  useEffect(() => {
    const handlePopState = (event) => {
      if (isBlocking) {
        const confirmLeaving = window.confirm(
          "Are you sure you want to leave, bro? Your sets will not be saved unless you saved them!"
        );
        if (!confirmLeaving) {
          // Prevent the navigation by pushing the state back to the current page
          window.history.pushState(null, '', location.pathname);
        }
      }
    };

    window.onpopstate = handlePopState; // Listen for the back/forward navigation event

    return () => {
      window.onpopstate = null; // Clean up the listener when component unmounts
    };
  }, [isBlocking, location.pathname]);

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                showFooter={showFooter}
                setShowFooter={setShowFooter}
                footerButton={footerButton}
                setFooterButton={setFooterButton}
              />
            }
          />
          <Route path="/tracker" element={<Logger />} />
          <Route path="/not-implemented" element={<NotImplemented />} />
          <Route path="/myrepbro-fit" element={<MyRepBroFit />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
      {!showFooter && (
        <button onClick={toggleFooter} className="footer-button">
          Show footer
        </button>
      )}
      <Footer showFooter={showFooter} toggleFooter={toggleFooter}></Footer>
    </>
  );
}

export default App;
