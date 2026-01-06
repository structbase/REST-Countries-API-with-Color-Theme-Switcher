import type { CountryCardProps } from "../../types/country-card-props";
import "./CountryCard.css";

/**
 * CountryCard Component:
 * Displays a summary of a country's information in a clickable card format.
 * Used primarily in the grid view on the Home Page.
 */
export default function CountryCard({ country, onClick }: CountryCardProps) {
    return (
        // /* Wrapper for the card; handles click events for navigation */
        <div className="country-card" onClick={onClick}>
            {/* Visual representation of the country */}
            <img src={country.flag} alt={`Flag of ${country.name}`} />
            {/* Textual details container  */}
            <div className="country-card-content">
                <h2>{country.name}</h2>

                {/* Display key statistics with formatted numbers */}
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
