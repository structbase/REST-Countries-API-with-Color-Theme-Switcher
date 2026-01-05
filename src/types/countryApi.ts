export interface CountryApi {
    name: {
        common: string;
        nativeName?: Record<
            string,
            {
                official: string;
                common: string;
            }
        >;
    };
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<
        string,
        {
            name: string;
            symbol?: string;
        }
    >;
    languages?: Record<string, string>;
    cca3: string;
    borders?: string[];
}
