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
    currencies?: string;
    languages?: string;
    borders?: string[];
}
