// app/admin/products/new/page.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "clothing",
    badge: "",
    description: "",
    sizes: [] as string[],
    colors: [] as string[],
    colorInput: "",
  });

  const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
  const CATEGORIES = ["clothing", "accessories", "home"];

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    if (form.colorInput.trim() && !form.colors.includes(form.colorInput.trim())) {
      setForm((prev) => ({ ...prev, colors: [...prev.colors, prev.colorInput.trim()], colorInput: "" }));
    }
  };

  const removeColor = (color: string) => {
    setForm((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch {
      console.error("Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
          category: form.category,
          badge: form.badge || null,
          description: form.description,
          sizes: form.sizes,
          colors: form.colors,
          image: imageUrl,
        }),
      });
      if (res.ok) router.push("/admin/dashboard");
    } catch {
      console.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    border: "0.5px solid rgba(0,0,0,0.15)",
    background: "none", fontSize: "14px",
    outline: "none", fontFamily: "DM Sans, sans-serif",
    color: "#0a0a0a",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f6", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "240px", background: "#0a0a0a", padding: "32px 0", position: "fixed", height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 24px 32px", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "24px", letterSpacing: "0.15em", color: "#fafaf8" }}>AVIAR</div>
          <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", marginTop: "4px" }}>Admin</div>
        </div>
        <nav style={{ padding: "24px 0", flex: 1 }}>
          <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
            <div style={{ padding: "12px 24px", fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>Overview</div>
          </Link>
          <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
            <div style={{ padding: "12px 24px", fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>Orders</div>
          </Link>
          <div style={{ padding: "12px 24px", fontSize: "13px", color: "#c9a96e", letterSpacing: "0.08em", borderLeft: "2px solid #c9a96e" }}>Products</div>
        </nav>
        <div style={{ padding: "24px" }}>
          <Link href="/admin/login" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", background: "none", color: "rgba(255,255,255,0.3)", border: "0.5px solid rgba(255,255,255,0.1)", padding: "12px", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
              Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "240px", flex: 1, padding: "48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ marginBottom: "48px" }}>
            <Link href="/admin/dashboard" style={{ fontSize: "12px", color: "#8a8680", textDecoration: "none", letterSpacing: "0.08em" }}>
              ← Back to Dashboard
            </Link>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginTop: "16px", marginBottom: "8px" }}>Products</div>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "40px", fontWeight: 300, color: "#0a0a0a" }}>Add New <em>Product</em></h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>

              {/* Left Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ background: "white", padding: "32px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Basic Information</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <input placeholder="Price ($)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required style={inputStyle} />
                      <input placeholder="Original Price ($)" type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} style={inputStyle} />
                    </div>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      style={{ ...inputStyle, appearance: "none" as const }}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                    </select>
                    <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                      style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">No Badge</option>
                      <option value="new">New</option>
                      <option value="sale">Sale</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: "white", padding: "32px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Description</div>
                  <textarea
                    placeholder="Product description..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" as const }}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ background: "white", padding: "32px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Sizes</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {SIZES.map((size) => (
                      <button key={size} type="button" onClick={() => toggleSize(size)}
                        style={{ padding: "8px 16px", fontSize: "12px", border: form.sizes.includes(size) ? "1px solid #0a0a0a" : "0.5px solid rgba(0,0,0,0.2)", background: form.sizes.includes(size) ? "#0a0a0a" : "none", color: form.sizes.includes(size) ? "#fafaf8" : "#0a0a0a", cursor: "pointer" }}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: "white", padding: "32px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Colors</div>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    <input
                      placeholder="Add color (e.g. Ivory)"
                      value={form.colorInput}
                      onChange={(e) => setForm({ ...form, colorInput: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button type="button" onClick={addColor}
                      style={{ padding: "14px 20px", background: "#0a0a0a", color: "#fafaf8", border: "none", fontSize: "12px", cursor: "pointer" }}>
                      Add
                    </button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {form.colors.map((color) => (
                      <div key={color} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "#f5f2ec", fontSize: "12px" }}>
                        {color}
                        <button type="button" onClick={() => removeColor(color)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8a8680", fontSize: "14px", lineHeight: 1 }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div style={{ background: "white", padding: "32px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8680", marginBottom: "20px" }}>Product Image</div>
                  {imagePreview && (
                    <div style={{ marginBottom: "16px", position: "relative" }}>
                      <img src={imagePreview} alt="Preview" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
                      <button type="button" onClick={() => { setImagePreview(""); setImageUrl(""); }}
                        style={{ position: "absolute", top: "8px", right: "8px", background: "#0a0a0a", color: "white", border: "none", width: "28px", height: "28px", cursor: "pointer", fontSize: "14px" }}>
                        ✕
                      </button>
                    </div>
                  )}
                  <label style={{ display: "block", border: "0.5px dashed rgba(0,0,0,0.2)", padding: "32px", textAlign: "center", cursor: "pointer" }}>
                    <div style={{ fontSize: "32px", marginBottom: "12px" }}>📸</div>
                    <div style={{ fontSize: "13px", color: "#8a8680" }}>
                      {uploadingImage ? "Uploading..." : imageUrl ? "✓ Image uploaded" : "Click to upload"}
                    </div>
                    <div style={{ fontSize: "11px", color: "#8a8680", marginTop: "4px" }}>PNG, JPG up to 10MB</div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  </label>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "32px", justifyContent: "flex-end" }}>
              <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
                <button type="button" style={{ padding: "14px 32px", background: "none", border: "0.5px solid rgba(0,0,0,0.2)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                  Cancel
                </button>
              </Link>
              <button type="submit" disabled={loading || uploadingImage}
                style={{ padding: "14px 48px", background: "#0a0a0a", color: "#fafaf8", border: "none", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}