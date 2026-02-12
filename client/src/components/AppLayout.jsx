import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import HeadingBar from "./HeadingBar.jsx";

function AppLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const menuLinkClass = ({ isActive }) =>
        isActive ? "mobile-nav-link selected" : "mobile-nav-link";

    return (
        <div className="app-shell">
            <HeadingBar isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((prev) => !prev)} />
            <main className="app-content">
                <div className={`app-rail${isMenuOpen ? " open" : ""}`}>
                    <section className="app-page">
                        <Outlet />
                    </section>
                    <nav className="mobile-drawer" aria-label="Mobile navigation">
                        <NavLink to="/" className={menuLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/plan" className={menuLinkClass}>
                            Plan
                        </NavLink>
                        <NavLink to="/support" className={menuLinkClass}>
                            Support
                        </NavLink>
                        <NavLink to="/account" className={menuLinkClass}>
                            Account
                        </NavLink>
                    </nav>
                </div>
            </main>
        </div>
    );
}

export default AppLayout;
