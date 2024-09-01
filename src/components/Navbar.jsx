import appLogo from "../images/rep-bro-logo-2.jfif";
import "./css/Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [linksOpen, setLinksOpen] = useState(false);

  const toggleLinks = () => {
    setLinksOpen(!linksOpen);
  };
  function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Checks for Android
    if (/android/i.test(userAgent)) {
      return true;
    }

    // Checks for iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return true;
    }

    // Checks for other mobile devices
    if (/mobile/i.test(userAgent)) {
      return true;
    }

    return false;
  }

  let deviceSelectString;
  if (isMobile()) {
    deviceSelectString = "Tap";
  } else {
    deviceSelectString = "Click";
  }

  return (
    <>
      <div
        className={`nav-container ${linksOpen ? "" : "height-sm"} `}
        onClick={toggleLinks}
      >
        {/* column 1 */}
        <div className="flex col">
          <div
            className={`${
              linksOpen ? "visible" : "hidden2 "
            } flexbox-container `}
          >
            <a href="http://www.codingwithtom.com" target="_blank" rel="noreferrer">
              <button className="flexbox-item flexbox-item-1 link gradient-button">
                Portfolio Page!
              </button>
            </a>
            <Link to={"/not-implemented"}>
              <button className="flexbox-item flexbox-item-2 link not-implemented">
              <span class="tooltip">This feature is not yet implemented. Come back later!</span>
                Login/Sign Up
              </button>
            </Link>
            <Link to={"/tracker"}>
              <button className="flexbox-item flexbox-item-3 link gradient-button">
                Log A Workout!
              </button>
            </Link>
          </div>
          <div className="nav-body"></div>
        </div>
        {/* column 2 */}
        <div style={{ color: "white" }} className={`nav-resizer col`}>
          {`${deviceSelectString} to ${linksOpen ? "Minimize" : "Expand"}`}
        </div>
        {/* column 3 */}
        <div
          className={`${linksOpen ? "visible" : "hidden2"} image-container col`}
        >
          <Link to={"/"}>
            <img id="navImage" src={appLogo} alt="" className="nav-image" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
