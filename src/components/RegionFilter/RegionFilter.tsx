import type { RegionFilterProps } from "../../types/region-filter-props";
import "./RegionFilter.css";

/**
 * RegionFilter Component:
 * A dropdown menu allowing users to filter the country list by geographic region.
 */
export default function RegionFilter({ value, onChange }: RegionFilterProps) {
    return (
        <div className="region-filter">
            {/* Controlled select input: updates parent state on every change */}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label="Filter by Region"
            >
                {/* Default placeholder option */}
                <option value="">Filter by Region</option>

                {/* Geographic regions matching REST Countries API values */}
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    );
}
