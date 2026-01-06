/**
 * CountryDetail Interface:
 */
export interface CountryDetail {
    flag: string;
    name: string;
    code: string;
    capital: string;
    population: number;
    nativeName?: string;
    region?: string;
    subRegion?: string;
    topLevelDomain?: string;
    currencies?: string; // Transformed from Record to a comma-separated string
    languages?: string; // Transformed from Record to a comma-separated string
    borders?: string[];
}
