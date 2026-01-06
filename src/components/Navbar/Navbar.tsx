import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../../hooks/useTheme";
import { ThemeIcon } from "../ThemeIcon/ThemeIcon";


export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-title">
                Where in the world?
            </Link>

            <button onClick={toggleTheme} className="theme-toggle-btn">
                <ThemeIcon dark={theme === "dark"} className="icon-size" />
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </nav>
    );
}
