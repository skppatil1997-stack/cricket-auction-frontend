import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL)
      .then(res => res.text())
      .then(data => console.log("Backend says:", data));
  }, []);

  return <h1>Cricket Auction Frontend Running 🏏</h1>;
}

export default App;
