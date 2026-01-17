import { useCallback, useEffect, useState } from 'react';
import { fetchEvents } from '@services/api/eventService';
import { SoundrEvent } from '@models/event';

interface UseEventsParams {
  offset?: number;
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}

export function useEvents(url: string, params?: UseEventsParams) {
  
  const [events, setEvents] = useState<SoundrEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchEvents(url, params);
      setEvents(result.events ?? result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url, params?.offset, params?.location?.latitude, params?.location?.longitude, params?.location?.radius]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return { events, isLoading, error, refetch: loadEvents };
}
