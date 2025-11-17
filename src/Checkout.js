import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order created successfully! (Dummy form)");
    navigate("/");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "16px",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "32px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "24px" }}>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <textarea
          style={{ ...inputStyle, height: "80px", resize: "none" }}
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          name="cardNumber"
          placeholder="Card Number"
          value={form.cardNumber}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          name="expiration"
          placeholder="Expiration (MM/YY)"
          value={form.expiration}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          name="cvv"
          placeholder="CVV"
          value={form.cvv}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          Complete Order
        </button>

        <button
          type="button"
          onClick={() => navigate("/cart")}
          style={{
            width: "100%",
            marginTop: "12px",
            backgroundColor: "transparent",
            border: "1px solid #1976d2",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back to Cart
        </button>
      </form>
    </div>
  );
}
