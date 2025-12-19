import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("Admin login successful ✅");
    } catch (err) {
      setMessage("Server error");
    }
  };

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

