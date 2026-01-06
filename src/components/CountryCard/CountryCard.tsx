import type { CountryCardProps } from "../../types/country-card-props";
import { Link } from "react-router-dom";

export default function CountryCard({
    country,
    onClick,
    link,
}: CountryCardProps) {
    const countryDetails = link || `/country/${country.name}`;

    return (
        <div>
            <Link to={countryDetails}>
                <div onClick={onClick}>
                    <img src={country.flag} alt={`Flag of ${country.name}`} />
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
            </Link>
        </div>
    );
}
