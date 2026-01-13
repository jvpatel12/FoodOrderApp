import { useCallback, useState } from 'react';

/**
 * Custom hook for HTTP requests with error handling and loading state.
 * @param {string} url - The API endpoint URL
 * @param {object} config - Configuration object { method, headers, body }
 * @returns {object} { data, isLoading, error, sendRequest }
 */
export function useHttp(url, config) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (payload) => {
      setIsLoading(true);
      setError(null);

      const controller = new AbortController();

      try {
        const response = await fetch(url, {
          method: config?.method || 'GET',
          headers: config?.headers || { 'Content-Type': 'application/json' },
          body: payload ? JSON.stringify(payload) : config?.body,
          signal: controller.signal,
        });

        // Handle HTTP error responses
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        // Parse response JSON
        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        // Handle different error types
        let errorMessage = 'An error occurred';

        if (err.name === 'AbortError') {
          errorMessage = 'Request was cancelled';
        } else if (err instanceof SyntaxError) {
          errorMessage = 'Invalid response format from server';
        } else if (err instanceof TypeError) {
          errorMessage = 'Network error - check your connection';
        } else if (err.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        console.error('HTTP Error:', errorMessage, err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  return { data, isLoading, error, sendRequest };
}
