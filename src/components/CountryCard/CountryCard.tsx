import type { CountryCardProps } from "../../types/country-card-props";
import "./CountryCard.css";

export default function CountryCard({ country, onClick }: CountryCardProps) {
    return (
        <div className="country-card" onClick={onClick}>
            <img src={country.flag} alt={`Flag of ${country.name}`} />

            <div className="country-card-content">
                <h2>{country.name}</h2>

                <p>
                    <strong>Population:</strong>{" "}
                    {country.population.toLocaleString()}
                </p>
                <p>
                    <strong>Region:</strong> {country.region}
                </p>
                <p>
                    <strong>Capital:</strong> {country.capital}
                </p>
            </div>
        </div>
    );
}
