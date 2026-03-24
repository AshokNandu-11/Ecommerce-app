import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", "USER");
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">Logging in...</p>
    </div>
  );
}

export default OAuthSuccess;
