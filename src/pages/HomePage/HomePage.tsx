import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountryCard from "../../components/CountryCard/CountryCard";
import RegionFilter from "../../components/RegionFilter/RegionFilter";
import useFetch from "../../hooks/useFetch";
import type { CountryApi } from "../../types/country-api";
import type { CountryDetail } from "../../types/country-detail";

export default function HomePage() {
    const navigate = useNavigate();
    const [region, setRegion] = useState("");

    // Fetch only fields used by CountryCard component
    const { data, loading, error } = useFetch<CountryApi[]>(
        "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3"
    );

    // Handle loading, error, and empty data states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No data found</p>;

    // Transform API data to only include fields used by CountryCard
    const countries: CountryDetail[] = data.map((country) => ({
        code: country.cca3,
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital?.[0] || "",
        flag: country.flags.png,
    }));

    const filteredCountries = region
        ? countries.filter((c) => c.region === region)
        : countries;

    return (
        <div>
            <div className="controls">
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
