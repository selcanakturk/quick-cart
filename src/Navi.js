import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaUserCircle } from "react-icons/fa";

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
  const totalPrice = cartArray.reduce((sum, item) => {
    const unitPrice = Number(item.product.unitPrice) || 0;
    return sum + (item.quantity || 0) * unitPrice;
  }, 0);

  const toggleCart = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    if (goHome) goHome();
    navigate("/");
  };

  const isActivePath = (path) => location.pathname.startsWith(path);

  const userInitial =
    currentUser?.name?.charAt(0)?.toUpperCase() ||
    currentUser?.email?.charAt(0)?.toUpperCase() ||
    null;

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px 32px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.35))",
        boxShadow: "0 25px 45px rgba(15,23,42,0.15)",
        borderRadius: "24px",
        fontFamily: "Inter, sans-serif",
        position: "sticky",
        top: "18px",
        zIndex: 100,
        border: "1px solid rgba(255,255,255,0.5)",
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        onClick={handleLogoClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          border: "none",
          background: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, rgba(30,64,175,0.95), rgba(96,165,250,0.9))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: "18px",
            boxShadow: "0 12px 25px rgba(30,64,175,0.35)",
          }}
        >
          QC
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontSize: "11px",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            QUICK
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "0.04em",
            }}
          >
            Cart
          </span>
        </div>
      </button>

      <div style={{ position: "relative", flex: 1, margin: "0 32px" }}>
        <form onSubmit={handleSearchSubmit}>
          <div
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <FaSearch
              size={14}
              color="#94a3b8"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="search"
              placeholder="Search for products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px 10px 38px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.5)",
                fontSize: "14px",
                backgroundColor: "rgba(255,255,255,0.8)",
                boxShadow: "0 10px 20px rgba(15,23,42,0.06)",
              }}
            />
          </div>
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
          gap: "10px",
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
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "rgba(148,163,184,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#1d4ed8",
              fontSize: "13px",
            }}
          >
            {userInitial ? (
              userInitial
            ) : (
              <FaUserCircle size={18} color="#1d4ed8" />
            )}
          </span>
          {currentUser ? `Hi, ${currentUser.name.split(" ")[0]}` : "My Account"}
        </button>
        <button
          onClick={() => navigate("/favorites")}
          style={{
            backgroundColor: isActivePath("/favorites")
              ? "rgba(25,118,210,0.12)"
              : "rgba(148,163,184,0.12)",
            border: "none",
            cursor: "pointer",
            padding: "6px 14px",
            borderRadius: "999px",
            fontSize: "14px",
            color: "#1e293b",
            fontWeight: isActivePath("/favorites") ? 600 : 500,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FaHeart color="#e11d48" size={14} />
          Favorites
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={toggleCart}
            style={{
              padding: "10px 16px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, rgba(25,118,210,0.95), rgba(30,136,229,0.95))",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 12px 20px rgba(25,118,210,0.3)",
            }}
          >
            <FaShoppingCart size={16} />
            <span>Cart</span>
            <span
              style={{
                minWidth: "26px",
                height: "26px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#1565c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "12px",
              }}
            >
              {totalItems}
            </span>
          </button>

          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "52px",
                right: 0,
                width: "360px",
                maxHeight: "440px",
                overflow: "hidden",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "18px",
                boxShadow: "0 24px 45px rgba(15,23,42,0.2)",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {totalItems === 0 ? (
                <div
                  style={{
                    padding: "32px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  <p style={{ margin: 0 }}>Your cart is empty.</p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      overflowY: "auto",
                      padding: "16px",
                      flex: 1,
                    }}
                  >
                    {cartArray.map((item) => {
                      const unitPrice = Number(item.product.unitPrice) || 0;
                      const imageUrl = `https://picsum.photos/seed/cart-mini-${item.product.id}/80/80`;
                      return (
                        <div
                          key={item.product.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "64px 1fr auto",
                            gap: "12px",
                            marginBottom: "14px",
                            paddingBottom: "14px",
                            borderBottom: "1px solid #f1f5f9",
                          }}
                        >
                          <div
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "12px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={imageUrl}
                              alt={item.product.productName}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          <div>
                            <strong
                              style={{
                                display: "block",
                                fontSize: "14px",
                                color: "#102a43",
                              }}
                            >
                              {item.product.productName}
                            </strong>
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#94a3b8",
                              }}
                            >
                              ${unitPrice.toFixed(2)} each
                            </span>
                          </div>

                          <div
                            style={{
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
                                width: "26px",
                                height: "26px",
                                borderRadius: "50%",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#fff",
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
                                width: "26px",
                                height: "26px",
                                borderRadius: "50%",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#fff",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                            >
                              +
                            </button>
                          </div>

                          <div
                            style={{
                              gridColumn: "2 / span 2",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <button
                              onClick={() => updateCartItem(item.product.id, 0)}
                              style={{
                                border: "none",
                                background: "none",
                                color: "#e11d48",
                                fontSize: "12px",
                                cursor: "pointer",
                              }}
                            >
                              Remove
                            </button>
                            <strong
                              style={{
                                color: "#0f172a",
                                fontSize: "14px",
                              }}
                            >
                              ${(unitPrice * item.quantity).toFixed(2)}
                            </strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      borderTop: "1px solid #e2e8f0",
                      backgroundColor: "#f8fafc",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 600,
                      }}
                    >
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/cart");
                        setIsOpen(false);
                      }}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View cart
                    </button>
                    <button
                      onClick={() => {
                        navigate("/checkout");
                        setIsOpen(false);
                      }}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5f5",
                        backgroundColor: "#fff",
                        color: "#1976d2",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Checkout
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
