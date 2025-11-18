import React, { useState } from "react";

export default function Account({ user, onLogin, onLogout }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedEmail = form.email.trim();
        const trimmedPassword = form.password.trim();
        const trimmedName = form.name.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setError("Please enter your email and password.");
            return;
        }

        if (trimmedPassword.length < 4) {
            setError("Password must be at least 4 characters.");
            return;
        }

        if (onLogin) {
            onLogin({ name: trimmedName || "User", email: trimmedEmail });
            setSuccess("Successfully signed in.");
            setForm({ name: trimmedName, email: trimmedEmail, password: "" });
        }
    };

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
            setSuccess(null);
        }
    };

    return (
        <div
            style={{
                marginTop: "24px",
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "960px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                    background: "#f5f7fa",
                    borderRadius: "24px",
                    padding: "32px",
                    boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
                }}
            >
                <div
                    style={{
                        padding: "24px",
                        borderRadius: "18px",
                        background:
                            "linear-gradient(135deg, rgba(25,118,210,0.9), rgba(30,136,229,0.9))",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    <div>
                        <p style={{ margin: 0, textTransform: "uppercase", fontSize: "12px" }}>
                            Account
                        </p>
                        <h2 style={{ margin: "6px 0 0", fontWeight: 700 }}>
                            {user ? "Welcome back!" : "Welcome to QuickCart"}
                        </h2>
                    </div>
                    <p style={{ lineHeight: 1.6 }}>
                        {user
                            ? "Manage your favorites, orders and profile details from a single place."
                            : "Create an account or sign in to sync favorites, leave comments and speed up checkout."}
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.8 }}>
                        <li>Sync favorites across devices</li>
                        <li>Track your cart and checkout faster</li>
                        <li>Leave comments on products</li>
                    </ul>
                </div>

                <div
                    style={{
                        padding: "24px",
                        borderRadius: "18px",
                        backgroundColor: "#fff",
                        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                    }}
                >
                    {user ? (
                        <>
                            <h3 style={{ marginTop: 0, color: "#102a43" }}>Your Profile</h3>
                            <div
                                style={{
                                    marginTop: "12px",
                                    padding: "16px",
                                    borderRadius: "14px",
                                    backgroundColor: "#f8fafc",
                                    border: "1px solid #e2e8f0",
                                }}
                            >
                                <p style={{ margin: "0 0 8px", color: "#334155" }}>
                                    <strong>Name:</strong> {user.name || "User"}
                                </p>
                                <p style={{ margin: 0, color: "#334155" }}>
                                    <strong>Email:</strong> {user.email || "-"}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    marginTop: "24px",
                                    width: "100%",
                                    padding: "12px 18px",
                                    borderRadius: "12px",
                                    border: "none",
                                    backgroundColor: "#e53935",
                                    color: "#fff",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 style={{ marginTop: 0, color: "#102a43" }}>Sign in</h3>
                            <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                    <div>
                                        <label
                                            style={{ display: "block", fontSize: "13px", color: "#334155" }}
                                        >
                                            Full Name (optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Jane Doe"
                                            style={{
                                                width: "100%",
                                                padding: "10px 14px",
                                                borderRadius: "10px",
                                                border: "1px solid #cbd5f5",
                                                fontSize: "14px",
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            style={{ display: "block", fontSize: "13px", color: "#334155" }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            style={{
                                                width: "100%",
                                                padding: "10px 14px",
                                                borderRadius: "10px",
                                                border: "1px solid #cbd5f5",
                                                fontSize: "14px",
                                            }}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            style={{ display: "block", fontSize: "13px", color: "#334155" }}
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="••••••"
                                            style={{
                                                width: "100%",
                                                padding: "10px 14px",
                                                borderRadius: "10px",
                                                border: "1px solid #cbd5f5",
                                                fontSize: "14px",
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <p style={{ color: "#d64545", fontSize: "13px", marginTop: "12px" }}>
                                        {error}
                                    </p>
                                )}
                                {success && (
                                    <p style={{ color: "#0f766e", fontSize: "13px", marginTop: "12px" }}>
                                        {success}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    style={{
                                        marginTop: "18px",
                                        width: "100%",
                                        padding: "12px 18px",
                                        borderRadius: "12px",
                                        border: "none",
                                        background:
                                            "linear-gradient(135deg, #1976d2 0%, #1e88e5 100%)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Continue
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

