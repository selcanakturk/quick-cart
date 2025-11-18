import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedProductsSlider from "./FeaturedProductsSlider";
import { FaHeart, FaRegHeart } from "react-icons/fa";

class ProductList extends Component {
  handleCardClick = (productId) => {
    if (this.props.navigate) {
      this.props.navigate(`/product/${productId}`);
    }
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f5f7fa",
          borderRadius: "20px",
          padding: "20px 20px 24px",
          boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          marginTop: "8px",
        }}
      >
        {this.props.featuredProducts &&
          this.props.featuredProducts.length > 0 &&
          !this.props.currentCategory && (
            <FeaturedProductsSlider
              products={this.props.featuredProducts}
              onProductClick={this.handleCardClick}
            />
          )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "20px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                color: "#102a43",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              {this.props.info?.title || "Products"}
              {this.props.currentCategory
                ? " · " + this.props.currentCategory
                : ""}
            </h3>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "13px",
                color: "#627d98",
              }}
            >
              {this.props.currentCategory
                ? "Showing items filtered by your selected category."
                : "Browse all items or use the search bar to find something specific."}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            justifyItems: "center",
          }}
        >
          {this.props.products.map((product) => {
            const imageUrl = `https://picsum.photos/seed/product-card-${product.id}/500/400`;
            const isFavorite = this.props.favorites[product.id];

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
                onClick={() => this.handleCardClick(product.id)}
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
                      this.props.toggleFavorite(product.id);
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
                    {product.supplierId ? `ID: ${product.supplierId}` : "Product"}
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
                    this.props.addToCart(product);
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
}

export default function ProductListWithNavigation(props) {
  const navigate = useNavigate();
  return <ProductList {...props} navigate={navigate} />;
}
