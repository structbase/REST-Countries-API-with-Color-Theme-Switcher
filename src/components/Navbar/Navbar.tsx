import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../../hooks/useTheme";
import { ThemeIcon } from "../ThemeIcon/ThemeIcon";

/**
 * Navbar Component:
 * Provides global navigation and the dark/light mode toggle.
 */
export default function Navbar() {
    // Access global theme state and the toggle function
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            {/* Branding link that returns the user to the homepage */}
            <Link to="/" className="navbar-title">
                Where in the world?
            </Link>

            {/* Switch button that updates the UI theme on click */}
            <button onClick={toggleTheme} className="theme-toggle-btn">
                <ThemeIcon dark={theme === "dark"} className="icon-size" />
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </nav>
    );
}
