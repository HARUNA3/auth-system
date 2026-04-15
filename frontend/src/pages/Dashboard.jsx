import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", fontFamily: "sans-serif" }}>
      <h2>Welcome, {username}! 🎉</h2>
      <p>You are logged in with a valid JWT token.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}