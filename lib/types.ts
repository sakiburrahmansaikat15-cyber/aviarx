// lib/types.ts — shared domain types for the entire app

// ─── Cart / Order ────────────────────────────────────────────────────────────

export interface OrderCustomer {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}

export interface OrderLineItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  size: string;
  color: string;
  qty: number;
}

export type OrderPaymentMethod = "Card" | "Cash on Delivery";
export type OrderStatus = "pending" | "paid" | "Processing" | "Shipped" | "Delivered";

export interface CreateOrderBody {
  customer: OrderCustomer;
  items: OrderLineItem[];
  total: number;
  paymentMethod: OrderPaymentMethod;
  paymentIntentId?: string;
  status: OrderStatus;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductBadge = "new" | "sale";

export interface CreateProductBody {
  name: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  badge?: ProductBadge | null;
  description: string;
  sizes: string[];
  colors: string[];
  image?: string;
}

// ─── API request bodies ───────────────────────────────────────────────────────

export interface AdminLoginBody {
  email: string;
  password: string;
}

export interface CreatePaymentIntentBody {
  amount: number;
}
