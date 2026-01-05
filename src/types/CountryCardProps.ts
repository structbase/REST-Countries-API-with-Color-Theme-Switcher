import type { CountryDetail } from "./country";

export interface CountryCardProps {
    country: CountryDetail;
    onClick?: () => void;
}
