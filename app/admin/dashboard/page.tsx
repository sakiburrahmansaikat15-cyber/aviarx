// app/admin/dashboard/page.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/lib/types";

interface DashboardStat {
  label: string;
  value: string;
  change: string;
}

interface DashboardOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

const STATS: DashboardStat[] = [
  { label: "Total Orders", value: "124", change: "+12% this month" },
  { label: "Revenue", value: "$48,320", change: "+8% this month" },
  { label: "Products", value: "32", change: "4 low stock" },
  { label: "Customers", value: "891", change: "+24 this week" },
];

const SAMPLE_ORDERS: DashboardOrder[] = [
  { id: "AV8X2K1P", customer: "Sofia Ahmed", product: "Cashmere Wrap", amount: 245, status: "Processing", date: "Apr 23, 2025" },
  { id: "AV9M3L4Q", customer: "Marcus Khan", product: "Leather Tote", amount: 385, status: "Shipped", date: "Apr 22, 2025" },
  { id: "AV7N1R2W", customer: "Priya Joshi", product: "Linen Blazer", amount: 310, status: "Delivered", date: "Apr 21, 2025" },
  { id: "AV6K8T5E", customer: "James Miller", product: "Gold Cuff", amount: 175, status: "Processing", date: "Apr 21, 2025" },
  { id: "AV5P2Y9U", customer: "Emma Wilson", product: "Silk Blouse", amount: 280, status: "Delivered", date: "Apr 20, 2025" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  Processing: "#c9a96e",
  Shipped: "#2563eb",
  Delivered: "#16a34a",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const handleLogout = () => router.push("/admin/login");

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f6", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "240px", background: "var(--black)", padding: "32px 0", position: "fixed", height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 24px 32px", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div className="font-display" style={{ fontSize: "24px", letterSpacing: "0.15em", color: "var(--white)" }}>AVIAR</div>
          <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginTop: "4px" }}>Admin</div>
        </div>

        <nav style={{ padding: "24px 0", flex: 1 }}>
          {[
            { id: "overview", label: "Overview" },
            { id: "orders", label: "Orders" },
            { id: "products", label: "Products" },
            { id: "customers", label: "Customers" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "12px 24px", background: "none", border: "none",
                fontSize: "13px", letterSpacing: "0.08em",
                color: activeTab === item.id ? "var(--gold)" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                borderLeft: activeTab === item.id ? "2px solid var(--gold)" : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "24px" }}>
          <Link href="/admin/products/new" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", background: "var(--gold)", color: "var(--black)", border: "none", padding: "12px", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", marginBottom: "12px" }}>
              + Add Product
            </button>
          </Link>
          <button onClick={handleLogout} style={{ width: "100%", background: "none", color: "rgba(255,255,255,0.3)", border: "0.5px solid rgba(255,255,255,0.1)", padding: "12px", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "240px", flex: 1, padding: "48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          {/* Header */}
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>Dashboard</div>
            <h1 className="font-display" style={{ fontSize: "40px", fontWeight: 300, color: "var(--black)" }}>
              Good morning, <em>Admin</em>
            </h1>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "48px" }}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: "white", padding: "28px", borderBottom: "2px solid var(--gold)" }}
              >
                <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>{stat.label}</div>
                <div className="font-display" style={{ fontSize: "36px", fontWeight: 300, color: "var(--black)", marginBottom: "8px" }}>{stat.value}</div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>{stat.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders */}
          <div style={{ background: "white", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div className="font-display" style={{ fontSize: "24px", fontWeight: 300 }}>Recent Orders</div>
              <button style={{ background: "none", border: "0.5px solid rgba(0,0,0,0.15)", padding: "8px 16px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>View All</button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
                  {["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SAMPLE_ORDERS.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "0.5px solid rgba(0,0,0,0.04)" }}>
                    <td style={{ padding: "16px", fontSize: "13px", fontFamily: "monospace", color: "var(--gold)" }}>{order.id}</td>
                    <td style={{ padding: "16px", fontSize: "13px" }}>{order.customer}</td>
                    <td style={{ padding: "16px", fontSize: "13px", fontFamily: "Cormorant Garamond, serif" }}>{order.product}</td>
                    <td style={{ padding: "16px", fontSize: "13px" }}>${order.amount}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: STATUS_COLORS[order.status] || "var(--muted)" }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px", fontSize: "12px", color: "var(--muted)" }}>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}