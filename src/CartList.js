import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartList({ cart, updateCartItem }) {
  const navigate = useNavigate();
  const cartArray = Object.values(cart);
  const totalItems = cartArray.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartArray.reduce(
    (sum, item) => sum + item.quantity * item.product.unitPrice,
    0
  );

  return (
    <div style={{ padding: "24px", fontFamily: "Inter, sans-serif" }}>
      <h2 style={{ marginBottom: "24px" }}>My Cart ({totalItems} items)</h2>

      {totalItems === 0 ? (
        <p style={{ fontSize: "16px", color: "#555" }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {cartArray.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                backgroundColor: "#fff",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ flex: 2, fontWeight: "500" }}>
                {item.product.productName}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() =>
                    updateCartItem(item.product.id, item.quantity - 1)
                  }
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  −
                </button>
                <span style={{ minWidth: "20px", textAlign: "center" }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateCartItem(item.product.id, item.quantity + 1)
                  }
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => updateCartItem(item.product.id, 0)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "#e53935",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c62828")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e53935")
                  }
                >
                  ×
                </button>
              </div>
              <div style={{ flex: 1, textAlign: "right", fontWeight: "500" }}>
                ${(item.product.unitPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Total + Buttons */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "2px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1565c0")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1976d2")
                }
              >
                Go Back
              </button>
              <button
                onClick={() => navigate("/checkout")}
                style={{
                  backgroundColor: "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#388e3c")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#43a047")
                }
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
