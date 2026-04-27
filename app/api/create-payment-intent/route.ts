// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CreatePaymentIntentBody } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { amount } = (await req.json()) as CreatePaymentIntentBody;

    if (!amount || amount < 50) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Stripe Error:", error.message);
    return NextResponse.json(
      { error: "Stripe integration is not configured properly. Please use Cash on Delivery for testing." },
      { status: 400 }
    );
  }
}
