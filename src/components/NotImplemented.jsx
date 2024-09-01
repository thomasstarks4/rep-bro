import { Link } from "react-router-dom";
function NotImplemented() {
  return (
    <div className="not-implemented-container white">
      <h1 className="t-center">Not Yet Implemented.</h1>
      <div className="t-center">
        Hey! <br /> Sorry, but this part of the app is still being built! <br />
        Don't worry, you can still get your reps in while you wait! <br />
        <h2>
        <Link className="link white" to={"/"}>
        <button className="gradient-button">

          Click here to go back
        </button>
        </Link>
        </h2>
      </div>
    </div>
  );
}

export default NotImplemented;
