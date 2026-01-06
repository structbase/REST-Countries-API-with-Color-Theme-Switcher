import CountryCard from "../../components/CountryCard/CountryCard";
import useFetch from "../../hooks/useFetch";
import type { CountryApi } from "../../types/country-api";
import type { CountryDetail } from "../../types/country-detail";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

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
        capital: country.capital?.[0] || "",
        flag: country.flags.png,
    }));

    return (
        <div>
            {countries.map((country) => (
                <CountryCard
                    key={country.code}
                    country={country}
                    onClick={() => navigate(`/country/${country.code}`)}
                />
            ))}
        </div>
    );
}
