import { useState } from "react";
import API from "../api/axios";

function Register() {

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "USER"
  });

  const handleRegister = async () => {
    await API.post("/auth/register", user);
    alert("Registered Successfully");
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Username" onChange={(e)=>setUser({...user, username: e.target.value})} />
      <input placeholder="Email" onChange={(e)=>setUser({...user, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e)=>setUser({...user, password: e.target.value})} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
