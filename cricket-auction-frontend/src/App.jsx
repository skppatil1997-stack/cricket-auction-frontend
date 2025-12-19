import { useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const login = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      setIsAdmin(true);
    } catch {
      setMessage("Server error");
    }
  };

  // 🔐 If admin is logged in
  if (isAdmin) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Admin Dashboard 🏏</h1>
        <p>You are logged in as Admin.</p>

        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // 🔑 Login screen
  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
