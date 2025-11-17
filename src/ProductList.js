import React, { Component } from "react";
import FeaturedProductsSlider from "./FeaturedProductsSlider";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        {this.props.featuredProducts &&
          this.props.featuredProducts.length > 0 &&
          !this.props.currentCategory && (
            <FeaturedProductsSlider products={this.props.featuredProducts} />
          )}

        <h3 style={{ marginBottom: "16px", color: "#102a43" }}>
          {this.props.info?.title || "Products"}
          {this.props.currentCategory ? " - " + this.props.currentCategory : ""}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {this.props.products.map((product) => (
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
                transition: "all 0.2s",
                position: "relative",
                minHeight: "300px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
            >
              {/* Kalp ikonu */}
              <div
                onClick={() => this.props.toggleFavorite(product.id)}
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
                {this.props.favorites[product.id] ? (
                  <FaHeart color="red" size={18} />
                ) : (
                  <FaRegHeart color="gray" size={18} />
                )}
              </div>

              <div>
                <h4 style={{ margin: "0 0 8px 0", color: "#102a43" }}>
                  {product.productName}
                </h4>
                <p style={{ margin: "0 0 4px 0", fontWeight: "500" }}>
                  Price: ${product.unitPrice}
                </p>
                <p style={{ margin: "0 0 8px 0", color: "#627d98" }}>
                  {product.quantityPerUnit} | In Stock: {product.unitsInStock}
                </p>
              </div>

              <button
                onClick={() => this.props.addToCart(product)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1565c0")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1976d2")
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
