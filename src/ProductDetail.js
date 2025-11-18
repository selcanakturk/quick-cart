import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa";

export default function ProductDetail({
    products = [],
    favorites = {},
    toggleFavorite,
    addToCart,
    currentUser,
}) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(
        () => products.find((p) => String(p.id) === String(productId)) || null
    );
    const [loading, setLoading] = useState(!product);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState({ message: "" });
    const [commentError, setCommentError] = useState(null);

    useEffect(() => {
        const fromState = products.find((p) => String(p.id) === String(productId));
        if (fromState) {
            setProduct(fromState);
            setLoading(false);
            setError(null);
        } else {
            setLoading(true);
            fetch(`http://localhost:3000/products?id=${productId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.length > 0) {
                        setProduct(data[0]);
                        setError(null);
                    } else {
                        setProduct(null);
                        setError("Product not found.");
                    }
                })
                .catch(() => {
                    setProduct(null);
                    setError("Unable to load product.");
                })
                .finally(() => setLoading(false));
        }
    }, [productId, products]);

    useEffect(() => {
        const stored = localStorage.getItem("productComments");
        if (!stored) {
            setComments([]);
            return;
        }
        try {
            const parsed = JSON.parse(stored);
            setComments(parsed[productId] || []);
        } catch {
            setComments([]);
        }
    }, [productId]);

    const isFavorite = product ? !!favorites[product.id] : false;
    const canComment = !!currentUser;

    const handleToggleFavorite = () => {
        if (product && toggleFavorite) {
            toggleFavorite(product.id);
        }
    };

    const handleAddToCart = () => {
        if (product && addToCart) {
            addToCart(product);
        }
    };

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setCommentForm({ message: value });
        if (commentError) setCommentError(null);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        const trimmedMessage = commentForm.message.trim();

        if (!trimmedMessage) {
            setCommentError("Please enter a comment.");
            return;
        }

        if (!currentUser) {
            setCommentError("Please sign in to leave a comment.");
            return;
        }

        const newComment = {
            id: Date.now(),
            name: currentUser.name || currentUser.email || "You",
            message: trimmedMessage,
            createdAt: new Date().toISOString(),
        };

        setComments((prev) => {
            const updated = [newComment, ...prev];
            const stored = localStorage.getItem("productComments");
            let allComments = {};
            try {
                allComments = stored ? JSON.parse(stored) : {};
            } catch {
                allComments = {};
            }
            allComments[productId] = updated;
            localStorage.setItem("productComments", JSON.stringify(allComments));
            return updated;
        });

        setCommentForm({ message: "" });
    };

    if (loading) {
        return (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#627d98" }}>
                Loading product details...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#d64545" }}>
                {error || "Product not found."}
            </div>
        );
    }

    const imageUrl = `https://picsum.photos/seed/detail-${product.id}/900/600`;

    return (
        <div style={{ marginTop: "24px" }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                    background: "none",
                    border: "none",
                    color: "#1976d2",
                    fontWeight: 600,
                    cursor: "pointer",
                }}
            >
                <FaArrowLeft /> Back
            </button>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "32px",
                    padding: "32px",
                    borderRadius: "24px",
                    backgroundColor: "#f5f7fa",
                    boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
                }}
            >
                <div
                    style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 12px 30px rgba(15,23,42,0.18)",
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={product.productName}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: "13px",
                                textTransform: "uppercase",
                                letterSpacing: ".06em",
                                color: "#7b8794",
                                fontWeight: 600,
                            }}
                        >
                            {product.categoryId ? `Category #${product.categoryId}` : "Product"}
                        </span>
                        <h1
                            style={{
                                margin: "6px 0",
                                fontSize: "32px",
                                color: "#102a43",
                                fontWeight: 700,
                            }}
                        >
                            {product.productName}
                        </h1>
                        <p style={{ color: "#627d98", fontSize: "15px" }}>
                            {product.quantityPerUnit || "Unit details not provided."}
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flexWrap: "wrap",
                        }}
                    >
                        <div>
                            <span
                                style={{ display: "block", fontSize: "12px", color: "#9fb3c8" }}
                            >
                                Price
                            </span>
                            <span
                                style={{
                                    fontSize: "32px",
                                    fontWeight: 700,
                                    color: "#0f766e",
                                }}
                            >
                                ${product.unitPrice}
                            </span>
                        </div>
                        {product.unitsInStock != null && (
                            <div
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "999px",
                                    backgroundColor: "rgba(25,118,210,0.1)",
                                    color: "#0f172a",
                                    fontWeight: 600,
                                }}
                            >
                                {product.unitsInStock > 0
                                    ? `${product.unitsInStock} units available`
                                    : "Out of stock"}
                            </div>
                        )}
                    </div>

                    {product.reorderLevel != null && (
                        <div
                            style={{
                                padding: "12px 16px",
                                borderRadius: "14px",
                                backgroundColor: "#fff",
                                boxShadow: "0 8px 20px rgba(15,23,42,0.08)",
                                color: "#334155",
                                fontSize: "14px",
                            }}
                        >
                            Reorder level: <strong>{product.reorderLevel}</strong>
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={handleAddToCart}
                            style={{
                                flex: "1 1 200px",
                                padding: "14px 18px",
                                border: "none",
                                borderRadius: "12px",
                                background:
                                    "linear-gradient(135deg, #1976d2 0%, #1e88e5 100%)",
                                color: "#fff",
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                            }}
                        >
                            <FaCartPlus /> Add to Cart
                        </button>

                        <button
                            onClick={handleToggleFavorite}
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "16px",
                                border: "none",
                                backgroundColor: "rgba(230,57,70,0.12)",
                                color: "#e63946",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                            }}
                        >
                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: "28px",
                    padding: "24px",
                    borderRadius: "18px",
                    backgroundColor: "#fff",
                    boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                }}
            >
                <h3 style={{ marginTop: 0, color: "#102a43" }}>Comments</h3>
                <p style={{ color: "#627d98", fontSize: "14px" }}>
                    {canComment
                        ? "Share your thoughts about this product."
                        : "Sign in to share your experience with this product."}
                </p>

                <form onSubmit={handleSubmitComment} style={{ marginTop: "16px" }}>
                    <textarea
                        name="message"
                        placeholder="Write your comment..."
                        value={commentForm.message}
                        onChange={handleCommentChange}
                        rows={4}
                        disabled={!canComment}
                        style={{
                            marginTop: "12px",
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: "1px solid #cbd5f5",
                            fontSize: "14px",
                            resize: "vertical",
                            backgroundColor: canComment ? "#fff" : "#f1f5f9",
                        }}
                    />
                    {commentError && (
                        <p style={{ color: "#d64545", fontSize: "13px" }}>{commentError}</p>
                    )}
                    <button
                        type="submit"
                        disabled={!canComment}
                        style={{
                            marginTop: "12px",
                            padding: "12px 18px",
                            borderRadius: "10px",
                            border: "none",
                            background:
                                "linear-gradient(135deg, #1976d2 0%, #1e88e5 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            cursor: "pointer",
                            opacity: canComment ? 1 : 0.6,
                        }}
                    >
                        Post Comment
                    </button>
                </form>

                <div style={{ marginTop: "24px" }}>
                    {comments.length === 0 ? (
                        <p style={{ color: "#9fb3c8", fontSize: "14px" }}>
                            No comments yet. Be the first to comment!
                        </p>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    style={{
                                        padding: "12px 14px",
                                        borderRadius: "14px",
                                        backgroundColor: "#f5f7fa",
                                        border: "1px solid #e2e8f0",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <strong style={{ color: "#102a43" }}>
                                            {comment.name}
                                        </strong>
                                        <span style={{ fontSize: "12px", color: "#9fb3c8" }}>
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p style={{ marginTop: "8px", color: "#334155" }}>
                                        {comment.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

