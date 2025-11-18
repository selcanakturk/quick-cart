import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navi({
  cart = {},
  updateCartItem,
  products = [],
  searchProduct,
  goHome,
  focusProduct,
  currentUser,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const filtered = products.filter((p) =>
      p.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowDropdown(true);
  }, [searchQuery, products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const exactMatch = products.find(
      (p) => p.productName.toLowerCase() === trimmed.toLowerCase()
    );

    if (exactMatch && focusProduct) {
      focusProduct(exactMatch.id);
      setShowDropdown(false);
      return;
    }

    if (searchProduct) searchProduct(trimmed);
    setShowDropdown(false);
  };

  const handleSelectProduct = (product) => {
    setSearchQuery(product.productName);
    setShowDropdown(false);
    if (focusProduct) {
      focusProduct(product.id);
    } else if (searchProduct) {
      searchProduct(product.productName);
    }
  };

  const cartArray = Object.values(cart);
  const totalItems = cartArray.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const totalPrice = cartArray.reduce(
    (sum, item) => sum + item.quantity * item.product.unitPrice,
    0
  );

  const toggleCart = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    if (goHome) goHome();
    navigate("/");
  };

  const isActivePath = (path) => location.pathname.startsWith(path);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        borderRadius: "10px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <button
        onClick={handleLogoClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg, rgba(25,118,210,0.15), rgba(30,136,229,0.35))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#0f172a",
            fontSize: "16px",
            boxShadow: "0 4px 10px rgba(24,94,224,0.25)",
          }}
        >
          QC
        </div>
        <span
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "0.02em",
          }}
        >
          QuickCart
        </span>
      </button>

      <div style={{ position: "relative", flex: 1, margin: "0 24px" }}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </form>

        {showDropdown && filteredProducts.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "36px",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 999,
              listStyle: "none",
              margin: 0,
              padding: "8px 0",
            }}
          >
            {filteredProducts.map((p) => (
              <li
                key={p.id}
                style={{ padding: "8px 12px", cursor: "pointer" }}
                onMouseDown={() => handleSelectProduct(p)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e3f2fd")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {p.productName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => navigate("/account")}
          style={{
            backgroundColor: isActivePath("/account")
              ? "rgba(25,118,210,0.08)"
              : "transparent",
            border: "none",
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "14px",
            color: "#334155",
            fontWeight: isActivePath("/account") ? 600 : 500,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#1565c0",
              fontSize: "12px",
            }}
          >
            {currentUser?.name
              ? currentUser.name.charAt(0).toUpperCase()
              : "?"}
          </span>
          {currentUser ? `Hi, ${currentUser.name.split(" ")[0]}` : "My Account"}
        </button>
        <button
          onClick={() => navigate("/favorites")}
          style={{
            backgroundColor: isActivePath("/favorites")
              ? "rgba(25,118,210,0.08)"
              : "transparent",
            border: "none",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "999px",
            fontSize: "14px",
            color: "#334155",
            fontWeight: isActivePath("/favorites") ? 600 : 500,
          }}
        >
          Favorites
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={toggleCart}
            style={{
              padding: "8px 16px",
              borderRadius: "24px",
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
            }}
          >
            Cart ({totalItems})
          </button>

          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "320px",
                maxHeight: "400px",
                overflowY: "auto",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 999,
                padding: "16px",
              }}
            >
              {totalItems === 0 ? (
                <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>
                  Your cart is empty.
                </p>
              ) : (
                <>
                  {cartArray.map((item) => (
                    <div
                      key={item.product.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px",
                        borderRadius: "12px",
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        marginBottom: "12px",
                        transition: "transform 0.2s, box-shadow 0.2s",
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
                          gap: "6px",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateCartItem(item.product.id, item.quantity - 1)
                          }
                          style={{
                            fontSize: "12px",
                            width: "25px",
                            height: "25px",
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
                            fontSize: "12px",
                            width: "25px",
                            height: "25px",
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
                            fontSize: "12px",
                            width: "25px",
                            height: "25px",
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

                      <div
                        style={{
                          paddingLeft: "5px",
                          flex: 1,
                          textAlign: "right",
                          fontWeight: "500",
                        }}
                      >
                        ${(item.product.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div
                    style={{
                      paddingTop: "12px",

                      borderTop: "2px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong>Total: ${totalPrice.toFixed(2)}</strong>
                    <button
                      onClick={() => navigate("/cart")}
                      style={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#1565c0")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#1976d2")
                      }
                    >
                      Go to Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
