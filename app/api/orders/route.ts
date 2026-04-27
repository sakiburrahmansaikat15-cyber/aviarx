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
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const body = (await request.json()) as CreateOrderBody;
    const orderNumber =
      "AV" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const order = await Order.create({ ...body, orderNumber });
    return NextResponse.json({ order, orderNumber }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
