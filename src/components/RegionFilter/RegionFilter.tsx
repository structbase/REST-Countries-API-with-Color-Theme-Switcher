import type { RegionFilterProps } from "../../types/region-filter-props";
import "./RegionFilter.css"

export default function RegionFilter({ value, onChange }: RegionFilterProps) {
    return (
        <div className="region-filter">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label="Filter by Region"
            >
                <option value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    );
}
