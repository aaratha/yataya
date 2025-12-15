function About() {
  return (
    <section className="panel">
      <h2>About</h2>
      <p className="muted">
        React Router is wired up with a simple layout and a couple of example
        routes. Swap these out for your real pages.
      </p>
      <ul className="bullet-list">
        <li>Uses <code>BrowserRouter</code> in <code>src/main.jsx</code>.</li>
        <li>Navigation built with <code>NavLink</code> for active styles.</li>
        <li>Routes declared in <code>src/App.jsx</code>.</li>
      </ul>
    </section>
  );
}

export default About;
