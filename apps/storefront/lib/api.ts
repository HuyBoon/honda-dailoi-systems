const API_BASE = 'http://127.0.0.1:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || `${API_BASE}/api`;
// Sửa lại 2 hàm này trong file lib/api.ts

export async function login(data: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    // Lấy chính xác thông báo lỗi từ Backend trả về
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Đăng nhập thất bại');
  }
  return res.json();
}

export async function register(data: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    // Lấy chính xác thông báo lỗi từ Backend trả về
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Đăng ký thất bại');
  }
  return res.json();
}

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

export async function getOrdersByPhone(phone: string) {
  const res = await fetch(`${API_URL}/orders/customer/${phone}`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function getMyOrders(token: string) {
  const res = await fetch(`${API_URL}/orders/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch my orders');
  return res.json();
}

export async function createOrder(orderData: {
  customerName: string;
  customerPhone: string;
  address?: string;
  paymentMethod?: string;
  items: { partId: string; quantity: number; price: number }[];
}, token?: string) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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

// Cart
export async function getCart(token: string) {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.error(`Cart fetch failed with status: ${res.status}`);
    throw new Error(`Failed to fetch cart (${res.status})`);
  }
  return res.json();
}

export async function addToCart(token: string, partId: string, quantity: number) {
  const res = await fetch(`${API_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ partId, quantity }),
  });
  if (!res.ok) throw new Error('Failed to add to cart');
  return res.json();
}

export async function updateCartItem(token: string, partId: string, quantity: number) {
  const res = await fetch(`${API_URL}/cart/items/${partId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error('Failed to update cart');
  return res.json();
}

export async function removeFromCart(token: string, partId: string) {
  const res = await fetch(`${API_URL}/cart/items/${partId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to remove from cart');
  return res.json();
}

export async function clearBackendCart(token: string) {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to clear cart');
  return res.json();
}

export async function mergeCart(token: string, items: { partId: string; quantity: number }[]) {
  const res = await fetch(`${API_URL}/cart/merge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Failed to merge cart');
  return res.json();
}

// Customer Profile
export async function getProfile(token: string) {
  const res = await fetch(`${API_URL}/customers/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function updateProfile(token: string, data: { name?: string; phone?: string; address?: string }) {
  const res = await fetch(`${API_URL}/customers/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}
