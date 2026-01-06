import type { SearchBarProps } from "../../types/search-bar-props";
import "./SearchBar.css";

/**
 * SearchBar Component:
 * A controlled text input used to filter the country list by name.
 */
export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search for a country..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
}
