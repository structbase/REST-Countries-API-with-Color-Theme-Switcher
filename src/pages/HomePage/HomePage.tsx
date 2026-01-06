import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountryCard from "../../components/CountryCard/CountryCard";
import RegionFilter from "../../components/RegionFilter/RegionFilter";
import useFetch from "../../hooks/useFetch";
import type { CountryApi } from "../../types/country-api";
import type { CountryDetail } from "../../types/country-detail";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./HomePage.css";

/**
 * HomePage Component:
 * Acts as the main landing page, managing data fetching, filtering logic,
 * and the layout of the country grid.
 */
export default function HomePage() {
    const navigate = useNavigate();

    // Local state for user-driven filtering
    const [region, setRegion] = useState("");
    const [search, setSearch] = useState("");

    // Initial Fetch: Requests all countries with minimal fields to optimize performance
    const { data, loading, error } = useFetch<CountryApi[]>(
        "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3"
    );

    // Conditional rendering for various request states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data found</p>;

    // Data Transformation: Maps raw API response to the specific props needed by CountryCard
    const countries: CountryDetail[] = data.map((country) => ({
        code: country.cca3,
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital?.[0] || "",
        flag: country.flags.png,
    }));

    // Filtering Logic: Chains region matching and text search locally
    const filteredCountries = countries
        .filter((c) => (region ? c.region === region : true))
        .filter((c) =>
            search ? c.name.toLowerCase().includes(search.toLowerCase()) : true
        );

    return (
        <div className="wrapper">
            {/* Control Bar: Contains search and filter inputs */}
            <div className="controls">
                <SearchBar value={search} onChange={setSearch} />
                <RegionFilter value={region} onChange={setRegion} />
            </div>

            {/* Content Area: Dynamically renders the list of filtered results */}
            <div className="country-grid">
                {filteredCountries.map((country) => (
                    <CountryCard
                        key={country.code}
                        country={country}
                        onClick={() => navigate(`/country/${country.code}`)}
                    />
                ))}
            </div>
        </div>
    );
}
