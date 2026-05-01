const API_BASE = 'http://127.0.0.1:3000';
const API_URL = `${API_BASE}/api`;

const formatImageUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

export async function getParts(params?: { query?: string; categoryId?: string; vehicleId?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.query) searchParams.append('q', params.query);
  if (params?.categoryId) searchParams.append('categoryId', params.categoryId);
  if (params?.vehicleId) searchParams.append('vehicleId', params.vehicleId);

  const url = `${API_URL}/parts?${searchParams.toString()}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${url}`, res.status);
    throw new Error('Failed to fetch parts');
  }

  const parts = await res.json();
  return parts.map((part: any) => ({
    ...part,
    imageUrl: formatImageUrl(part.imageUrl),
  }));
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 3600 },
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

export async function getPartById(id: string) {
  const url = `${API_URL}/parts/${id}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${url}`, res.status);
    throw new Error('Failed to fetch part details');
  }

  const part = await res.json();
  return {
    ...part,
    imageUrl: formatImageUrl(part.imageUrl),
  };
}
export async function createMoMoPayment(data: { orderId: string; amount: number; orderInfo: string }) {
  const res = await fetch(`${API_URL}/payments/momo/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create MoMo payment');
  return res.json();
}

export async function createOrder(orderData: {
  customerName: string;
  customerPhone: string;
  address?: string;
  paymentMethod?: string;
  items: { partId: string; quantity: number; price: number }[];
}) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Order submission failed:', errorData);
    throw new Error(errorData.message || 'Failed to submit order');
  }

  return res.json();
}
