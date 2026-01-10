import { Link } from "react-router-dom";
import HeadingBar from "../components/HeadingBar.jsx";

function NotFound() {
  return (
    <div className="app-shell">
      <HeadingBar />
      <section className="panel">
        <h2>Page not found</h2>
        <p className="muted">
          That route does not exist yet. Head back home to continue exploring.
        </p>
        <Link to="/" className="nav-link is-active">
          Go home
        </Link>
      </section>
    </div>
  );
}

export default NotFound;
