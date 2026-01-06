import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        return savedTheme || "light";
    });

    // Set CSS variables for colors whenever theme changes
    useEffect(() => {
        const root = document.documentElement;

        if (theme === "light") {
            root.style.setProperty("--bg", "hsl(0, 0%, 98%)"); // Very Light Gray
            root.style.setProperty("--element", "hsl(0, 0%, 100%)"); // White
            root.style.setProperty("--text", "hsl(200, 15%, 8%)"); // Very Dark Blue (Text)
            root.style.setProperty("--input", "hsl(0, 0%, 52%)"); // Dark Gray
        } else {
            root.style.setProperty("--bg", "hsl(207, 26%, 17%)"); // Very Dark Blue Background
            root.style.setProperty("--element", "hsl(209, 23%, 22%)"); // Dark Blue Elements
            root.style.setProperty("--text", "hsl(0, 0%, 100%)"); // White Text
            root.style.setProperty("--input", "hsl(0, 0%, 100%)"); // White Inputs
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
