import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartList({ cart, updateCartItem }) {
  const navigate = useNavigate();
  const cartArray = Object.values(cart);
  const totalItems = cartArray.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartArray.reduce((sum, item) => {
    const unitPrice = Number(item.product.unitPrice) || 0;
    return sum + item.quantity * unitPrice;
  }, 0);
  const shipping = totalItems > 0 ? 12 : 0;
  const totalPrice = subtotal + shipping;

  const isEmpty = totalItems === 0;

  return (
    <div style={{ padding: "32px 24px", fontFamily: "Inter, sans-serif" }}>
      <div
        style={{
          backgroundColor: "#f5f7fa",
          borderRadius: "28px",
          padding: "32px",
          boxShadow: "0 20px 45px rgba(15,23,42,0.1)",
        }}
      >
        <div
          style={{
            display: isEmpty ? "block" : "grid",
            gridTemplateColumns: isEmpty ? "1fr" : "minmax(0, 2fr) 320px",
            gap: "28px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    textTransform: "uppercase",
                    fontSize: "12px",
                    letterSpacing: ".06em",
                    color: "#7b8794",
                  }}
                >
                  Shopping Cart
                </p>
                <h2 style={{ margin: "4px 0 0", color: "#102a43" }}>
                  {isEmpty
                    ? "Your cart is empty"
                    : `You have ${totalItems} item${totalItems > 1 ? "s" : ""
                    } in cart`}
                </h2>
              </div>
              {!isEmpty && (
                <button
                  onClick={() => navigate("/")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1976d2",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Continue shopping
                </button>
              )}
            </div>

            {isEmpty ? (
              <div
                style={{
                  padding: "48px",
                  textAlign: "center",
                  borderRadius: "24px",
                  backgroundColor: "#fff",
                  border: "1px dashed #cbd5f5",
                }}
              >
                <p style={{ color: "#627d98", fontSize: "15px" }}>
                  Looks like you haven't added any products yet.
                </p>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    marginTop: "16px",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    border: "none",
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #1e88e5 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Discover products
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {cartArray.map((item) => {
                  const imageUrl = `https://picsum.photos/seed/cart-${item.product.id}/300/200`;
                  const unitPrice = Number(item.product.unitPrice) || 0;
                  return (
                    <div
                      key={item.product.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "100px 1fr auto",
                        gap: "16px",
                        padding: "16px",
                        borderRadius: "16px",
                        backgroundColor: "#fff",
                        boxShadow: "0 12px 24px rgba(15,23,42,0.1)",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "90px",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={imageUrl}
                          alt={item.product.productName}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      <div>
                        <h4
                          style={{
                            margin: "0 0 4px",
                            fontSize: "16px",
                            color: "#102a43",
                          }}
                        >
                          {item.product.productName}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "13px",
                            color: "#627d98",
                          }}
                        >
                          {item.product.quantityPerUnit || "Pack"}
                        </p>
                        <span
                          style={{
                            marginTop: "6px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#0f766e",
                          }}
                        >
                          ${unitPrice.toFixed(2)}
                          <span style={{ color: "#9fb3c8", fontWeight: 400 }}>
                            per unit
                          </span>
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#f1f5f9",
                            borderRadius: "999px",
                            padding: "4px",
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
                              border: "none",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              width: "36px",
                              textAlign: "center",
                              fontWeight: 600,
                            }}
                          >
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
                              border: "none",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => updateCartItem(item.product.id, 0)}
                          style={{
                            border: "none",
                            background: "none",
                            color: "#e53935",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                        <strong
                          style={{
                            minWidth: "80px",
                            textAlign: "right",
                            display: "block",
                            width: "100%",
                            marginTop: "4px",
                            fontSize: "16px",
                          }}
                        >
                          ${(unitPrice * item.quantity).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {!isEmpty && (
            <div
              style={{
                padding: "24px",
                borderRadius: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 16px 30px rgba(15,23,42,0.12)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h3 style={{ margin: 0, color: "#102a43" }}>Order summary</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "#334155",
                }}
              >
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "#334155",
                }}
              >
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div
                style={{
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                style={{
                  marginTop: "8px",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #1e88e5 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Proceed to checkout
              </button>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5f5",
                  backgroundColor: "#fff",
                  color: "#1976d2",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Keep shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
