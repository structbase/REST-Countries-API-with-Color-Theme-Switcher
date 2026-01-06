import { useState, useEffect } from "react";

// Generic data-fetching hook for API requests
export default function useFetch<T>(url: string | null) {
    // Store fetched data, loading state, and any errors
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // If no URL, don't fetch
        if (!url) {
            setLoading(false);
            setData(null);
            setError(null);
            return;
        }

        // AbortController allows us to cancel the request on unmount
        const controller = new AbortController();
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                });

                // Handle non-2xx HTTP responses
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                // Parse and store the response data
                const result = (await response.json()) as T;
                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                // Ignore abort errors, store all other errors
                if (
                    isMounted &&
                    err instanceof Error &&
                    err.name !== "AbortError"
                ) {
                    setError(err);
                }
            } finally {
                // Always stop loading once the request completes
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        // Cleanup: cancel fetch if component unmounts or dependencies change
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [url]);

    // Expose state to consuming components
    return { data, loading, error };
}
