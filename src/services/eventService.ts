export async function fetchEvents(body?: any) {
  const response = await fetch('http://localhost:3000/soundr/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await response.json();
  return result.data;
}
