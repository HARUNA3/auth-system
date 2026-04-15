import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://auth-system-production-3f4c.up.railway.app";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", fontFamily: "sans-serif" }}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} /><br /><br />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br /><br />
      <button onClick={handleSubmit}>Register</button>
      <p>{msg}</p>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}