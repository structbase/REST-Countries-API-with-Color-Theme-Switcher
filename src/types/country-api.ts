/**
 * CountryApi Interface:
 */
export interface CountryApi {
    name: {
        common: string;
        // Native names are keyed by language code (e.g., "spa": { ... })
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
    capital?: string[]; // API returns an array, usually we take index 0
    tld?: string[]; // Top Level Domain array
    // Currencies are keyed by currency code (e.g., "USD": { ... })
    currencies?: Record<
        string,
        {
            name: string;
            symbol?: string;
        }
    >;
    // Languages are keyed by code, value is the name (e.g., "eng": "English")
    languages?: Record<string, string>;
    cca3: string; // Three-letter country code used for routing/borders
    borders?: string[]; // Array of cca3 codes for neighboring countries
}
