import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import type { CountryApi } from "../../types/country-api";
import "./CountryPage.css";

export default function CountryPage() {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();

    // Primary Data Fetch: Gets full details for the specific country code in the URL
    const { data, loading, error } = useFetch<CountryApi[]>(
        code ? `https://restcountries.com/v3.1/alpha/${code}` : null
    );

    // Derived State: Extracts border country codes to trigger the second fetch
    const borderCodes =
        data && data.length > 0 && data[0].borders
            ? data[0].borders.join(",")
            : null;

    // Secondary Data Fetch: Translates border alpha codes into readable common names
    const { data: borderCountries } = useFetch<CountryApi[]>(
        borderCodes
            ? `https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=name,cca3`
            : null
    );

    // Early returns for async lifecycle states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No data found</p>;

    const country = data[0];

    // Normalization: Cleans up API response into a flat object with fallbacks
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
        <div className="country-page">
            {/* Navigation: History-aware back button */}
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="country-details">
                <div className="flag-container">
                    <img src={countryDetail.flag} alt={countryDetail.name} />
                </div>

                <div className="country-info">
                    <h1>{countryDetail.name}</h1>

                    <div className="info-columns">
                        {/* Primary info block */}
                        <div>
                            <p>
                                <strong>Native Name:</strong>{" "}
                                {countryDetail.nativeName}
                            </p>
                            <p>
                                <strong>Population:</strong>{" "}
                                {countryDetail.population.toLocaleString()}
                            </p>
                            <p>
                                <strong>Region:</strong> {countryDetail.region}
                            </p>
                            <p>
                                <strong>Sub Region:</strong>{" "}
                                {countryDetail.subRegion}
                            </p>
                            <p>
                                <strong>Capital:</strong>{" "}
                                {countryDetail.capital}
                            </p>
                        </div>
                        {/* Secondary info block */}
                        <div>
                            <p>
                                <strong>Top Level Domain:</strong>{" "}
                                {countryDetail.topLevelDomain}
                            </p>
                            <p>
                                <strong>Currencies:</strong>{" "}
                                {countryDetail.currencies}
                            </p>
                            <p>
                                <strong>Languages:</strong>{" "}
                                {countryDetail.languages}
                            </p>
                        </div>
                    </div>

                    {/* Border Countries: Renders navigation buttons for neighboring nations */}
                    <div className="borders-container">
                        <p>
                            <strong>Border Countries:</strong>
                        </p>
                        <div className="borders">
                            {borderCountries && borderCountries.length > 0 ? (
                                borderCountries.map((border) => (
                                    <button
                                        key={border.cca3}
                                        className="border-btn"
                                        onClick={() =>
                                            navigate(`/country/${border.cca3}`)
                                        }
                                    >
                                        {border.name.common}
                                    </button>
                                ))
                            ) : (
                                <span>None</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
