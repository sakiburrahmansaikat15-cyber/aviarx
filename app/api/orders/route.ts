// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import type { CreateOrderBody } from "@/lib/types";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ orders: [] }, { status: 200 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  let body;
  try {
    body = (await request.json()) as CreateOrderBody;
    await connectDB();
    const orderNumber =
      "AV" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const order = await Order.create({ ...body, orderNumber });
    return NextResponse.json({ order, orderNumber }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);
    const orderNumber =
      "AV" + Math.random().toString(36).substring(2, 10).toUpperCase();
    return NextResponse.json({ order: { ...body, orderNumber }, orderNumber }, { status: 201 });
  }
}
