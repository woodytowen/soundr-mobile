import { useCallback, useEffect, useRef, useState } from 'react';
import fakeData from './fakeData';
import { FetchOptions } from '../../types/fetch';
import { fetchEvents } from '../../services/eventService';

export function useFetch<T = any>(url: string, body?: any, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0); // Used to trigger refresh

  const isMounted = useRef(true);

  //TODO Hook needs to be made re-usable - currently only focusing on events
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchEvents(url, body, options);
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
