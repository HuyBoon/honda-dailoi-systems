const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getParts(params?: { query?: string; categoryId?: string; vehicleId?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.query) searchParams.append('query', params.query);
  if (params?.categoryId) searchParams.append('categoryId', params.categoryId);
  if (params?.vehicleId) searchParams.append('vehicleId', params.vehicleId);

  const res = await fetch(`${API_URL}/parts?${searchParams.toString()}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    throw new Error('Failed to fetch parts');
  }

  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 3600 }, // Cache categories longer
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

export async function getVehicles() {
  const res = await fetch(`${API_URL}/vehicles`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  return res.json();
}
