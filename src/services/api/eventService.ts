import { FetchOptions } from "../../types/fetch";

export async function fetchEvents(url: string, body?: any, options?: FetchOptions) {
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
      return result;
}
