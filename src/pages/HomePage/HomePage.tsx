import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountryCard from "../../components/CountryCard/CountryCard";
import RegionFilter from "../../components/RegionFilter/RegionFilter";
import useFetch from "../../hooks/useFetch";
import type { CountryApi } from "../../types/country-api";
import type { CountryDetail } from "../../types/country-detail";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function HomePage() {
    const navigate = useNavigate();

    const [region, setRegion] = useState("");
    const [search, setSearch] = useState("");

    // Fetch only fields used by CountryCard component
    const { data, loading, error } = useFetch<CountryApi[]>(
        "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3"
    );

    // Handle loading, error, and empty data states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data found</p>;

    // Transform API data to only include fields used by CountryCard
    const countries: CountryDetail[] = data.map((country) => ({
        code: country.cca3,
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital?.[0] || "",
        flag: country.flags.png,
    }));

    const filteredCountries = countries
        .filter((c) => (region ? c.region === region : true))
        .filter((c) =>
            search ? c.name.toLowerCase().includes(search.toLowerCase()) : true
        );

    return (
        <div className="wrapper">
            <div className="controls">
                <SearchBar value={search} onChange={setSearch} />
                <RegionFilter value={region} onChange={setRegion} />
            </div>

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
