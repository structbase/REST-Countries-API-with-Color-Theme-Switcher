import type { CountryDetail } from "./country-detail";

export interface CountryCardProps {
    country: CountryDetail;
    onClick?: () => void;
}
