import type { SearchBarProps } from "../../types/search-bar-props";
import "./SearchBar.css"

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
