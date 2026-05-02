import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addToCart, updateCartItem, removeFromCart, clearBackendCart, getCart, mergeCart } from '@/lib/api';
import { useAuthStore } from './useAuthStore';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  partNumber: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  lastSyncedUserId: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncWithBackend: () => Promise<void>;
  mergeGuestCart: () => Promise<void>;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastSyncedUserId: null,
      
      addItem: async (item) => {
        const { token } = useAuthStore.getState();
        const existingItem = get().items.find((i) => i.id === item.id);
        
        if (token) {
          try {
            await addToCart(token, item.id, 1);
          } catch (err) {
            console.error('Sync failed:', err);
          }
        }

        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isOpen: true,
          }));
        } else {
          set((state) => ({ 
            items: [...state.items, { ...item, quantity: 1 }], 
            isOpen: true 
          }));
        }
      },

      removeItem: async (id) => {
        const { token } = useAuthStore.getState();
        if (token) {
          try {
            await removeFromCart(token, id);
          } catch (err) {
            console.error('Sync failed:', err);
          }
        }

        set((state) => ({
          items: state.items.filter((i) => i.id !== id)
        }));
      },

      updateQuantity: async (id, quantity) => {
        const { token } = useAuthStore.getState();
        if (token) {
          try {
            await updateCartItem(token, id, quantity);
          } catch (err) {
            console.error('Sync failed:', err);
          }
        }

        set((state) => ({
          items: state.items.map((i) => 
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          )
        }));
      },

      clearCart: async () => {
        const { token } = useAuthStore.getState();
        if (token) {
          try {
            await clearBackendCart(token);
          } catch (err) {
            console.error('Sync failed:', err);
          }
        }
        set({ items: [], lastSyncedUserId: null });
      },

      syncWithBackend: async () => {
        const { token, user } = useAuthStore.getState();
        if (!token || !user) return;

        try {
          const backendCart = await getCart(token);
          if (backendCart && backendCart.items) {
            const items = backendCart.items.map((bi: any) => ({
              id: bi.part.id,
              name: bi.part.name,
              price: Number(bi.part.price),
              imageUrl: bi.part.imageUrl,
              partNumber: bi.part.partNumber,
              quantity: bi.quantity,
            }));
            set({ items, lastSyncedUserId: user.id });
          }
        } catch (err) {
          console.error('Sync failed:', err);
        }
      },
      
      mergeGuestCart: async () => {
        const { token, user } = useAuthStore.getState();
        const { items } = get();
        if (!token || !user || items.length === 0) return;

        try {
          const mergeItems = items.map(item => ({
            partId: item.id,
            quantity: item.quantity
          }));
          await mergeCart(token, mergeItems);
          // Set lastSyncedUserId so the syncWithBackend call knows it's the same user
          set({ lastSyncedUserId: user.id });
          await get().syncWithBackend();
        } catch (err) {
          console.error('Merge failed:', err);
        }
      },
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      openCart: () => set({ isOpen: true }),
    }),
    {
      name: 'honda-dailoi-cart',
    }
  )
);
