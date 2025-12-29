import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="panel">
      <h2>Page not found</h2>
      <p className="muted">
        That route does not exist yet. Head back home to continue exploring.
      </p>
      <Link to="/" className="nav-link is-active">
        Go home
      </Link>
    </section>
  );
}

export default NotFound;
