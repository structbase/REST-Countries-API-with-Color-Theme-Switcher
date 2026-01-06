import { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";

// Custom hook to access theme context easily
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context; // returns { theme, toggleTheme }
};
