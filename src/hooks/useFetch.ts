import { useCallback, useEffect, useRef, useState } from 'react';
import fakeData from './fakeData';

interface FetchOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export function useFetch<T = any>(url: string, body?: any, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0); // Used to trigger refresh

  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchOptions: RequestInit = {
        method: body ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        ...options,
      };
      const response = await fetch(url, fetchOptions);
      const result = await response.json();
      //const result = fakeData;
      if (isMounted.current) setData((result.events ?? result) as T);
    } catch (err: any) {
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }, [url, JSON.stringify(body), JSON.stringify(options)]);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData, refreshIndex]);

  // Call this function to refresh data
  const refresh = useCallback(() => {
    setRefreshIndex((prev) => prev + 1);
  }, []);

  return { data, isLoading, error, refresh };
}
