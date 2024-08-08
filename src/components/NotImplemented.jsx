import { Link } from "react-router-dom";
function NotImplemented() {
  return (
    <div className="not-implemented-container">
      <h1 className="t-center white">Not Yet Implemented.</h1>
      <div className="t-center white">
        Hey! Sorry, but this part of the app is still being built! <br />
        Don't worry, you can still get your reps in while you wait! <br />
        <Link className="link" to={"/"}>
          Click here to go back
        </Link>
      </div>
    </div>
  );
}

export default NotImplemented;
