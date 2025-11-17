import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartSummary({
  cart = {},
  updateCartItem,
  isOpen,
  toggleCart,
}) {
  const navigate = useNavigate();
  const cartArray = Object.values(cart);
  const totalItems = cartArray.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const buttonSmall = {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const removeButton = {
    ...buttonSmall,
    backgroundColor: "#e53935",
    border: "none",
    color: "#fff",
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Cart button */}
      <button
        onClick={toggleCart}
        style={{
          cursor: "pointer",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        Cart ({totalItems})
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "42px",
            width: "320px",
            maxHeight: "400px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            padding: "16px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            animation: "fadeSlide 0.2s ease-out",
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: "12px", color: "#102a43" }}>
            Cart Summary
          </h4>

          {totalItems === 0 ? (
            <p style={{ margin: 0, color: "#627d98" }}>Your cart is empty.</p>
          ) : (
            <>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  overflowY: "auto",
                }}
              >
                {cartArray.map((item) => (
                  <li
                    key={item.product?.id || Math.random()}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      background: "#f0f4f8",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.background = "#e1e8ed";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.background = "#f0f4f8";
                    }}
                  >
                    <span
                      style={{ flex: 2, fontWeight: "500", color: "#102a43" }}
                    >
                      {item.product?.productName || "Unknown"}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flex: 1,
                      }}
                    >
                      <button
                        style={buttonSmall}
                        onClick={() =>
                          updateCartItem(item.product.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span style={{ minWidth: "20px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        style={buttonSmall}
                        onClick={() =>
                          updateCartItem(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        style={removeButton}
                        onClick={() => updateCartItem(item.product.id, 0)}
                      >
                        ×
                      </button>
                    </div>
                    <span
                      style={{ flex: 1, textAlign: "right", fontWeight: "500" }}
                    >
                      ${(item.product.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/cart")}
                style={{
                  marginTop: "12px",
                  backgroundColor: "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#388e3c")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#43a047")
                }
              >
                Go to Cart
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
