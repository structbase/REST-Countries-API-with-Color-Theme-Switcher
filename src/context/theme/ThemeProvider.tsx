/* Provider component: manages the state and side effects of theme switching */
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    // Initialization: reads from localStorage to persist user preference across refreshes
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        return savedTheme || "light";
    });

    // Side Effect: updates global CSS variables to trigger theme-wide style changes
    useEffect(() => {
        const root = document.documentElement;

        if (theme === "light") {
            root.style.setProperty("--bg", "hsl(0, 0%, 98%)"); 
            root.style.setProperty("--element", "hsl(0, 0%, 100%)"); 
            root.style.setProperty("--text", "hsl(200, 15%, 8%)"); 
            root.style.setProperty("--input", "hsl(0, 0%, 52%)"); 
        } else {
            root.style.setProperty("--bg", "hsl(207, 26%, 17%)"); 
            root.style.setProperty("--element", "hsl(209, 23%, 22%)"); 
            root.style.setProperty("--text", "hsl(0, 0%, 100%)"); 
            root.style.setProperty("--input", "hsl(0, 0%, 100%)"); 
        }

        // Save current selection to browser storage
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Action: helper to flip between light and dark
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};