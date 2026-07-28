const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function searchAddresses(query, { signal } = {}) {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "0",
    countrycodes: "au",
    limit: "5",
  });

  const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, { signal });
  if (!response.ok) {
    throw new Error(`Address search failed: ${response.status}`);
  }

  const data = await response.json();
  return data.map((item) => ({ id: item.place_id, label: item.display_name }));
}
