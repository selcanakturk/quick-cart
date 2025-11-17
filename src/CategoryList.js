import React, { Component } from "react";

export default class CategoryList extends Component {
  state = {
    categories: [],
    hoverCategory: null,
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => this.setState({ categories: data }));
  };

  render() {
    return (
      <div style={{ marginBottom: "24px" }}>
        {/* Kategori başlığı opsiyonel */}
        <h3 style={{ marginBottom: "12px", color: "#102a43" }}>
          {this.props.info?.title || "Categories"}
        </h3>

        {/* Yatay kategori bar */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            padding: "6px 0",
            whiteSpace: "nowrap",
          }}
        >
          {this.state.categories.map((category) => {
            const isSelected =
              this.props.currentCategory === category.categoryName;
            const isHovered = this.state.hoverCategory === category.id;

            return (
              <div
                key={category.id}
                onClick={() => this.props.changeCategory(category)}
                onMouseEnter={() =>
                  this.setState({ hoverCategory: category.id })
                }
                onMouseLeave={() => this.setState({ hoverCategory: null })}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? "#1976d2"
                    : isHovered
                    ? "#e3f2fd"
                    : "#f0f0f0",
                  color: isSelected ? "#fff" : "#102a43",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {category.categoryName}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
