import appLogo from "../images/rep-bro-logo.jpg";
import headerImg1 from "../images/karsten-winegeart-0Wra5YYVQJE-unsplash.jpg";
import headerImg2 from "../images/surface-mtnOWv6EGNs-unsplash.jpg";
import { Link } from "react-router-dom";
import "./css/Home.css";
function Home() {
  return (
    <>
      <div className="home-container">
        <h1>
          <div className="logo-name">
            <span>R</span>
            <span>e</span>
            <span>p</span>
            <span>B</span>
            <span>r</span>
            <span>o &nbsp;</span>
          </div>
        </h1>
        <h1 className="home-header">Your All-in-One Workout Tracking App</h1>
        <div className="main-header">
          <div className="flex j-center"></div>
          <div className="img-container">
            <img className="home-image" src={appLogo} alt="App Logo" />
          </div>
        </div>
        <h3 className="home-content">
          Are you ready to take your workouts to the next level? Meet RepBro,
          the ultimate app for tracking your fitness journey effortlessly.
          Whether you're counting reps, timing your exercises, or planning your
          gym sessions, RepBro has got you covered.
        </h3>
        <div className="list-container">
          <div className="content-container">
            <div className="content-item-1">
              <h2 className="t-center">Track Your Workouts with Ease</h2>
              <div className="img-container">
                <img className="home-image" src={headerImg1} alt="Man" />
              </div>
              <ul>
                <li>
                  <strong>Reps & Sets:</strong> Log each rep and set
                  effortlessly.
                </li>
                <li>
                  <strong>Time-Based Workouts: </strong> Track the duration of
                  your exercises.
                </li>
                <li>
                  <strong>Customizable Tracking:</strong> Adapt the app to fit
                  your unique workout needs.
                </li>
              </ul>
            </div>
            <div className="content-item-2">
              <h2 className="t-center">Plan and Schedule Your Workouts</h2>
              <div className="img-container">
                <img className="home-image" src={headerImg2} alt="Man" />
              </div>
              <ul>
                <li>
                  <strong>Printable Workout Plans:</strong> Design your workout
                  schedule and print it out to bring to the gym.
                </li>
                <li>
                  <strong>Easy Scheduling: </strong> Plan your workouts ahead of
                  time for a seamless fitness routine.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="list-container">
          <h2 className="t-center">Stay Organized and Motivated</h2>
          <ul>
            <li>
              <strong>Check Off Completed Workouts:</strong> Simply check off
              boxes as you complete each exercise.
            </li>
            <li>
              <strong>Progress at a Glance: </strong> Monitor your progress and
              stay motivated.
            </li>
          </ul>
        </div>
        <div className="button-container flex j-space">
          <Link className="flex" to={"/tracker"}>
            <button className="btn-ts-1">Log a workout now!</button>
          </Link>
          <Link className="flex" to={"/tracker"}>
            <button className="btn-ts-1">Click here to learn more!</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
