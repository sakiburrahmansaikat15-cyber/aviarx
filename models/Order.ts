// models/Order.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import type { OrderStatus, OrderPaymentMethod } from "@/lib/types";

export interface IOrderCustomer {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
}

export interface IOrderItem {
  productId?: string;
  name?: string;
  price?: number;
  qty?: number;
  size?: string;
  color?: string;
  image?: string;
  category?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  customer: IOrderCustomer;
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod?: OrderPaymentMethod;
  paymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      firstName: String,
      lastName: String,
      name: String,
      email: String,
      address: String,
      city: String,
      country: String,
      zip: String,
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        size: String,
        color: String,
        image: String,
        category: String,
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "Processing" },
    paymentMethod: { type: String },
    paymentIntentId: { type: String },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  (mongoose.models.Order as Model<IOrder>) ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
