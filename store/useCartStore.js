import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      // --- ACTIONS ---

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addToCart: (product, quantity, variant, size) => {
        const { cart } = get();
        
        // Cek apakah item yang SAMA PERSIS (ID + Warna + Size) sudah ada?
        const existingItemIndex = cart.findIndex((item) => 
          item.id === product.id && 
          item.selectedVariant?.color === variant?.color &&
          item.selectedSize?.size === size?.size
        );

        if (existingItemIndex > -1) {
          // Update quantity jika sudah ada
          const newCart = [...cart];
          newCart[existingItemIndex].quantity += quantity;
          set({ cart: newCart, isOpen: true });
        } else {
          // Tambah item baru
          set({
            cart: [...cart, {
              id: product.id,
              name: product.name,
              price: product.price,
              image: variant?.image || product.banner_image,
              selectedVariant: variant,
              selectedSize: size,
              quantity: quantity,
              slug: product.slug
            }],
            isOpen: true
          });
        }
      },

      removeFromCart: (index) => {
        set((state) => ({
          cart: state.cart.filter((_, i) => i !== index)
        }));
      },

      updateQuantity: (index, newQuantity) => {
        if (newQuantity < 1) return;
        set((state) => {
          const newCart = [...state.cart];
          newCart[index].quantity = newQuantity;
          return { cart: newCart };
        });
      },

      // Clear Cart (Opsional, berguna setelah checkout)
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'nyamann-cart-storage', // Nama key di localStorage
      storage: createJSONStorage(() => localStorage), // Gunakan localStorage
      skipHydration: true, // PENTING: Mencegah error hydration mismatch di Next.js
    }
  )
);

export default useCartStore;