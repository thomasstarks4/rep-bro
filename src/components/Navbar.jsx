import appLogo from "../images/rep-bro-logo.jpg";
import "./css/Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [linksOpen, setLinksOpen] = useState(true);

  const toggleLinks = () => {
    setLinksOpen(!linksOpen);
  };
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
            <button className="flexbox-item flexbox-item-1 link btn-ts-1">
              Portfolio Page!
            </button>
            <button className="flexbox-item flexbox-item-2 link btn-ts-1">
              Login/Sign
            </button>
            <button className="flexbox-item flexbox-item-3 link btn-ts-1">
              Log A Workout!
            </button>
          </div>
        </div>
        {/* column 2 */}
        <div style={{ color: "white" }} className={`nav-resizer bottom col`}>
          Click/Tap To {`${linksOpen ? "Minimize" : "Expand"}`}
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
