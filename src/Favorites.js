import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Favorites({
  favorites,
  products,
  addToCart,
  toggleFavorite,
}) {
  const favoriteProducts = products.filter((p) => favorites[p.id]);

  if (favoriteProducts.length === 0) {
    return <h3 style={{ textAlign: "center" }}>No favorites yet!</h3>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "16px",
      }}
    >
      {favoriteProducts.map((product) => (
        <div
          key={product.id}
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "300px",
            position: "relative",
          }}
        >
          <div
            onClick={() => toggleFavorite(product.id)}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "50%",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {favorites[product.id] ? (
              <FaHeart color="red" size={18} />
            ) : (
              <FaRegHeart color="gray" size={18} />
            )}
          </div>

          <h4 style={{ marginTop: "8px", color: "#102a43" }}>
            {product.productName}
          </h4>
          <p>Price: ${product.unitPrice}</p>

          <button
            onClick={() => addToCart(product)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
