import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div className="not-implemented-container">
      <h1 className="t-center white">Nowhere.</h1>
      <div className="t-center white">
        We're not sure how you got here, but we get it. <br />
        Stuff like this happens sometimes. <br />
        <Link className="link" to={"/"}>
          Click here to go back
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
