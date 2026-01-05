import CountryCard from "../../components/CountryCard/CountryCard";
import useFetch from "../../hooks/useFetch";
import type { CountryApi } from "../../types/countryApi";
import type { CountryDetail } from "../../types/country";

export default function HomePage() {
    // Fetch all countries with specific fields to minimize payload size
    const { data, loading, error } = useFetch<CountryApi[]>(
        "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3,borders"
    );

    // Handle loading, error, and empty data states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No data found</p>;

    // Transform raw API data into our internal CountryDetail shape
    // Includes fallback logic for potentially missing nested properties
    const countries: CountryDetail[] = data.map((country) => ({
        code: country.cca3,
        name: country.name.common,
        nativeName: country.name.nativeName
            ? Object.values(country.name.nativeName)[0]?.common || ""
            : "",
        population: country.population,
        region: country.region,
        subRegion: country.subregion || "",
        capital: country.capital?.[0] || "",
        topLevelDomain: country.tld?.[0] || "",
        currencies: country.currencies
            ? Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")
            : "",
        languages: country.languages
            ? Object.values(country.languages).join(", ")
            : "",
        flag: country.flags.png,
        borders: country.borders || [],
    }));

    return (
        <div>
            {countries.map((country) => (
                <CountryCard key={country.code} country={country} />
            ))}
        </div>
    );
}
