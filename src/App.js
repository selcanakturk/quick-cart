import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import CartList from "./CartList";
import NotFound from "./NotFound";
import Checkout from "./Checkout";
import Favorites from "./Favorites";
import ProductDetail from "./ProductDetail";
import Account from "./Account";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    allProducts: [],
    cart: {},
    featuredProducts: [],
    favorites: {},
    currentUser: null,
  };

  componentDidMount() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) this.setState({ cart: JSON.parse(savedCart) });

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites)
      this.setState({ favorites: JSON.parse(savedFavorites) });

    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) this.setState({ currentUser: JSON.parse(savedUser) });

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          products: data,
          allProducts: data,
          featuredProducts: data.slice(0, 6),
        });
      });

    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) this.searchProducts(search);
  }

  searchProduct = (productName) => {
    fetch(
      `http://localhost:3000/products?productName_like=${encodeURIComponent(
        productName
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          products: data,
          currentCategory: "",
          featuredProducts: [],
        });
      });
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    fetch("http://localhost:3000/products?categoryId=" + categoryId)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  goHome = () => {
    this.setState((prevState) => {
      const allProducts = prevState.allProducts || [];
      return {
        currentCategory: "",
        products: allProducts,
        featuredProducts: allProducts.slice(0, 6),
      };
    });
  };

  focusProduct = (productId) => {
    const { allProducts } = this.state;
    const found = allProducts.find((p) => p.id === productId);

    if (found) {
      this.setState({
        products: [found],
        currentCategory: "",
        featuredProducts: [],
      });
      return;
    }

    fetch("http://localhost:3000/products?id=" + productId)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          this.setState({
            products: [data[0]],
            currentCategory: "",
            featuredProducts: [],
          });
        }
      });
  };

  addToCart = (product) => {
    this.setState(
      (prevState) => {
        const cart = { ...prevState.cart };
        if (cart[product.id]) {
          cart[product.id].quantity += 1;
        } else {
          cart[product.id] = { product, quantity: 1 };
        }
        return { cart };
      },
      () => localStorage.setItem("cart", JSON.stringify(this.state.cart))
    );
  };

  updateCartItem = (productId, quantity) => {
    this.setState((prevState) => {
      const updatedCart = { ...prevState.cart };

      if (quantity <= 0) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] = {
          product: updatedCart[productId].product,
          quantity,
        };
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  };
  toggleFavorite = (productId) => {
    this.setState(
      (prevState) => {
        const favorites = { ...prevState.favorites };
        if (favorites[productId]) {
          delete favorites[productId];
        } else {
          favorites[productId] = true;
        }
        return { favorites };
      },
      () => {
        localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
      }
    );
  };

  handleLogin = (userData) => {
    const user = {
      name: userData.name?.trim() || "Guest",
      email: userData.email?.trim() || "",
    };
    this.setState({ currentUser: user }, () =>
      localStorage.setItem("currentUser", JSON.stringify(user))
    );
  };

  handleLogout = () => {
    this.setState({ currentUser: null }, () =>
      localStorage.removeItem("currentUser")
    );
  };

  render() {
    const categoryInfo = { title: "Category List" };
    const productInfo = { title: "Product List" };

    return (
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col">
            <Navi
              cart={this.state.cart}
              updateCartItem={this.updateCartItem}
              searchProduct={this.searchProduct}
              products={this.state.allProducts}
              goHome={this.goHome}
              focusProduct={this.focusProduct}
              currentUser={this.state.currentUser}
            />
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <CategoryList
                  info={categoryInfo}
                  changeCategory={this.changeCategory}
                  currentCategory={this.state.currentCategory}
                />

                <ProductList
                  info={productInfo}
                  products={this.state.products}
                  featuredProducts={this.state.featuredProducts}
                  currentCategory={this.state.currentCategory}
                  addToCart={this.addToCart}
                  toggleFavorite={this.toggleFavorite}
                  favorites={this.state.favorites}
                />
              </div>
            }
          />

          <Route
            path="/cart"
            element={
              <CartList
                cart={this.state.cart}
                updateCartItem={this.updateCartItem}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={this.state.favorites}
                toggleFavorite={this.toggleFavorite}
                products={this.state.allProducts}
                addToCart={this.addToCart}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                user={this.state.currentUser}
                onLogin={this.handleLogin}
                onLogout={this.handleLogout}
              />
            }
          />
          <Route
            path="/product/:productId"
            element={
              <ProductDetail
                products={this.state.allProducts}
                favorites={this.state.favorites}
                toggleFavorite={this.toggleFavorite}
                addToCart={this.addToCart}
                currentUser={this.state.currentUser}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}
