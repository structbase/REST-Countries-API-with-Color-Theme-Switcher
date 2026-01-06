import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import type { CountryApi } from "../../types/country-api";

export default function CountryPage() {
    // Retrieve the unique alpha code from URL parameters
    const { code } = useParams<{ code: string }>();

    // Fetch specific country data using the alpha code endpoint
    const { data, loading, error } = useFetch<CountryApi[]>(
        code ? `https://restcountries.com/v3.1/alpha/${code}` : ""
    );

    // Handle loading, error, and empty data states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No data found</p>;

    const country = data[0];

    // Normalize API data into a flat structure with safe fallbacks
    const countryDetail = {
        name: country.name.common,
        nativeName: country.name.nativeName
            ? Object.values(country.name.nativeName)[0]?.common
            : "",
        population: country.population,
        region: country.region,
        subRegion: country.subregion ?? "",
        capital: country.capital?.[0] ?? "",
        topLevelDomain: country.tld?.[0] ?? "",
        currencies: country.currencies
            ? Object.values(country.currencies)
                  .map((c) => c.name)
                  .join(", ")
            : "",
        languages: country.languages
            ? Object.values(country.languages).join(", ")
            : "",
        flag: country.flags.svg,
        borders: country.borders ?? [],
    };

    return (
        <div>
            <img src={countryDetail.flag} alt={countryDetail.name} />
            <h1>{countryDetail.name}</h1>

            <p>
                <strong>Native Name:</strong> {countryDetail.nativeName}
            </p>
            <p>
                <strong>Population:</strong>{" "}
                {countryDetail.population.toLocaleString()}
            </p>
            <p>
                <strong>Region:</strong> {countryDetail.region}
            </p>
            <p>
                <strong>Sub Region:</strong> {countryDetail.subRegion}
            </p>
            <p>
                <strong>Capital:</strong> {countryDetail.capital}
            </p>
            <p>
                <strong>Top Level Domain:</strong>{" "}
                {countryDetail.topLevelDomain}
            </p>
            <p>
                <strong>Currencies:</strong> {countryDetail.currencies}
            </p>
            <p>
                <strong>Languages:</strong> {countryDetail.languages}
            </p>
        </div>
    );
}
