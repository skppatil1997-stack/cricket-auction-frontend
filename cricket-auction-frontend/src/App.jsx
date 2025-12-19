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
  const [player, setPlayer] = useState({
    name: "",
    runs: "",
    wickets: "",
    matches: "",
    basePrice: ""
  });
  const [status, setStatus] = useState("");

  const addPlayer = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/players`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify(player)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Failed to add player");
        return;
      }

      setStatus("Player added successfully ✅");
      setPlayer({
        name: "",
        runs: "",
        wickets: "",
        matches: "",
        basePrice: ""
      });
    } catch {
      setStatus("Server error");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard 🏏</h1>

      <h3>Add Player</h3>

      <input
        placeholder="Name"
        value={player.name}
        onChange={e => setPlayer({ ...player, name: e.target.value })}
      /><br />

      <input
        placeholder="Runs"
        value={player.runs}
        onChange={e => setPlayer({ ...player, runs: e.target.value })}
      /><br />

      <input
        placeholder="Wickets"
        value={player.wickets}
        onChange={e => setPlayer({ ...player, wickets: e.target.value })}
      /><br />

      <input
        placeholder="Matches"
        value={player.matches}
        onChange={e => setPlayer({ ...player, matches: e.target.value })}
      /><br />

      <input
        placeholder="Base Price"
        value={player.basePrice}
        onChange={e => setPlayer({ ...player, basePrice: e.target.value })}
      /><br /><br />

      <button onClick={addPlayer}>Add Player</button>

      <p>{status}</p>

      <hr />

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
