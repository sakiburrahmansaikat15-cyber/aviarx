// models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import type { ProductBadge } from "@/lib/types";

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge?: ProductBadge;
  description?: string;
  sizes: string[];
  colors: string[];
  image?: string;
  icon?: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    badge: { type: String },
    description: { type: String },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    image: { type: String },
    icon: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
