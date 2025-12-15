import { NavLink, Route, Routes } from 'react-router-dom';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css';

const navClassName = ({ isActive }) =>
  `nav-link${isActive ? ' is-active' : ''}`;

function App() {
  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="brand">
          <span className="brand-mark" />
          <span className="brand-name">Yataya</span>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end className={navClassName}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClassName}>
            About
          </NavLink>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
