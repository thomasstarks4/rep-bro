import appLogo from "../images/rep-bro-logo.jpg";
import "./css/Home.css";
function Home() {
  return (
    <div className="home-container">
      <h1 className="home-header">Welcome To RepBro!</h1>
      <img className="home-image" src={appLogo} alt="App Logo" />
    </div>
  );
}

export default Home;
