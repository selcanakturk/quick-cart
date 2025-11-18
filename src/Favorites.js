import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Favorites({
  favorites,
  products,
  addToCart,
  toggleFavorite,
}) {
  const navigate = useNavigate();
  const favoriteProducts = products.filter((p) => favorites[p.id]);

  if (favoriteProducts.length === 0) {
    return (
      <div
        style={{
          padding: "60px 0",
          textAlign: "center",
          color: "#627d98",
        }}
      >
        <h3 style={{ color: "#102a43", marginBottom: "8px" }}>
          No favorites yet!
        </h3>
        <p>Add some products to your favorites to see them here.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#102a43",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            Favorite Products
          </h2>
          <p
            style={{
              margin: "6px 0 0",
              color: "#627d98",
              fontSize: "13px",
            }}
          >
            Keep track of everything you love in one place.
          </p>
        </div>
        <span
          style={{
            fontSize: "13px",
            color: "#0f766e",
            fontWeight: 600,
          }}
        >
          {favoriteProducts.length} item
          {favoriteProducts.length > 1 ? "s" : ""} saved
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {favoriteProducts.map((product) => {
          const imageUrl = `https://picsum.photos/seed/fav-${product.id}/500/400`;
          const isFavorite = favorites[product.id];

          return (
            <div
              key={product.id}
              style={{
                cursor: "pointer",
                width: "100%",
                maxWidth: "360px",
                borderRadius: "16px",
                background: "#fff",
                boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(15,23,42,0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(15,23,42,0.08)";
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div
                style={{
                  height: "180px",
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={imageUrl}
                  alt={product.productName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    padding: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  {isFavorite ? (
                    <FaHeart color="#e63946" size={16} />
                  ) : (
                    <FaRegHeart color="#64748b" size={16} />
                  )}
                </div>

                {product.unitsInStock != null && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(15,118,110,0.9)",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {product.unitsInStock > 0
                      ? `${product.unitsInStock} in stock`
                      : "Out of stock"}
                  </span>
                )}
              </div>

              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    color: "#7b8794",
                    fontWeight: 600,
                  }}
                >
                  Favorite pick
                </span>
                <h4
                  style={{
                    margin: 0,
                    color: "#102a43",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {product.productName}
                </h4>
                <p
                  style={{
                    margin: 0,
                    color: "#627d98",
                    fontSize: "14px",
                    minHeight: "38px",
                  }}
                >
                  {product.quantityPerUnit || "Unit details not provided"}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#9fb3c8",
                      }}
                    >
                      Price
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "#0f766e",
                        fontWeight: 700,
                      }}
                    >
                      ${product.unitPrice}
                    </span>
                  </div>
                  {product.unitsInStock != null && (
                    <span
                      style={{
                        fontSize: "12px",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(25,118,210,0.08)",
                        color: "#1976d2",
                        fontWeight: 600,
                      }}
                    >
                      {product.unitsInStock} in stock
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                style={{
                  width: "100%",
                  border: "none",
                  borderTop: "1px solid #f1f5f9",
                  padding: "14px",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #1e88e5 100%)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "15px",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
