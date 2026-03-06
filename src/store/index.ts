import { useAuthStore } from "./useAuthStore";
import { useOrderStore } from "./useOrderStore";
import { useProductStore } from "./useProductStore";
import { useProfileModalStore } from "./useProfileModalStore";
import { useShoppingCartStore } from "./useShoppingCartStore";
import { useUserStore } from "./useUserStore";
import { usePaymentStore } from "./usePaymentStore";

export const useStore = {
  auth: useAuthStore,
  order: useOrderStore,
  product: useProductStore,
  profileModal: useProfileModalStore,
  shoppingCart: useShoppingCartStore,
  user: useUserStore,
  payment: usePaymentStore,
};